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
                    Get Information about Any Minecraft Server or Player by just typing <br />
                    Server IP or Player's Username, it's simple as that!
                  </p>
                </div>
              )}
            </Transition>
            <Transition in={true} timeout={1500} mountOnEnter unmountOnExit appear>
              {(state) => (
                <div className={`homeBttns bttnStatus-${state}`}>
                  <Link to="/player">
                    <button className="lookUserBttn">LOOKUP PLAYER<span className="usrLook"><br />(Need Players Username)</span></button>
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
      <FooterComponent />
    </div>
  )
}

export default HomeComponent