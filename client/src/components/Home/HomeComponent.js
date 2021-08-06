import React from 'react';
import { Link } from 'react-router-dom';
import FooterComponent from '../Footer/FooterComponent';
import NavbarComponent from '../Navigation/NavbarComponent';
import Transition from 'react-transition-group/Transition';
import './style.css'

function HomeComponent() {
  return (
    <div>
      <NavbarComponent style={{ zIndex: '5000' }} />
      <div className="homeContainer">
        <div>
          <div className="homeHero">
            <Transition in={true} timeout={2000} mountOnEnter unmountOnExit appear>
              {(state) => (
                <div className={`homeText homeStatus-${state}`}>
                  <h2 className="homeTitle">MCLookup</h2>
                  <p className="homeSubtitle">
                    Get Informations about Any Minecraft Server or Player by just typing <br />
                    Server IP or Player's Username, it's simple as that!
                  </p>
                </div>
              )}
            </Transition>
            <Transition in={true} timeout={1500} mountOnEnter unmountOnExit appear>
              {(state) => (
                <div className={`homeBttns bttnStatus-${state}`}>
                  <Link to="/user">
                    <button className="lookUserBttn">LOOKUP USER<span className="usrLook"><br />(Need Players Username)</span></button>
                  </Link>
                  <Link to="/server">
                    <button className="lookSrvBttn">LOOKUP SERVER<span className="srvLook"><br />(Need Server Address)</span></button>
                  </Link>
                </div>
              )}
            </Transition>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#242a30" fill-opacity="0.9" d="M0,160L21.8,170.7C43.6,181,87,203,131,197.3C174.5,192,218,160,262,138.7C305.5,117,349,107,393,106.7C436.4,107,480,117,524,117.3C567.3,117,611,107,655,90.7C698.2,75,742,53,785,58.7C829.1,64,873,96,916,133.3C960,171,1004,213,1047,202.7C1090.9,192,1135,128,1178,96C1221.8,64,1265,64,1309,69.3C1352.7,75,1396,85,1418,90.7L1440,96L1440,320L1418.2,320C1396.4,320,1353,320,1309,320C1265.5,320,1222,320,1178,320C1134.5,320,1091,320,1047,320C1003.6,320,960,320,916,320C872.7,320,829,320,785,320C741.8,320,698,320,655,320C610.9,320,567,320,524,320C480,320,436,320,393,320C349.1,320,305,320,262,320C218.2,320,175,320,131,320C87.3,320,44,320,22,320L0,320Z">
            </path>
          </svg>
        </div>
        <div className="fixWave"></div>
      </div>



































      {/* <div className="homeContainer">
        <div className="heroContainer" id="hero">
          <h2 className="homeTitle">Minecraft Server & Player Informations</h2>
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
          <div className="waveContainer">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#242a30" fill-opacity="0.9" d="M0,192L40,186.7C80,181,160,171,240,176C320,181,400,203,480,208C560,213,640,203,720,218.7C800,235,880,277,960,272C1040,267,1120,213,1200,208C1280,203,1360,245,1400,266.7L1440,288L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z">
            </path>
          </svg>
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
  </div> */}
      {/* { document.documentElement.clientWidth } */}
      <FooterComponent />
    </div>
  )
}

export default HomeComponent