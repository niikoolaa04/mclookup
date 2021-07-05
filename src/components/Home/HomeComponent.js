import React from 'react';
import Button from '@material-ui/core/Button';
import './style.css'
import config from '../../config.json'
import { Link } from 'react-router-dom';

function HomeComponent() {
  return (
    <div>
      <div className="homeContainer">
        <div className="heroContainer" id="hero">
          <h2 className="homeTitle">Minecraft Server & Player Informations</h2>
          <div className="subTitleDiv">
            <p className="subtitle">{ config.name } is service which provides you ability to</p>
            <p className="subtitle">lookup Minecraft Servers & Minecraft Players from site.</p>
          </div>
          <div className="boxContainer">
            <div className="firstBox">
              <img src="https://image.flaticon.com/icons/png/512/3208/3208726.png" alt="Server Image" className="serverImage" />
              <p className="boxText server">Lookup any Minecraft Server by</p>
              <p className="boxText server">clicking button below.</p>
              <Button variant="contained" color="primary" className="boxBttn server">
                <Link to="/server">Let's go</Link>
              </Button>
            </div>
            <div className="secondBox">
              <img src="https://image.flaticon.com/icons/png/512/560/560216.png" alt="User Image" className="userImage" />
              <p className="boxText user">Lookup any Minecraft Player by</p>
              <p className="boxText user">clicking button below.</p>
              <Button variant="contained" color="primary" className="boxBttn user">
                <Link to="/user">Let's go</Link>
              </Button>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#242a30" fill-opacity="1" d="M0,160L48,144C96,128,192,96,288,85.3C384,75,480,85,576,90.7C672,96,768,96,864,85.3C960,75,1056,53,1152,69.3C1248,85,1344,139,1392,165.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
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
    </div>
  )
}

export default HomeComponent
