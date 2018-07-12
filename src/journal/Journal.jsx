import React, { Component } from 'react';

import Quill from 'quill';
import { getRoutePathEnd } from '../history.js';
import _ from 'lodash';

import './Journal.css';

const saveChanges = _.debounce(quill => {
  const contents = quill.getContents();
  const bookId = getRoutePathEnd();

  console.log(bookId, contents);
}, 1000);

class Journal extends Component {
  componentDidMount() {
    const quill = new Quill('#journal-editor', {
      theme: 'bubble',
    });

    quill.on('text-change', () => {
      saveChanges(quill);
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
