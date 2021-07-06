import { React, useState } from 'react';
import Button from '@material-ui/core/Button';
import './style.css'
import config from '../../config.json'
import FooterComponent from '../Footer/FooterComponent';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ServerFormComponent from './ServerFormComponent';
import NavbarComponent from '../Navigation/NavbarComponent';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, value) {
  return { name, value };
}

function ServerComponent() {
  const classes = useStyles();

  const [serverData, setServerData] = useState({
    status: '',
    hostname: '',
    ip: '',
    port: '',
    version: '',
    playerCount: '',
    maxPlayerCount: '',
    software: '',
    motd: ''
  });

  const [input, setInput] = useState('');
  const [searchIP, setSearchIP] = useState('');

  const rows = [
    createData('Status', serverData.status),
    createData('Hostname', serverData.hostname),
    createData('IP', serverData.ip),
    createData('Port', serverData.port),
    createData('Players Count', serverData.playerCount),
    createData('Version', serverData.version),
    createData('Software', serverData.software),
    createData('MoTD', serverData.motd),
  ];

  let emptySearch = '';
  if(searchIP == '') emptySearch = 'No IP Entered'
  else emptySearch = searchIP;

  return (
    <div>
      <NavbarComponent style={{ zIndex: '5000' }} />
      <div className="serverContainer">
        <div className="serverHero" id="hero">
          <h2 className="serverTitle">Minecraft Server Informations</h2>
          <div className="serverSubtitleDiv">
            <p className="serverSubtitle">Enter desired Server IP into Search Box</p>
          </div>
          <div className="kurac">
            <p className="dva"></p>
          </div>
          <ServerFormComponent 
            data={serverData} 
            setData={setServerData} 
            input={input} 
            setInput={setInput} 
            searchIP={searchIP}
            setSearchIP={setSearchIP}
          />
          { serverData.status == '' ? 
            <div className="serverBoxContainer">
              <div className="serverBox" style={{ width: '0px' }}>
                <div className="boxContent" style={{ height: '0px' }}>
                  
                </div>
              </div>
              <svg className="heroWave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#242a30" fill-opacity="1" d="M0,160L48,144C96,128,192,96,288,85.3C384,75,480,85,576,90.7C672,96,768,96,864,85.3C960,75,1056,53,1152,69.3C1248,85,1344,139,1392,165.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
            </div> :
            <div className="t">
              {
                serverData.status == 'Error' ?
                <div className="serverBoxContainer">
                  <div className="serverBox" style={{ width: '0px' }}>
                    <div className="boxContent" style={{ height: '0px' }}>
                    </div>
                  </div>
                  <div className="noServer">
                    <h4 className="noServerTitle">An Error Ocurred with your Request</h4>
                    <p>Server with provided IP Address is either Offline or doesn't exist.</p>
                    <p className="noServerIP"><strong>Entered IP Address:</strong> { emptySearch }</p>
                  </div>
                  <svg className="heroWave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#242a30" fill-opacity="1" d="M0,160L48,144C96,128,192,96,288,85.3C384,75,480,85,576,90.7C672,96,768,96,864,85.3C960,75,1056,53,1152,69.3C1248,85,1344,139,1392,165.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
                </div> :
                <div className="serverBoxContainer">
                  <div className="serverBox">
                    <div className="boxContent">
                      <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell><strong>Name</strong></TableCell>
                              <TableCell align="right"><strong>Value</strong></TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {rows.map((row) => (
                              <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                  {row.name}
                                </TableCell>
                                <TableCell align="right">{row.value}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                  </div>
                  <svg className="serverWave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#242a30" fill-opacity="1" d="M0,160L48,144C96,128,192,96,288,85.3C384,75,480,85,576,90.7C672,96,768,96,864,85.3C960,75,1056,53,1152,69.3C1248,85,1344,139,1392,165.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
                </div>
              }
            </div>
          }
          <div className="justempty">
            Test
          </div>
        </div>
      </div>
      <svg className="svgServer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#222831" fill-opacity="1" d="M0,288L120,277.3C240,267,480,245,720,240C960,235,1200,245,1320,250.7L1440,256L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path></svg>
      <FooterComponent />
    </div>
  )
}

export default ServerComponent
