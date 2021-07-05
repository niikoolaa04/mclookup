import NavbarComponent from './components/Navigation/NavbarComponent';
import HomeComponent from './components/Home/HomeComponent';
import ServerComponent from './components/Server/ServerComponent';
import UserComponent from './components/User/UserComponent';
import FooterComponent from './components/Footer/FooterComponent';
import { BrowserRouter as Router, Switch, Route  } from 'react-router-dom';
import './App.css';

function App() {

  return (
    <div className="App">
      <NavbarComponent style={{ zIndex: '5000' }}/>
      <Router>
        <Switch>
          <Route exact path="/">
            <HomeComponent />
          </Route>
          <Route path="/server">
            <ServerComponent />
          </Route>
          <Route path="/user">
            <UserComponent />
          </Route>
        </Switch>
      </Router>
      {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#111418" fill-opacity="1" d="M0,288L120,277.3C240,267,480,245,720,240C960,235,1200,245,1320,250.7L1440,256L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path></svg>
      <FooterComponent /> */}
      {/* <FooterComponent /> */}
    </div>
  );
}

export default App;
