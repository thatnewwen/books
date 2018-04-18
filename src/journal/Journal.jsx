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
        <p>Hello World!</p>
        <p>
          Some initial <strong>bold</strong> text
        </p>
      </div>
    );
  }
}

export default Journal;
