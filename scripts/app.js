/** @jsx React.DOM **/
'use strict';

require('./theme/flexbox.less');
require('./theme/variables.less');
require('./theme/main.less');
var React = require('react');
var NavBar = require('./navBar');
var {RouteHandler} = require('react-router');

var App = React.createClass({
    render() {
        return (
            <div>
                <NavBar />
                <RouteHandler />
            </div>
        );
    }
});

module.exports = App;