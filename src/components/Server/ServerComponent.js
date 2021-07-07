import { React, useState, useEffect } from 'react';
import './style.css'
import FooterComponent from '../Footer/FooterComponent';
import ServerFormComponent from './ServerFormComponent';
import NavbarComponent from '../Navigation/NavbarComponent';
import Tooltip from '@material-ui/core/Tooltip';
import $ from 'jquery'

function ServerComponent() {

  const [serverData, setServerData] = useState({
    status: '',
    hostname: '',
    ip: '',
    port: '',
    version: '',
    playerCount: '',
    maxPlayerCount: '',
    software: '',
    motd: '', 
    pluginsCount: 0,
    plugins: [],
    players: []
  });

  const [input, setInput] = useState('');
  const [searchIP, setSearchIP] = useState('');
  const [isLoading, setLoading] = useState(false);

  let loadingText;
  if(isLoading) loadingText = <p>Please wait, site is loading..</p>;

  let emptySearch = '';
  if(searchIP == '') emptySearch = 'No IP Entered'
  else emptySearch = searchIP;

  return (
    <div>
      <NavbarComponent style={{ zIndex: '5000' }} />
      <div className="serverContainer">
        <div className="serverHero" id="hero">
          <h2 className="serverTitle">Minecraft Server Lookup</h2>
          <div className="serverSubtitleDiv">
            <p className="serverSubtitle">Enter desired Server IP into Search Box</p>
          </div>
          <span className="spanTest">
            { loadingText }
          </span>
          <ServerFormComponent 
            data={serverData} 
            setData={setServerData} 
            input={input} 
            setInput={setInput} 
            searchIP={searchIP}
            setSearchIP={setSearchIP}
            loading={isLoading}
            setLoading={setLoading}
          />
          { serverData.status == '' ? 
            <div className="serverBoxContainer">
              <div className="serverBox" style={{ width: '0px' }}>
                <div className="boxContent" style={{ height: '0px' }}>
                  
                </div>
              </div>
              <svg className="heroWave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#242a30" fill-opacity="1" d="M0,160L48,144C96,128,192,96,288,85.3C384,75,480,85,576,90.7C672,96,768,96,864,85.3C960,75,1056,53,1152,69.3C1248,85,1344,139,1392,165.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
            </div> :
            <div className="t">
              {
                serverData.status == 'Error' ?
                <div className="serverBoxContainer">
                  <div className="serverBox" style={{ width: '0px' }}>
                    <div className="boxContent" style={{ height: '0px' }}>
                    </div>
                  </div>
                  <div className="noServer">
                    <h4 className="noServerTitle">An Error Ocurred with your Request</h4>
                    <p>Server with provided IP Address is either Offline or doesn't exist.</p>
                    <p className="noServerIP"><strong>Entered IP Address:</strong> { emptySearch }</p>
                  </div>
                  <svg className="heroWave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#242a30" fill-opacity="1" d="M0,160L48,144C96,128,192,96,288,85.3C384,75,480,85,576,90.7C672,96,768,96,864,85.3C960,75,1056,53,1152,69.3C1248,85,1344,139,1392,165.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
                </div> :
                <div className="serverBoxContainer">
                  <div className="serverBox">
                    <div className="boxContent">
                      <div className="profileInfo">
                        <div className="serverFavicon">
                          <img src={`https://api.minetools.eu/favicon/${serverData.hostname}`} alt="" className="favicon" />
                        </div>
                        <div className="motdEl">
                          <span className="firstLine"></span>
                          <span className="secondLine"></span>
                        </div>
                        <p className="serverDomain">{ serverData.hostname }</p>
                        <div className="serverIP">
                          <p>{ serverData.ip + ':' + serverData.port } <br /><span className="textBelow">Server IP</span></p>
                        </div>
                        <div className="serverSoftware">
                          <p>{ serverData.software } <br /><span className="textBelow">Server Software</span></p>
                        </div>
                        <div className="serverPlayers">
                          {
                            serverData.playerCount > 0 ?
                            <Tooltip title={serverData.players.join(', ')} placement="top">
                              <p>{ serverData.playerCount + '/' + serverData.maxPlayerCount } <br /><span className="textBelow">Players Count</span></p>
                            </Tooltip> :
                            <Tooltip title={``} placement="top">
                              <p>{ serverData.playerCount + '/' + serverData.maxPlayerCount } <br /><span className="textBelow">Players Count</span></p>
                            </Tooltip>
                          }
                          {/* <p>{ serverData.playerCount } <br /><span className="textBelow">Player Count</span></p> */}
                        </div>
                        <div className="serverVersion">
                          <p>{ serverData.version } <br /><span className="textBelow">Server Version</span></p>
                        </div>
                        {
                          serverData.pluginsCount >= 1 ?
                          <div className="serverPlugins">
                            <Tooltip title={serverData.plugins.join(', ')} placement="top">
                              <p>{ serverData.pluginsCount } <br /><span className="textBelow">Plugins Count</span></p>
                            </Tooltip>
                          </div> :
                          <div className="serverPlugins" style={{ display: 'none' }}></div> 
                        }
                      </div>
                    </div>
                  </div>
                  <svg className="serverWave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#242a30" fill-opacity="1" d="M0,160L48,144C96,128,192,96,288,85.3C384,75,480,85,576,90.7C672,96,768,96,864,85.3C960,75,1056,53,1152,69.3C1248,85,1344,139,1392,165.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
                </div>
              }
            </div>
          }
          <div className="justempty"></div>
        </div>
      </div>
      <svg className="svgServer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#222831" fill-opacity="1" d="M0,288L120,277.3C240,267,480,245,720,240C960,235,1200,245,1320,250.7L1440,256L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path></svg>
      <FooterComponent />
    </div>
  )
}

export default ServerComponent
