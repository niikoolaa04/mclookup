import {React, useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import './listStyle.css'

function UsersList({ users, setUsers }) {

  async function getAllUsers() {
    await axios.get("http://localhost:3009/database/users", {
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res) => {
      setUsers(res.data);
    });
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  return users.map((u, index) => (
    <div className="usersCard" key={index}>
      <img src={u.avatarURL} alt="" className="userlistIcon" />
      <p className="userlistUsername">{ u.username }#{ u.discriminator }</p>
      <p className="userlistID">{ u.userID }</p>
      <Link to={'/profile/' + u.userID} className="linkToUser">
        <button className="viewUserProfile">View</button>
      </Link>
    </div>
  ))
}

export default UsersList
