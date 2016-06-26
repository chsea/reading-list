'use strict';

import React from 'react';

import Work from './work.jsx';

export default class Works extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 2
    };
  }
  componentDidMount() {
    let handleScroll = this.props.handleScroll;
    window.addEventListener('scroll', handleScroll);
  }
  componentDidUpdate(prevProps) {
    if (this.props.works.length) this.props.setDocumentHeight();
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
