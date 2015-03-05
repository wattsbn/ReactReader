/** @jsx React.DOM **/
'use strict';
var React = require('react');
var ComicList = require('./comicList');

var App = React.createClass({
  render() {
    return (
        <div>
            <h1>Hello boom world.</h1>
            <ComicList />
        </div>
    );
  }
});

module.exports = App;