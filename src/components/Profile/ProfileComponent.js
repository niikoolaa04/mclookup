import React, { useEffect, useState } from 'react'
import { isAuthenticated } from '../../utils/isAuthenticated'
import getUserFromToken from '../../utils/getUserFromToken'
import { getCookie } from '../../utils/getCookie'

function ProfileComponent() {

  const [username, setUsername] = useState('')

  useEffect(async () => {
    let user = await getUserFromToken(getCookie("qwerty_access"));
    setUsername(user.username + '#' + user.discriminator)
  }, [])

  return (
    <div>
      <p className="username">{ username }</p>
    </div>
  )
}

export default ProfileComponent
