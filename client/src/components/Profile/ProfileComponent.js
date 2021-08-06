import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import axios from 'axios';
import Tooltip from '@material-ui/core/Tooltip';
import Transition from 'react-transition-group/Transition';
import NavbarComponent from '../Navigation/NavbarComponent'
import FooterComponent from '../Footer/FooterComponent'
import LoadingComponent from '../Loading/LoadingComponent'
import DescriptionComponent from './DescriptionComponent';
import SnackbarComponent from '../Snackbar/SnackbarComponent';
import Button from '@material-ui/core/Button';
import { convertNumber } from '../../utils/utils'
import { getCookie } from '../../utils/getCookie';
import { getUserFromToken } from '../../utils/getUserFromToken';
import { isOwner } from '../../utils/utils';
import './style.css'

function ProfileComponent() {
  const { id } = useParams();

  const [descVisible, setDescVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState([]);
  const [loggedUser, setLoggedUser] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [hypeSquad, setHypeSquad] = useState({
    name: '',
    url: ''
  });
  const [created, setCreated] = useState('');
  const [nitro, setNitro] = useState({
    type: 'N/A',
    active: false
  });

  async function getUser() {
    await axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/api/users/${id}`, {
      headers: {
        "Request_Token": `${process.env.REACT_APP_API_KEY}`,
        "Content-Type": "application/json"
      }
    }).then(async (res) => {
      setCurrentUser(res.data);
      let time = await convertNumber(res.data.userID);
      if(res.data.nitro == 1) setNitro({
        type: 'Nitro Classic',
        active: true
      });
      else if(res.data.nitro == 2) setNitro({
        type: 'Nitro',
        active: true
      });
      else setNitro({
        type: 'N/A',
        active: false
      });
      if(res.data.hypeSquad == 64) setHypeSquad({
        name: 'HypeSquad Bravery',
        url: 'https://discord.com/assets/995ecfdbdf94ad84dd4d802c104e4630.svg'
      });
      else if(res.data.hypeSquad == 128) setHypeSquad({
        name: 'HypeSquad Brilliance',
        url: 'https://discord.com/assets/473dadec13ab7e90e209cc60fccb31c5.svg'
      });
      else if(res.data.hypeSquad == 256) setHypeSquad({
        name: 'HypeSquad Balance',
        url: 'https://discord.com/assets/58f11abcf3c13812bff969baaeb84d82.svg'
      });
      setCreated(time);
    });
  }

  async function getLoggedUser() {
    let tokenCookie = getCookie("bmfA71q");
    let user = await getUserFromToken(tokenCookie);
    setLoggedUser(user.id);
  }

  useEffect(async () => {
    setLoading(true);
    getUser();
    await getLoggedUser();
    setLoading(false);
  }, [])

  return (
    <div>
      <NavbarComponent style={{ zIndex: '5000' }} />
      <div className="profileContainer">
        <div className="profileHero">
          {
            isLoading == true ? <LoadingComponent marginFix='6.5rem' /> : ''
          }
          <div className="profileBoxContainer">
            <Transition in={true} timeout={1500} mountOnEnter unmountOnExit appear>
              {(state) => (
                <div className={`profileBox profileBoxStatus-${state}`}>
                  <div className="profileBoxContent">
                    <div className="profileInfo">
                      <div className="manageUserBttns">
                        {
                          (async() => await isOwner()) ? 
                          currentUser.staff == false ?
                            <Button variant="contained" color="primary" className="manageAdminBttn" >
                              ADD ADMINISTRATOR
                            </Button> :
                            <Button variant="contained" color="primary" className="manageAdminBttn" >
                              REMOVE ADMINISTRATOR
                            </Button>
                          : ''
                        }
                      </div>
                      <div className="badgesContainer">
                        {
                          currentUser.owner == true ?
                            <Tooltip title="Website Owner" placement="top">
                              <img src="https://image.flaticon.com/icons/png/128/5158/5158965.png" className="badge ownerBadge" alt="" />
                            </Tooltip>
                            :
                            ''
                        }
                        {
                          currentUser.staff == true ?
                            <Tooltip title="Website Staff" placement="top">
                              <img src="https://discord.com/assets/f62be1ec9bdd82d3d77158ad81830e68.svg" className="badge staffBadge" alt="" />
                            </Tooltip>
                            :
                            ''
                        }
                        {
                          hypeSquad === '' ? '' :
                          <Tooltip title={hypeSquad.name} placement="top">
                            <img src={hypeSquad.url} className="badge hypeSquad" alt="" />
                          </Tooltip>
                        }
                        {
                          nitro.active === true ? 
                          <Tooltip title={nitro.type} placement="top">
                            <img src="https://discord.com/assets/e04ce699dcd2fd50d352a384511687a9.svg" className="badge nitroBadge" alt="" />
                          </Tooltip>
                          :
                          ''
                        }
                      </div>
                      <p className="profileUsername">{ currentUser.username }#{ currentUser.discriminator }</p>
                      <p className="profileID">{ currentUser.userID }</p>
                      <div className="profilePicture">
                        <img src={currentUser.avatarURL} alt="" className="profileImg" />
                      </div>
                      <div className="profileExtra">
                        <p className="profileCreated"><span className="accCreated">Account Created</span>: { created }</p>
                        <div className="profileDescription">
                          {/* ~485 characters limit */}
                          <div className="descWrapper">
                            <p className="descriptionText"> 
                              { currentUser.description }
                            </p>
                          </div>
                          {
                            currentUser.userID == loggedUser ?
                            <button className="editDescription" onClick={() => setDescVisible(true)}>Edit Description</button>
                            : ''
                          }
                        </div>
                        {
                          descVisible ? 
                          <DescriptionComponent 
                            userID={loggedUser} 
                            setDescVisible={setDescVisible} 
                            message={message}
                            setMessage={setMessage}
                            open={open}
                            setOpen={setOpen}
                          /> 
                          : ''
                        }
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Transition>
          </div>
        </div>
      </div>
      <SnackbarComponent open={open} setOpen={setOpen} message={message} setMessage={setMessage} />
      <FooterComponent />
    </div>
  )
}

export default ProfileComponent
