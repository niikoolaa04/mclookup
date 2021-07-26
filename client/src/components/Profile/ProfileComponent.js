import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import Tooltip from '@material-ui/core/Tooltip';
import axios from 'axios';
import NavbarComponent from '../Navigation/NavbarComponent'
import FooterComponent from '../Footer/FooterComponent'
import LoadingComponent from '../Loading/LoadingComponent'
import ProfileServersComponent from './ProfileServersComponent'
import { getUserFromToken } from '../../utils/getUserFromToken'
import { convertNumber } from '../../utils/utils'
import { getCookie } from '../../utils/getCookie'
import { getGuildsFromID } from '../../utils/getGuildsFromID'
import { isValidUser } from '../../utils/isValidUser'
import './style.css'

function ProfileComponent() {
  const history = useHistory();

  const [userID, setUserID] = useState(0);
  const [userGuilds, setUserGuilds] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [username, setUsername] = useState('Username#Tag');
  const [hypeSquad, setHypeSquad] = useState({
    name: 'Balance',
    url: 'https://discord.com/assets/58f11abcf3c13812bff969baaeb84d82.svg'
  });
  const [created, setCreated] = useState('6/13/2015, 1:00:00 AM');
  const [nitro, setNitro] = useState({
    type: 'N/A',
    active: false
  });

  const styleFix = {
    transition: 'all 0.3s ease-in-out'
  };

  async function getOwnership(arr) {
    const filtered = arr.filter(e => e.owner === true);
    setUserGuilds(filtered);
  }

  async function postNow() {
    await axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/database/newUser`, { username: 'Test', idUSER: 123 }, {
      headers:{
          "Content-Type": "application/json",
    }})
    .catch((err) => console.log(err));
  }

  useEffect(async () => {
    if(await isValidUser() === false) return history.push("/");
    setLoading(true);
    let user = await getUserFromToken(getCookie("qwerty_access"));
    let guildsNum = await getGuildsFromID(user.id, getCookie("qwerty_access"));

    getOwnership(guildsNum);

    setUsername(user.username + '#' + user.discriminator);
    setUserID(user.id);

    if(user.premium_type == 1) setNitro({ 
      type: 'Nitro Classic',
      active: true
     });
     else if(user.premium_type == 2) setNitro({
       type: 'Nitro',
       active: true
     });

    let date = convertNumber(user.id);
    setCreated(date);

    if(user.public_flags == 64) setHypeSquad({
        name: 'HypeSquad Bravery',
        url: 'https://discord.com/assets/995ecfdbdf94ad84dd4d802c104e4630.svg'
      });
    else if(user.public_flags == 128) setHypeSquad({
        name: 'HypeSquad Brilliance',
        url: 'https://discord.com/assets/473dadec13ab7e90e209cc60fccb31c5.svg'
      });
    else if(user.public_flags == 256) setHypeSquad({
        name: 'HypeSquad Balance',
        url: 'https://discord.com/assets/58f11abcf3c13812bff969baaeb84d82.svg'
      });


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

                  <p className="profileUsername" onClick={async () => await postNow()}>{ username }</p>
                  <p className="profileID">{ userID }</p>
                  <div className="profilePicture">
                    <img src="https://cdn.discordapp.com/embed/avatars/2.png" alt="" className="profileImg" />
                  </div>
                  <p className="profileCreated"><span className="accCreated">Account Created</span>: { created }</p>
                  <p className="profileGuildsCount"><span className="guildsCount">Guilds with Ownership</span>: { userGuilds.length }</p>

                  <div className="serversList">
                    <ProfileServersComponent servers={userGuilds} userID={userID} />
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
