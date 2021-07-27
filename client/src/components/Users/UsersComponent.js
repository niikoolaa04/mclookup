import {React, useState} from 'react'
import NavbarComponent from '../Navigation/NavbarComponent';
import UsersList from './UsersList'
import './style.css'

function UsersComponent() {

  const [users, setUsers] = useState([]);

  return (
    <div>
      <NavbarComponent style={{ zIndex: '5000' }} />
      <div className="userListContainer">
        <div className="userListHero">
          <div className="usersListAll">
            <UsersList users={users} setUsers={setUsers}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UsersComponent
