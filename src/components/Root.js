import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Header from './Header'
import LandingPage from '../routes/LandingPage'
import AdoptionPage from '../routes/AdoptionPage'


class Root extends React.Component {
  state= {adopted:null}

  render() {
    return (
      <div>
        <Header />
        <main>
          <Switch>
            <Route
                  exact
                  path='/'
                  component={props => <LandingPage {...props}/>} />
            <Route
                  exact
                  path='/adopt'
                  component={props => <AdoptionPage handleCongratulations = {this.handleCongratulations} {...props}/>} />            
          </Switch>
        </main>
      </div>
    )
    
  }  
}

export default Root
