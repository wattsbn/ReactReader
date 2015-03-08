/** @jsx React.DOM **/
'use strict';
var React = require('react');
var SearchView = require('./search/searchView');

var App = React.createClass({
  render() {
    return (
        <div>
            <SearchView />
        </div>
    );
  }
});

module.exports = App;