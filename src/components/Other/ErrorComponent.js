import React from 'react'
import FooterComponent from '../Footer/FooterComponent'
import NavbarComponent from '../Navigation/NavbarComponent'
import './style.css'

function ErrorComponent({ errorType, errorText, errorCode }) {
  return (
    <div className="errorContainer">
      <NavbarComponent style={{ zIndex: '5000' }} />
      <div className="errorHero">
        <h1 className="errorCode">{ errorCode }</h1>
        <h2 className="errorTitle">{ errorType }</h2>
        <p className="errorText">{ errorText }</p>
      </div>
      <FooterComponent />
    </div>
  )
}

export default ErrorComponent
