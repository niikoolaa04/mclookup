import { React, useRef, useState, useEffect } from 'react';
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

function ServerFormComponent({ data, setData, input, setInput, searchIP, setSearchIP, setTest }) {
  const classes = useStyles();

  function getJavaServer(ip) {
    axios.get(`https://api.mcsrvstat.us/2/${ip}`)
      .then(response => {
        const apiResponse = response.data;
        let motdText = '';

        for(let i = 0; i < apiResponse.motd.clean.length; i++) {
          motdText += apiResponse.motd.clean[i];
        }
        setInput('');
        setData({
          status: apiResponse.online == true ? 'Online' : 'Offline',
          hostname: apiResponse.hostname,
          ip: apiResponse.ip,
          port: apiResponse.port,
          version: apiResponse.version,
          playerCount: apiResponse.players.online + '/' + apiResponse.players.max,
          software: apiResponse.software || 'Not Detected',
          motd: motdText
        });
      }).catch((e) => {
        setData({ status: 'Error' });
      });
  }

  const handleChange = (e) => {
    setSearchIP(e.target.value);
    setInput(e.target.value);
  }

  return (
    <div className={classes.root}>
      <div className="formContainer">
        <form onSubmit={(e) => {
          getJavaServer(searchIP);
          e.preventDefault();
          }}>
          <TextField id="filled-basic" value={input} variant="filled" className="formInput" onChange={(e) => handleChange(e)} />
        </form>
        <Button variant="contained" className="formBttn" color="primary" onClick={() => {
          getJavaServer(searchIP)
        }}> 
          Search
        </Button>
      </div>
    </div>
  )
}

export default ServerFormComponent
