import React, { useEffect, useState } from 'react'
import NavbarComponent from '../Navigation/NavbarComponent'
import FooterComponent from '../Footer/FooterComponent'
import { isAuthenticated } from '../../utils/isAuthenticated'
import getUserFromToken from '../../utils/getUserFromToken'
import { getCookie } from '../../utils/getCookie'
import './style.css'

function ProfileComponent() {

  const [username, setUsername] = useState('')

  useEffect(async () => {
    let user = await getUserFromToken(getCookie("qwerty_access"));
    setUsername(user.username + '#' + user.discriminator)
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
                  Yoooo
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
