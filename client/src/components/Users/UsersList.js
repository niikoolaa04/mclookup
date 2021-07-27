import {React, useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import './listStyle.css'

function UsersList({ users, setUsers }) {

  return users.map((u, index) => (
    <div className="allUsersWrapper" key={index}>
      <div className="userCard">
        <img src={u.avatarURL} alt="" className="userlistIcon" />
        <p className="userlistUsername">{ u.username }#{ u.discriminator }</p>
        <p className="userlistID">{ u.userID }</p>
        <Link to={'/profile/' + u.userID} className="linkToUser">
          <button className="viewUserProfile">View</button>
        </Link>
      </div>
    </div>
  ))
}

export default UsersList
