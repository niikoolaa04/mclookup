import React from 'react'
import Tooltip from '@material-ui/core/Tooltip';
import Transition from 'react-transition-group/Transition';
import { Link } from 'react-router-dom';
import './listStyle.css'

function UsersList({ users, setUsers }) {

  return users.map((u, index) => (
    <div className="allUsersWrapper" key={index}>
      <Transition in={true} timeout={1000} key={index} mountOnEnter unmountOnExit appear>
        {(state) => (
          <div className={`userCard userCardStatus-${state}`}>
            <img src={u.avatarURL} alt="" className="userlistIcon" />
            <p className="userlistUsername">{ u.username }#{ u.discriminator }</p>
            <p className="userlistID">{ u.userID }</p>
            {
              u.staff == true ?
                <Tooltip title="Website Staff" placement="top">
                  <img src="https://discord.com/assets/f62be1ec9bdd82d3d77158ad81830e68.svg" className="listBadge listStaff" alt="" />
                </Tooltip> : ''
            }
            {
              u.owner == true ?
              <Tooltip title="Website Owner" placement="top">
                <img src="https://image.flaticon.com/icons/png/128/5158/5158965.png" className="listBadge listOwner" alt="" />
              </Tooltip> : ''
            }
            <Link to={'/profile/' + u.userID} className="linkToUser">
              <button className="viewUserProfile">View</button>
            </Link>
          </div>
        )}
      </Transition>
    </div>
  ))
}

export default UsersList
