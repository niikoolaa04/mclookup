import { React } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import './formStyle.css';
import $ from 'jquery';

function ServerFormComponent({ data, setData, input, setInput, searchIP, setSearchIP, isLoading, setLoading }) {
  function getJavaServer(ip) {
    setLoading(true);
    axios.get(`https://api.mcsrvstat.us/2/${ip}`)
      .then(response => {
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
        setLoading(false);
        if(apiResponse.motd.html.length == 1) return;
        $(".secondLine").html(apiResponse.motd.html[1]);
      }).catch((e) => {
        $(".firstLine").html('');
        $(".secondLine").html('');
        setInput('');
        setData({ status: 'Error' });
        setLoading(false);
      });
  }

  const handleChange = (e) => {
    setSearchIP(e.target.value);
    setInput(e.target.value);
  }

  return (
    <div>
      <div className="motdElement"></div>
      <div className="serverFormContainer">
        <form onSubmit={(e) => {
          getJavaServer(searchIP);
          e.preventDefault();
          }}>
            <input type="text" className="serverInput" id="name" placeholder="Server Address" onChange={(e) => handleChange(e)} required="" />
        </form>
        <Button variant="contained" className="serverFormBttn" color="primary" onClick={() => {
          getJavaServer(searchIP)
        }}> 
          Search
        </Button>
      </div>
    </div>
  )
}

export default ServerFormComponent
