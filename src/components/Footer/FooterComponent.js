import config from '../../config.json'
import React from 'react'
import './style.css'

function FooterComponent() {
  return (
    <div>
      <div className="footerContainer">
        <div className="copyrightContainer">
          <p className="copyright">{ config.name }, © 2021 All rights Reserved</p>
        </div>
        <div className="social">
          <i class="fab fa-discord fa-2x"></i>
        </div>
      </div>
    </div>
  )
}

export default FooterComponent
