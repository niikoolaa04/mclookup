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

function ServerFormComponent({ data, setData }) {
  const classes = useStyles();

  function getJavaServer(ip) {
    axios.get(`https://api.mcsrvstat.us/2/${ip}`)
      .then(response => {
        const apiResponse = response.data;
        setData({
          status: apiResponse.online,
          hostname: apiResponse.hostname,
          ip: apiResponse.ip,
          port: apiResponse.port,
          version: apiResponse.version,
          playerCount: apiResponse.players.online,
          maxPlayerCount: apiResponse.players.max,
          software: apiResponse.software
        })
      }).catch((e) => {
        setData({ status: '' });
      });
  }


  // const handleChange = (e) => {
  //   setCity(e.target.value);
  //   setInput(e.target.value);
  // }

  // function getWeather() {
  //   axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_WEATHER_ACCESS_KEY}`)
  //     .then(response => {
  //       const apiResponse = response.data;
  //       //console.log(apiResponse)
  //       setInput('');
  //       setData({
  //         city: apiResponse.name,
  //         country: apiResponse.sys.country,
  //         temp: apiResponse.main.temp,
  //         tempmax: apiResponse.main.temp_max,
  //         tempmin: apiResponse.main.temp_min,
  //         icon: apiResponse.weather[0].icon,
  //         humidity: apiResponse.main.humidity,
  //         feelslike: apiResponse.main.feels_like,
  //         wind_speed: apiResponse.wind.speed
  //       });
  //       setCity({ city: '' });
  //     }).catch((e) => {
  //       setData({ city: 'Error Ocurred' });
  //     });
  // }

  return (
    <div className={classes.root}>
      <div className="formContainer">
        <form onSubmit={(e) => {
          e.preventDefault();
          }}>
          <TextField id="filled-basic" variant="filled" className="formInput" />
        </form>
        <Button variant="contained" className="formBttn" color="primary"> 
          Search
        </Button>
      </div>
    </div>
  )
}

export default ServerFormComponent
