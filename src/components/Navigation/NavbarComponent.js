import React, { useState, useEffect } from 'react'
import './style.css'

function NavbarComponent() {

  const [open, setOpen] = useState(false);

  const styleOpen = {
    right: "0%"
  }
  const styleClosed = {
    right: "-100%"
  }

  let menuOpened = open ? styleOpen : styleClosed;

  return (
    <>
      <div className="navContainer">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/archive/a/ac/20070325222640%21No_image_available.svg/120px-No_image_available.svg.png" alt="title image" className="title" />
        <div className="navigation">
          <i id="open-menu" class="fas fa-bars" onClick={() => {
            setOpen(true);
          }}></i>
          <ul id="testiranje" className="nav-list" style={menuOpened}>
            <i id="close-menu" class="fas fa-times fa-2x" onClick={() => {
              setOpen(false);
            }}></i>
            <li className="nav-item">
              <a href="#home" className="nav-link home" onClick={() => {
              setOpen(false);
            }}>Home</a>
            </li>
            <li className="nav-item">
              <a href="#server" className="nav-link server" onClick={() => {
              setOpen(false);
            }}>Server Status</a>
            </li>
            <li className="nav-item">
              <a href="#user" className="nav-link user" onClick={() => {
              setOpen(false);
            }}>User Informations</a>
            </li>
            <li className="nav-item">
              <a href="#contact" className="nav-link other" onClick={() => {
              setOpen(false);
            }}>Soon</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default NavbarComponent