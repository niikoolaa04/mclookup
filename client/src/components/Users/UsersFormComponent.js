import {React, useState} from 'react'
import Button from '@material-ui/core/Button';
import axios from 'axios';
import './usersForm.css'

function UsersFormComponent({ oldUsers, setUsers, setCurrentPage }) {

  const [input, setInput] = useState('');

  const handleChange = (e) => setInput(e.target.value);

  function handleSearch(e) {
    e.preventDefault();
    if(!input) return setUsers(oldUsers);
    axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/api/search/users/${input}`, {
      headers: {
        "Request_Token": `${process.env.REACT_APP_API_KEY}`
      }
    }).then((res) => {
      if(res.data == null) return setUsers(oldUsers);
      let arr = [];
      arr.push(res.data);
      setCurrentPage(1);
      setUsers(arr);
    })
    setInput('');
  }

  return (
    <div>
      <div className="usersFormWrapper">
        <div className="usersFormContainer">
          <div className="usersForm">
            <form onSubmit={(e) => {
              handleSearch(e)
              }}>
              <input type="text" className="usersInput" id="name" value={input} placeholder="Username" onChange={(e) => handleChange(e)} required="" />
            </form>
          </div>
          <div className="bttnUsers">
            <Button variant="contained" className="usersFormBttn" color="primary" onClick={(e) => {
              handleSearch(e)
            }}> 
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UsersFormComponent
