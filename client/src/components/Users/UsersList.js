import {React, useState, useEffect} from 'react'
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from 'react-router-dom';
import './listStyle.css'

function UsersList({ users, setUsers }) {

  return users.map((u, index) => (
    <div className="allUsersWrapper" key={index}>
      <div className="userCard">
        <img src={u.avatarURL} alt="" className="userlistIcon" />
        <p className="userlistUsername">{ u.username }#{ u.discriminator }</p>
        <p className="userlistID">{ u.userID }</p>
        {
          u.owner == true ?
          <Tooltip title="Website Owner" placement="top">
            <img src="https://image.flaticon.com/icons/png/128/5158/5158965.png" className="listBadge listOwner" alt="" />
          </Tooltip> : ''
        }
        {
          u.staff == true ?
            <Tooltip title="Website Staff" placement="top">
              <img src="https://discord.com/assets/f62be1ec9bdd82d3d77158ad81830e68.svg" className="listBadge listStaff" alt="" />
            </Tooltip> : ''
        }
        <Link to={'/profile/' + u.userID} className="linkToUser">
          <button className="viewUserProfile">View</button>
        </Link>
      </div>
    </div>
  ))
}

export default UsersList
