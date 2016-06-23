'use strict';

import React from 'react';
const $ = require('jquery');

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      title: ''
    };
  }
  componentDidMount() {
    $.get('/api')
      .done(data => this.setState({title: data.works[0].title}))
  }
  render() {
    return (
      <div>
      </div>
    )
  }
}

export default App;
