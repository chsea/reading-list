'use strict';

import React from 'react';

import Work from './work.jsx';

export default class Works extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        {this.props.works.map((work, i) => <Work key={i} {...work}/>)}
      </div>
    )
  }
}
