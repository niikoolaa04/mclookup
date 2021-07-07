import { React } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import './formStyle.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function UserFormComponent({ data, setData, input, setInput, searchUser, setSearchUser, searchUUID, setSearchUUID, setNameHistory, nameHistory,setLoading }) {
  const classes = useStyles();

  function getPlayer(e) {
    e.preventDefault();
    setLoading(true);
    let history = [];
    axios.get(`https://playerdb.co/api/player/minecraft/${input}`)
      .then(response => {
        let apiResponse = response.data.data.player;
        for(let i = 0; i < apiResponse.meta.name_history.length; i++) {
          history.push({
            name: apiResponse.meta.name_history[i].name,
            date: apiResponse.meta.name_history[i].changedToAt
          });
        }
        axios.get(`https://api.capes.dev/load/${input}`)
          .then(resp => {
            const apiResp = resp.data;
            setData({
              username: apiResponse.username,
              uuid: apiResponse.id,
              body: `https://crafatar.com/renders/body/${apiResponse.id}.png`,
              skin: `https://crafatar.com/skins/${apiResponse.id}.png`,
              cape: apiResp.optifine.imageUrls == undefined ? '' : apiResp.optifine.imageUrls.still.front
            });
            setNameHistory(history);
            setLoading(false);
        });
      }).catch((e) => {
        setData({ username: 'Error' });
        setLoading(false);
      });
  }

  const handleChange = (e) => {
    setSearchUser(e.target.value);
    setInput(e.target.value);
  }

  return (
    <div className={classes.root}>
      <div className="formContainer">
        <form onSubmit={(e) => {
          getPlayer(e);
          }}>
          <input type="text" className="userInput" id="name" placeholder="Username/UUID" onChange={(e) => handleChange(e)} required="" />
        </form>
        <Button variant="contained" className="formBttn" color="primary" onClick={(e) => {
          getPlayer(e)
        }}> 
          Search
        </Button>
      </div>
    </div>
  )
}

export default UserFormComponent
