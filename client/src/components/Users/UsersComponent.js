import {React, useState, useEffect} from 'react'
import NavbarComponent from '../Navigation/NavbarComponent';
import FooterComponent from '../Footer/FooterComponent';
import PagionationComponent from './PagionationComponent';
import UsersFormComponent from './UsersFormComponent';
import UsersList from './UsersList'
import { updateAllProfiles } from '../../utils/updateProfile';
import axios from 'axios';
import './style.css'

function UsersComponent() {

  const [users, setUsers] = useState([]);
  const [oldUsers, setOldUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  async function getAllUsers() {
    await axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/api/users`, {
      headers: {
        "Request_Token": `${process.env.REACT_APP_API_KEY}`,
        "Content-Type": "application/json"
      }
    }).then((res) => {
      setUsers(res.data);
      setOldUsers(res.data);
    });
  }

  useEffect(async () => {
    getAllUsers();
    updateAllProfiles();
  }, [])

  const indexOfLastPost = currentPage * usersPerPage;
  const indexOfFirstPost = indexOfLastPost - usersPerPage;
  const currentUsers = users.slice(indexOfFirstPost, indexOfLastPost);

  const nextPage = () => {
    if(currentPage + 1 > Math.ceil(users.length / usersPerPage)) return;
    setCurrentPage(currentPage + 1);
  }

  const prevPage = () => {
    if(currentPage - 1 == 0) return;
    setCurrentPage(currentPage - 1);
  }

  return (
    <div>
      <NavbarComponent style={{ zIndex: '5000' }} />
      <div className="userListContainer">
        <div className="userListHero">
          <h2 className="userListTitle">All Registered Users</h2>
          <div className="userListSubtitleDiv">
            <p className="userListSubtitle">Enter Username to search for.</p>
          </div> 
          <UsersFormComponent
            setCurrentPage={setCurrentPage}
            setUsers={setUsers}
            users={users}
            oldUsers={oldUsers}
          />
          <div className="usersWrapper">
            <UsersList users={currentUsers} setUsers={setUsers}/>
          </div>
          <PagionationComponent
            currentPage={currentPage}
            nextPage={nextPage}
            prevPage={prevPage}
          />
        </div>
      </div>
      <FooterComponent />
    </div>
  )
}

export default UsersComponent
