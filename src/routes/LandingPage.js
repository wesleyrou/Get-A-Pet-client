import React from 'react'

const LandingPage = (props) => {
  return (
    <div>
      <section>Landing Page Instructions</section>
      {/* image */}
      <button onClick={e => {
        e.preventDefault()
        props.history.push('/adopt')
      }}>Adopt a Pet!</button>
    </div>
  )
}


export default LandingPage
