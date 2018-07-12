import React, { Component } from 'react';

import Quill from 'quill';
import { getRoutePathEnd } from '../history.js';

import './Journal.css';

class Journal extends Component {
  componentDidMount() {
    const quill = new Quill('#journal-editor', {
      theme: 'bubble',
    });

    quill.on('text-change', () => {
      const contents = quill.getContents();
      const bookId = getRoutePathEnd();

      console.log(bookId, contents);
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
