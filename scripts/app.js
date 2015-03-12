/** @jsx React.DOM **/
'use strict';

require('./theme/loadTheme');
var React = require('react');
var NavBar = require('./navBar');
var SearchView = require('./search/searchView');

var App = React.createClass({
  render() {
    return (
        <div>
            <NavBar />
            <SearchView />
        </div>
    );
  }
});

module.exports = App;