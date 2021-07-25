import { React, useState, useEffect } from 'react'
import Tooltip from '@material-ui/core/Tooltip';
import './serversListStyle.css'

function ProfileServersComponent({ servers, userID }) {

  useEffect(() => {
    console.log(servers);
  }, [])

  return servers.map((srv, index) => (
    <div>
      <div className="profileServers" key={index}>
        {/* <p className="profileServerName" key={index}>{ srv.name }</p> */}
        {
          srv.icon === null ?
          <Tooltip title={srv.name} placement="top">
            <img src="https://cdn.discordapp.com/embed/avatars/0.png" alt="" className="profileServerImage" />
          </Tooltip>
          :
          <Tooltip title={srv.name} placement="top">
            <img src={`https://cdn.discordapp.com/icons/${srv.id}/${srv.icon}.webp?size=128`} alt="" className="profileServerImage" />
          </Tooltip>
        }
      </div>
    </div>
  ))
}

export default ProfileServersComponent
