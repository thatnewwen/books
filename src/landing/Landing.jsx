import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Landing.css';

class Landing extends Component {
  render() {
    return (
      <div className="landing-header">
        <div>
          What are you <b>reading</b>?
        </div>
        <div>
          Let's
          <Link to="/login" className="link">
            start a diary
          </Link>
          and show your friends.
        </div>
      </div>
    );
  }
}

export default Landing;
