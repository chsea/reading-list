'use strict';

import React from 'react';
import $ from 'jquery';

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
        {this.state.title}
      </div>
    )
  }
}

export default App;
