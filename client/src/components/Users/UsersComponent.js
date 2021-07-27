import {React, useState, useEffect} from 'react'
import NavbarComponent from '../Navigation/NavbarComponent';
import FooterComponent from '../Footer/FooterComponent';
import PagionationComponent from './PagionationComponent';
import UsersList from './UsersList'
import axios from 'axios';
import './style.css'

function UsersComponent() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  async function getAllUsers() {
    console.log(process.env)
    await axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/database/users`, {
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
          <h2 className="userListTitle">All Registered Users { users.length }</h2>
          <div className="userListSubtitleDiv">
            <p className="userListSubtitle">List of all Users Registered to our Website.</p>
          </div>
          {/* row */}
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
