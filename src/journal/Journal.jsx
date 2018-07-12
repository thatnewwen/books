import React, { Component } from 'react';

import Quill from 'quill';
import { getRoutePathEnd } from '../history.js';
import _ from 'lodash';
import { axios } from '../App';

import './Journal.css';

const saveChanges = _.debounce(quill => {
  const contents = quill.getContents();
  const bookId = getRoutePathEnd();

  axios
    .put('/user/entries', { bookId, contents })
    .then()
    .catch();
}, 1000);

class Journal extends Component {
  componentDidMount() {
    const quill = new Quill('#journal-editor', {
      theme: 'bubble',
    });
    const bookId = getRoutePathEnd();

    axios
      .get(`/user/entries/${bookId}`)
      .then(res => {
        const entry = res.data;

        if (entry) {
          quill.setContents(entry.contents);
        }

        quill.on('text-change', () => {
          saveChanges(quill);
        });
      })
      .catch();
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
