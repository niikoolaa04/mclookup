import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import Tooltip from '@material-ui/core/Tooltip';
import axios from 'axios';
import NavbarComponent from '../Navigation/NavbarComponent'
import FooterComponent from '../Footer/FooterComponent'
import LoadingComponent from '../Loading/LoadingComponent'
import { convertNumber } from '../../utils/utils'
import './style.css'
import { updateAllProfiles } from '../../utils/updateProfile';

function ProfileComponent() {
  const { id } = useParams();

  const [userID, setUserID] = useState(0);
  const [currentUser, setCurrentUser] = useState([]);
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

  const styleFix = {
    transition: 'all 0.3s ease-in-out'
  };

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

  useEffect(async () => {
    setLoading(true);
    getUser();
    // updateAllProfiles();
    setLoading(false);
  }, [])

  return (
    <div>
      <NavbarComponent style={{ zIndex: '5000' }} />
      <div className="profileContainer">
        <div className="profileHero">
          <div className="profileBoxContainer">
            <div className="profileBox">
              <div className="profileBoxContent">
                <div className="profileInfo">
                  {/* <div className="profileUserTag">
                  </div> */}
                  <div className="badgesContainer">
                    {
                      hypeSquad === '' ? '' :
                      <Tooltip title={hypeSquad.name} placement="top">
                        <img src={hypeSquad.url} className="hypeSquad" alt="" className="badge" />
                      </Tooltip>
                    }
                    {
                      nitro.active === true ? 
                      <Tooltip title={nitro.type} placement="top">
                        <img src="https://discord.com/assets/e04ce699dcd2fd50d352a384511687a9.svg" className="nitroBadge" alt="" className="badge" />
                      </Tooltip>
                      :
                      ''
                    }
                  </div>

                  {
                    isLoading == true ? <LoadingComponent style={styleFix}/> : ''
                  }

                  <p className="profileUsername">{ currentUser.username }#{ currentUser.discriminator }</p>
                  <p className="profileID">{ currentUser.userID }</p>
                  <div className="profilePicture">
                    <img src={currentUser.avatarURL} alt="" className="profileImg" />
                  </div>
                  <div className="profileExtra">
                    <p className="profileCreated"><span className="accCreated">Account Created</span>: { created }</p>
                    
                    <div className="profileDescription">
                      Lorem ipsum gsehkns sng songseohgsanhjsenhskhskhbsejysbgk bsjknh sjgneihnsejgbsghsbhgsbngsionhsoihnsekhnskh
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterComponent />
    </div>
  )
}

export default ProfileComponent
