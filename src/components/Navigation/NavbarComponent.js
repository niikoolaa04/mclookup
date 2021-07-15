import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
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
          <i id="open-menu" className="fas fa-bars" onClick={() => {
            setOpen(true);
          }}></i>
          <ul id="testiranje" className="nav-list" style={menuOpened}>
            <i id="close-menu" className="fas fa-times fa-2x" onClick={() => {
              setOpen(false);
            }}></i>
            <li className="nav-item">
              <Link to="/" onClick={() => setOpen(false)} className="nav-link home">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/server" onClick={() => setOpen(false)} className="nav-link server">Server Lookup</Link>
            </li>
            <li className="nav-item">
              <Link to="/user" onClick={() => setOpen(false)} className="nav-link user">User Lookup</Link>
            </li>
            <li className="nav-item">
              <Link to="/" onClick={() => setOpen(false)} className="nav-link other">Other</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default NavbarComponent