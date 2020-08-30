import React from 'react'
import config from '../config'
import Pet from '../components/Pet'

let interval

class AdoptionPage extends React.Component{
  state = {
    people:[],
    cat:null,
    dog:null,
    adopter:null,
    adopted:null,
    frontOfLine:false,
    error:null,
  }

  fetchPeopleQueue = () => {
    fetch(`${config.API_ENDPOINT}/people`)
    .then(res => res.json())
    .then(res => this.setState({people: res}))
    .catch(e => this.setState({error:e}))
  }
  
  fetchAdoptablePets = () => {
    fetch(`${config.API_ENDPOINT}/pets`)
    .then(res => res.json())
    .then(res => {
      console.log(res)
      this.setState({cat: res[0],dog:res[1]})
    })
    .catch(e => this.setState({error:e}))
  }

  handleJoinQueue = (e) => {
    console.log(this.state.people)
    const name = e.target.adopt.value
    e.preventDefault()
      fetch(`${config.API_ENDPOINT}/people`,{
        method: 'POST',
        headers: {
          'content-type':'application/json',
        },
        body:JSON.stringify({
          name:name
        })
      })
      .then(res => res.json())
      .then(() => {
        this.setState({adopter: name, people: [...this.state.people,name]},() => {interval = setInterval(() => this.adoptPet(),5000)})
      })
      .then(() => {
        if(this.state.adopter === this.state.people[0]){
          clearInterval(interval)
          this.setState({frontOfLine:true})
        }
      })      
      .catch(e => this.setState({error:e}))
  }

  adoptPet = (type=null) => {
    //CLEAR INTERVAL IF FRONT OF LINE
    if(this.state.people[0] === this.state.adopter || this.state.people.length === 0){
      clearInterval(interval)
      if(this.state.people[0] === this.state.adopter){
        this.setState({frontOfLine:true})
      }
    }else{    
      switch(type){
        case 'cat':
          this.handleAdopt('cat')          
          break;
        case 'dog':
          this.handleAdopt('dog')
          break;
        default:
          this.handleAdopt('dog')  
      }
    }
  }

  handleAdopt = (whichPet) => {
      fetch(`${config.API_ENDPOINT}/pets`,{
        method: 'DELETE',
        headers: {
          'content-type':'application/json',
        },
        body:JSON.stringify({
          name:this.state.people[0],
          whichPet
        })
      })
      .then(() => {
        if(this.state.people[0] === this.state.adopter){
          this.setState({adopted:this.state[whichPet]})
        }
        let newPeople = this.state.people
        newPeople.shift()

        fetch(`${config.API_ENDPOINT}/pets`)
        .then(res => res.json())
        //CLEAR INTERVAL IF FRONT OF LINE
        .then(res => (newPeople[0] === this.state.adopter)        
        ?this.handleClearInterval(res,newPeople)
        :this.setState({cat:res[0],dog:res[1],people:newPeople,frontOfLine:false}))
        .catch(e => this.setState({error:e}))
      })      
      .catch(e => this.setState({error:e}))
  }

  handleClearInterval = (res,newPeople) => {
    // console.log('STOPPING')
    clearInterval(interval)
    this.setState({cat:res[0],dog:res[1],people:newPeople,frontOfLine:true})
  }

  componentDidMount() {
    this.fetchPeopleQueue()  
    this.fetchAdoptablePets()
  }

  render(){    
    // console.log('people',this.state.people, 'pets',this.state.cat, this.state.dog)        
    let peopleLine
    (this.state.people.length > 0)
    ?peopleLine = this.state.people.map((person,i) => <li key={i}>{person}</li>)
    :peopleLine = {}
    // console.log(this.state.people,this.state.adopter)
    
    return (
      <div>        
        {this.state.adopted && <div>You've adopted {this.state.adopted.name}</div>}
        <div className='pet-container'>
          {this.state.cat && <Pet key={1} whichPet={'cat'} handleAdopt={this.handleAdopt} frontOfLine={this.state.frontOfLine} {...this.state.cat}/>}
          {this.state.dog && <Pet key={2} whichPet={'dog'} handleAdopt={this.handleAdopt} frontOfLine={this.state.frontOfLine} {...this.state.dog}/>}
        </div>        
        
        {!this.state.people.includes(this.state.adopter)
        ?
          <form onSubmit = {e => this.handleJoinQueue(e)}>
          <legend hidden>Adoption Form</legend>
          <fieldset>
            <div>
              <label id='adopt' name='adopt'>
                Type your name to get in line to adopt a pet
              </label>
            </div>
            <div>
              <input htmlFor='adopt' id='adopt' name='adopt'></input>
            </div>
            <button>Get in Line</button>
          </fieldset>
        </form>
        :<div>
          {`You are number ${this.state.people.findIndex(name => name === this.state.adopter)+1} in line`}
          {/* {this.state.frontOfLine && <div>Approving you to adopt a pet...</div>} */}
          <ol>
            {peopleLine}
          </ol>
        </div>        
        }
      </div>
    )
  }  
}


export default AdoptionPage
