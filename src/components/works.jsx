'use strict';

import React from 'react';

import Work from './work.jsx';

class Works extends React.component {
  constructor() {
    super();
    this.state {
      works: []
    }
  }
  render() {
    {this.state.works.map(work => <Work />)}
  }
}

export default Works;
