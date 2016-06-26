'use strict';

import React from 'react';

import Work from './work.jsx';

export default class Works extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let showTitle = () => this.props.works.length ? <h2>Works</h2> : '';
    return (
      <section>
        {showTitle()}
        {this.props.works.map((work, i) => <Work key={i} {...work}/>)}
      </section>
    )
  }
}
