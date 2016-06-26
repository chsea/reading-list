'use strict';

import React from 'react';

export default class Work extends React.Component {
  render() {
    return (
      <div>
        <div>{this.props.date}</div>
        <div><a href={this.props.url}>{this.props.title}</a></div>
        <div>by {this.props.author}</div>
        <div dangerouslySetInnerHTML={{__html: this.props.summary}} />
      </div>
    );
  }
}
