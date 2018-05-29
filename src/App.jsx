import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import Navbar from './navbar/Navbar';
import Landing from './landing/Landing';
import Login from './login/Login';
import Profile from './profile/Profile';
import Journal from './journal/Journal';

const LoginContext = React.createContext('loggedIn');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false, login: this.login, logout: this.logout };
  }

  login() {
    if (localStorage && localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
    }

    this.setState({ loggedIn: true });
  }

  logout() {
    if (localStorage) {
      localStorage.removeItem('jwt');
      axios.defaults.headers.common['Authorization'] = null;
    }

    this.setState({ loggedIn: false });
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar />

          <LoginContext.Provider value={this.state}>
            <div className="page-container">
              <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/profile" component={Profile} />
                <Route path="/journal" component={Journal} />

                <Route component={NotFound} />
              </Switch>
            </div>
          </LoginContext.Provider>
        </div>
      </Router>
    );
  }
}

const NotFound = () => (
  <h1>Whoops! We can't find the page you're looking for.</h1>
);

export { App, LoginContext };
