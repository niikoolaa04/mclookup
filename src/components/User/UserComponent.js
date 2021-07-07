import { React, useState } from 'react';
import './style.css'
import FooterComponent from '../Footer/FooterComponent';
import UserFormComponent from './UserFormComponent';
import NavbarComponent from '../Navigation/NavbarComponent';
import LoadingComponent from '../Loading/LoadingComponent';
import Tooltip from '@material-ui/core/Tooltip';

function UserComponent() {
  const [nameHistory, setNameHistory] = useState([]);
  const [userData, setUserData] = useState({
    username: '',
    uuid: '',
    body: '',
    skin: '',
    cape: ''
  });

  const [input, setInput] = useState('');
  const [searchUser, setSearchUser] = useState('');
  const [searchUUID, setSearchUUID] = useState('');
  const [isLoading, setLoading] = useState(false);

  let emptySearch = '';
  if(searchUser == '') emptySearch = 'No Username Provided'
  else emptySearch = searchUser;

  const styleFix = {
    transition: 'all 0.3s ease-in-out'
  };

  async function downloadImage(imageSrc, fileName) {
    const image = await fetch(imageSrc)
    const imageBlog = await image.blob()
    const imageURL = URL.createObjectURL(imageBlog)
  
    const link = document.createElement('a')
    link.href = imageURL
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div>
      <NavbarComponent style={{ zIndex: '5000' }} />
      <div className="userContainer">
        <div className="userHero" id="hero">
          <h2 className="userTitle">Minecraft Player Informations</h2>
          <div className="userSubtitleDiv">
            <p className="userSubtitle">Enter Username of Minecraft Player</p>
          </div>
          <UserFormComponent 
            data={userData} 
            setData={setUserData} 
            input={input} 
            setInput={setInput} 
            searchUser={searchUser}
            setSearchUser={setSearchUser}
            setSearchUUID={setSearchUUID}
            searchUUID={searchUUID}
            setNameHistory={setNameHistory}
            nameHistory={nameHistory}
            setLoading={setLoading}
          />
          {
            isLoading == true ? <LoadingComponent style={styleFix}/> : ''
          }
          { userData.username == '' ? 
            <div className="userBoxContainer">
              <div className="userBox" style={{ width: '0px' }}>
                <div className="boxContent" style={{ height: '0px' }}>
                  
                </div>
              </div>
              <svg className="heroWave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#242a30" fill-opacity="1" d="M0,160L48,144C96,128,192,96,288,85.3C384,75,480,85,576,90.7C672,96,768,96,864,85.3C960,75,1056,53,1152,69.3C1248,85,1344,139,1392,165.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
            </div> :
            <div className="t">
              {
                userData.username == 'Error' ?
                <div className="userBoxContainer">
                  <div className="userBox" style={{ width: '0px' }}>
                    <div className="boxContent" style={{ height: '0px' }}>
                    </div>
                  </div>
                  <div className="noUser">
                    <h4 className="noUserTitle">An Error Ocurred with your Request</h4>
                    <p>Player with such username couldn't be found, please try again.</p>
                    <p className="noUsername"><strong>Entered Username:</strong> { emptySearch }</p>
                  </div>
                  <svg className="heroWave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#242a30" fill-opacity="1" d="M0,160L48,144C96,128,192,96,288,85.3C384,75,480,85,576,90.7C672,96,768,96,864,85.3C960,75,1056,53,1152,69.3C1248,85,1344,139,1392,165.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
                </div> :
                <div className="userBoxContainer">
                  <div className="userBox">
                    <div className="userBoxContent">
                      <div className="profileInfo">
                        <div className="imageBox">
                          <img src={ userData.body } alt="" className="mcSkin" />
                        </div>
                        <p className="mcUsername">{ userData.username }</p>
                        <input type="input" value={userData.uuid} id="copy-uuid"></input>
                        <Tooltip title={`Click to Copy UUID`} placement="top">
                          <div className="uuidField" onClick={() => {
                            var text = document.querySelector('#copy-uuid');
                            text.select();
                            document.execCommand('copy');
                          }}>
                            <p>{ userData.uuid }</p>
                          </div>
                        </Tooltip>
                        <div className="skinField">
                          <p onClick={() => downloadImage(userData.skin, 'skin')}>Download Skin</p>
                        </div>
                        {
                          userData.cape == '' ?
                          '' :
                          <div className="capeField">
                            <p onClick={() => downloadImage(userData.cape, 'cape')}>Download Cape</p>
                          </div>
                        }
                        <div className="nameHistory">
                          <div className="nameHistoryInner">
                            {
                              nameHistory.map((data, i) => (
                                <p className="newName" key={i}>{ data.name }<br /><span className="historySpan" key={i}>{ data.date == undefined ? 'First Username' : new Date(data.date).toLocaleString() }</span></p>
                              ))
                            }
                          </div>
                        </div>
                        {
                          userData.cape == '' ?
                          '' :
                          <div className="capePreview">
                            <img src={userData.cape} alt="" className="capeIMG" />
                          </div>
                        }
                        <div className="avatarPreview">
                          <img src={`https://crafatar.com/avatars/${userData.uuid}`} alt="" className="avatarIMG" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <svg className="userWave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#242a30" fill-opacity="1" d="M0,160L48,144C96,128,192,96,288,85.3C384,75,480,85,576,90.7C672,96,768,96,864,85.3C960,75,1056,53,1152,69.3C1248,85,1344,139,1392,165.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
                </div>
              }
            </div>
          }
          <div className="nothing">

          </div>
        </div>
      </div>
      <svg className="svgUser" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#222831" fill-opacity="1" d="M0,288L120,277.3C240,267,480,245,720,240C960,235,1200,245,1320,250.7L1440,256L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path></svg>
      <FooterComponent />
    </div>
  )
}

export default UserComponent