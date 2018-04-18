import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './navbar/Navbar';
import Landing from './landing/Landing';
import Login from './login/Login';
import Profile from './profile/Profile';
import Journal from './journal/Journal';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />

          <div className="page-container">
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/journal" component={Journal} />

              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

const NotFound = () => (
  <h1>Whoops! We can't find the page you're looking for.</h1>
);

export default App;
