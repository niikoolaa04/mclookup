import { React, useState, useEffect } from 'react'
import axios from 'axios';
import './description.css'

function DescriptionComponent({ open, setOpen, message, setMessage, userID, setDescVisible }) {

  const [desc, setDesc] = useState('');

  const handleChange = (e) => setDesc(e.target.value);

  function handleReturn() {
    setDesc('')
    setOpen(true);
    setMessage('Description is too short, try again.');
  }
  
  function handleSubmit(e) {
    if(desc.length < 8) return handleReturn();
    setOpen(true);
    setMessage('Description Updated Successfully');
    axios.put(`${process.env.REACT_APP_SERVER_DOMAIN}/api/users/${userID}/description`, {
      description: desc
    }, {
      headers: {
        "Request_Token": `${process.env.REACT_APP_API_KEY}`
      }
    }).catch((err) => console.log(err));
    setDesc('');
    setDescVisible(false);
  }

  return (
    <div>
      <div className="descFormContainer">
        <form onSubmit={(e) => handleSubmit(e)}>
          <textarea name="newDesc" 
            placeholder="Enter your new Description Here" 
            value={desc} 
            className="descArea" 
            onChange={(e) => handleChange(e)}
            maxLength="480">
          </textarea>
        </form>
        <button className="descBttn" onClick={(e) => handleSubmit(e)}>Update</button>
      </div>
    </div>
  )
}

export default DescriptionComponent
