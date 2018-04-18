import React, { Component } from 'react';

import Quill from 'quill';

import './Journal.css';

class Journal extends Component {
  componentDidMount() {
    new Quill('#journal-editor', {
      theme: 'bubble',
    });
  }

  render() {
    return (
      <div id="journal-editor" className="journal-editor">
        Tell us what you thought...
      </div>
    );
  }
}

export default Journal;
