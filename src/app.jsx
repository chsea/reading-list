'use strict';

import React from 'react';
import Works from './components/works.jsx';
require('./less/main.less');
const $ = require('jquery'),
      _ = require('lodash');

const windowHeight = $(window).height();
let documentHeight = 0;

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      works: [],
      page: 1,
      loading: false
    };
    this.setDocumentHeight = this.setDocumentHeight.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }
  setDocumentHeight() {
    documentHeight = $(document).height();
  }
  handleClick() {
    this.getWorks()
      .done(data => this.setState({works: data.works, loading: false}));
  }
  handleScroll(e) {
    let $document = $(document);
    if (documentHeight - windowHeight - $document.scrollTop() <= 300 && !this.state.loading) {
      this.setState({page: this.state.page + 1});
      this.getWorks()
        .done(data => this.setState({works: _.concat(this.state.works, data.works), loading: false}));
    }
  }
  getWorks() {
    this.setState({loading: true});
    let options = {page: this.state.page};
    return $.get('/api', {data: options});
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
        <Works works={this.state.works} handleScroll={this.handleScroll} setDocumentHeight={this.setDocumentHeight}/>
      </section>
    )
  }
}
