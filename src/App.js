import NavbarComponent from './components/Navigation/NavbarComponent';
import HomeComponent from './components/Home/HomeComponent';
import ServerComponent from './components/Server/ServerComponent';
import UserComponent from './components/User/UserComponent';
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
    </div>
  );
}

export default App;
