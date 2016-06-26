'use strict';

import React from 'react';
require('../less/work.less');

export default class Work extends React.Component {
  render() {
    let parseRating = (rating) => {
      rating = rating.toLowerCase();
      switch(rating) {
        case "not rated":
          return "nr";
        case "general audiences":
          return "g";
        case "teen and up audiences":
          return "t";
        case "mature":
          return "r";
        case "explicit":
          return "x";
      }
    };

    return (
      <article className={this.props.new ? 'work new' : 'work '}>
        <header>
          <h3><a href={'http://archiveofourown.org/' + this.props.url} target="_blank">{this.props.title}</a> [{this.props.chapters}]</h3>
          <div className="author">by <a href={this.props.authorUrl}>{this.props.author}</a></div>
          <div className="info">{parseRating(this.props.rating)}, {this.props.words} words, {this.props.date}</div>
        </header>
        <div className="summary" dangerouslySetInnerHTML={{__html: this.props.summary}} />
      </article>
    );
  }
}
