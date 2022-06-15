import { React, useState } from 'react';
import FooterComponent from '../Footer/FooterComponent';
import ServerFormComponent from './ServerFormComponent';
import NavbarComponent from '../Navigation/NavbarComponent';
import Tooltip from '@material-ui/core/Tooltip';
import Transition from 'react-transition-group/Transition';
import LoadingComponent from '../Loading/LoadingComponent';
import './style.css'

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

  let emptySearch = '';
  if(searchIP === '') emptySearch = 'No IP Entered'
  else emptySearch = searchIP;

  const styleFix = {
    transition: 'all 0.3s ease-in-out'
  };

  return (
    <div>
      <NavbarComponent style={{ zIndex: '5000' }} />
      <div className="serverContainer">
        {/* <div className="serverHero" id="hero"> */}
          <Transition in={true} timeout={2000} mountOnEnter unmountOnExit appear>
            {(state) => (
              <div className={`formWrap srvStatus-${state}`}>
                <h2 className="serverTitle">Minecraft Server Lookup</h2>
                <div className="serverSubtitleDiv">
                  <p className="serverSubtitle">Enter desired Server IP into Search Box</p>
                </div>
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
              </div>
            )}
          </Transition>
          {
            isLoading === true ? <LoadingComponent style={styleFix}/> : ''
          }
          { serverData.status === '' ? 
            <div className="serverBoxContainer">
              <div className="serverBox">
                <div className="">
                  <div className="noServer">
                    <h4 className="noServerTitle">Welcome to Search Player Page</h4>
                    <p>To get Information about Player, enter Username into form and click 'Search'</p>
                  </div>
                </div>
              </div>
            </div> :
            <div>
              {
                serverData.status === 'Error' ?
                <div className="serverBoxContainer">
                  <div className="serverBox">
                    <div className="boxContent">
                      <div className="noServer">
                        <h4 className="noServerTitle">An Error Ocurred with your Request</h4>
                        <p>Server with provided IP Address is either Offline or doesn't exist.</p>
                        <p className="noServerIP"><strong>Entered IP Address:</strong> { emptySearch }</p>
                      </div>
                    </div>
                  </div>
                </div> :
                <div className="serverBoxContainer">
                  <Transition in={true} timeout={1500} mountOnEnter unmountOnExit appear>
                    {(state) => (
                      <div className={`serverBox serverBoxStatus-${state}`}>
                        <div className="boxContent">
                          <div className="serverInfo">
                            <input type="input" value={serverData.ip + ':' + serverData.port} id="copy-ip"></input> 
                            <div className="serverFavicon">
                              <img src={`https://api.minetools.eu/favicon/${serverData.hostname}`} alt="" className="favicon" />
                            </div>
                            <div className="motdEl">
                              <span className="firstLine"></span>
                              <span className="secondLine"></span>
                            </div>
                            <p className="serverDomain">{ serverData.hostname }</p>
                            <Tooltip title={`Click to Copy Server IP`} placement="top">
                              <div className="serverIP" onClick={(e) => {
                                var text = document.querySelector('#copy-ip');
                                text.select();
                                document.execCommand('copy');
                              }}>
                                <p>{ serverData.ip + ':' + serverData.port } <br /><span className="textBelow">Server IP</span></p>
                              </div>
                            </Tooltip>
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
                    )}
                  </Transition>
                </div>
              }
            </div>
          }
        {/* </div> */}
      </div>
      <FooterComponent />
    </div>
  )
}

export default ServerComponent
