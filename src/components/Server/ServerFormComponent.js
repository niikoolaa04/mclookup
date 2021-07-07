import { React, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import './formStyle.css';
import $ from 'jquery';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function ServerFormComponent({ data, setData, input, setInput, searchIP, setSearchIP, loading, setLoading }) {
  const classes = useStyles();

  function getJavaServer(ip) {
    axios.get(`https://api.mcsrvstat.us/2/${ip}`)
      .then(response => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
        const apiResponse = response.data;
        setInput('');
        setData({});
        setData({
          status: apiResponse.online == true ? 'Online' : 'Offline',
          hostname: apiResponse.hostname,
          ip: apiResponse.ip,
          port: apiResponse.port,
          version: apiResponse.version,
          playerCount: apiResponse.players.online,
          maxPlayerCount: apiResponse.players.max,
          players: apiResponse.players.list == undefined ? [] : apiResponse.players.list,
          software: apiResponse.software || 'Not Detected',
          pluginsCount: apiResponse.plugins == undefined ? 0 : apiResponse.plugins.names.length,
          plugins: apiResponse.plugins == undefined ? [] : apiResponse.plugins.names
        });
        $(".firstLine").html('');
        $(".secondLine").html('');
        $(".firstLine").html(apiResponse.motd.html[0]);
        if(apiResponse.motd.html.length == 1) return;
        $(".secondLine").html(apiResponse.motd.html[1]);
      }).catch((e) => {
        $(".firstLine").html('');
        $(".secondLine").html('');
        setInput('');
        setData({ status: 'Error' });
      });
  }

  const handleChange = (e) => {
    setSearchIP(e.target.value);
    setInput(e.target.value);
  }

  return (
    <div className={classes.root}>
      <div className="motdElement"></div>
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
