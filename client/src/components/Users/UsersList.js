import {React, useState, useEffect} from 'react'
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
    console.log(users)
  }, [])

  return users.map((u, index) => (
    <div className="usersCard" key={index}>
      <img src={u.avatarURL} alt="" className="userlistIcon" />
      <p className="userlistUsername">{ u.username }#{ u.discriminator }</p>
      <p className="userlistID">{ u.userID }</p>
    </div>
  ))
}

export default UsersList
