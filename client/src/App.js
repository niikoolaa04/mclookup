import { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route  } from 'react-router-dom';
import { newsArray } from './assets/news';
import HomeComponent from './components/Home/HomeComponent';
import ServerComponent from './components/Server/ServerComponent';
import UserComponent from './components/User/UserComponent';
import NewsComponent from './components/News/NewsComponent';
import ErrorComponent from './components/Other/ErrorComponent';
import ProfileComponent from './components/Profile/ProfileComponent';
import UsersComponent from './components/Users/UsersComponent';
import './App.css';

function App() {

  return (
    <div className="App">
      {
        newsArray.length > 0 ?
        <div className="newsDiv">
          <NewsComponent />
        </div> :
        ''
      }
      <Router>
        <Switch>
          <Route exact path="/">
            <HomeComponent/>
          </Route>
          <Route exact path="/server">
            <ServerComponent />
          </Route>
          <Route exact path="/user">
            <UserComponent />
          </Route>
          <Route exact path="/profile/:id">
            <ProfileComponent />
          </Route>
          <Route exact path="/users">
            <UsersComponent />
          </Route>
          <Route>
            <ErrorComponent 
              errorCode="404" 
              errorType="Page Not Found" 
              errorText="Page you tried to access couldn't be found or have been moved to other location."
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
