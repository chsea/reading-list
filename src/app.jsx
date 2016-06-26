'use strict';

import React from 'react';
import Works from './components/works.jsx';
require('./less/main.less');
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
      <section className="content">
        <header className="title">
          <h1>Reading List</h1>
        </header>
        <nav>
          <h2>Filters</h2>
          <a href="#" onClick={this.handleClick}>robert/aaron</a>
        </nav>
        <Works works={this.state.works} name={this.state.name} />
      </section>
    )
  }
}
