import React from 'react'

const Pet = (props) => {
  const {age,breed,description,gender,imageURL,name,story,whichPet} = props
  
  return (
    <div className='pet-container'>
      <ul>
        <li>Name: {name}</li>
        <li><img className='pet-image' src = {imageURL} alt = {description}></img></li>
        <li>Age: {age}</li>
        <li>Breed: {breed}</li>
        <li>Description: {description}</li>
        <li>Gender: {gender}</li>                
        <li>Story: {story}</li>
        {props.frontOfLine === true && <button onClick = {() => props.handleAdopt(whichPet)}>Adopt me!</button>}
      </ul>
    </div>
  )
}


export default Pet
