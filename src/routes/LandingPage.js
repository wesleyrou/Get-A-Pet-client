import React from 'react'

const LandingPage = (props) => {
  return (
    <div className='landing-Page'>
      <section className = 'app-description'>Every pet deserves a forever home. With Get-A-Pet, you can bring home a fur friend that will bring both of you an endless amount of happiness. </section>
      <section className = 'app-description'>Just get in line and when you get to the front you will be able to choose which pet to bring home with you. Click the button below to get started.</section>
      <img className='landing-image' src={require('../images/dogs.jpg')} alt='cute dogs'></img>
      <button onClick={e => {
        e.preventDefault()
        props.history.push('/adopt')
      }}>Adopt a Pet!</button>
    </div>
  )
}


export default LandingPage
