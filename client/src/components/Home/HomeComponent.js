import React from 'react';
import Button from '@material-ui/core/Button';
import config from '../../config.json'
import { Link } from 'react-router-dom';
import FooterComponent from '../Footer/FooterComponent';
import NavbarComponent from '../Navigation/NavbarComponent';
import { updateProfile } from '../../utils/updateProfile';
import axios from 'axios';
import './style.css'

function HomeComponent() {
  return (
    <div>
      <NavbarComponent style={{ zIndex: '5000' }} />
      <div className="homeContainer">
        <div className="heroContainer" id="hero">
          <h2 className="homeTitle" onClick={() => updateProfile()}>Minecraft Server & Player Informations</h2>
          <div className="subTitleDiv">
            <p className="subtitle">{ config.name } is service which provides you ability to</p>
            <p className="subtitle">lookup Minecraft Servers & Minecraft Players from site.</p>
          </div>
          <div className="boxContainer">
            <div className="firstBox">
              <img src="https://image.flaticon.com/icons/png/512/3208/3208726.png" alt="Server Image" className="serverImage" />
              <p className="boxText server">Lookup desired Minecraft Server by Address</p>
              <Button variant="contained" color="primary" className="boxBttn server">
                <Link to="/server">Let's go</Link>
              </Button>
            </div>
            <div className="secondBox">
              <img src="https://image.flaticon.com/icons/png/512/560/560216.png" alt="User Image" className="userImage" />
              <p className="boxText user">Lookup desired Minecraft Player by Username</p>
              <Button variant="contained" color="primary" className="boxBttn user">
                <Link to="/user">Let's go</Link>
              </Button>
            </div>
          </div>
          <div className="moreInfo">
            <h2 className="infoTitle">About { config.name }</h2>
            <p className="infoText">{ config.name } is Web Tool which allows you to check Status/Informations 
of Minecraft Server or Minecraft Player<br />by just typing Server IP/Minecraft Username in Search Box.
            </p>
            <h3 className="infoHeader">Development</h3>
            <p className="infoText">
              Website is built by team of Specialist for Web Development who used newest technologies such as ReactJS<br />
              to provide you with best possible experience on Website!
            </p>
            <h3 className="infoHeader">Team</h3>
            <p className="infoText">
              Like we said before our team is constructed from excellent Web Developers who is<br />
              experienced at their job and know to do it pretty well.
            </p>
            <div className="teamMembers">
              <strong>CEO & Developer</strong> - Nikola
              <br /><strong>Designer</strong> - N/A
            </div>
          </div>
        </div>
      </div>
      {/* { document.documentElement.clientWidth } */}
      <div className="footerComponent">
        <FooterComponent />
      </div>
    </div>
  )
}

export default HomeComponent