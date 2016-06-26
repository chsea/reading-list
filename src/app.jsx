'use strict';

import React from 'react';
import Works from './components/works.jsx';
const $ = require('jquery');

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      works: [],
      name: "hi"
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({name: "bye"});
    $.get('/api')
      .done(data => this.setState({works: data.works}));
  }
  render() {
    return (
      <div>
        <a href="#" onClick={this.handleClick}>robert/aaron</a>
        <Works works={this.state.works} name={this.state.name} />
      </div>
    )
  }
}
