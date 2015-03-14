/** @jsx React.DOM **/
'use strict';

require('./theme/flexbox.less');
require('./theme/variables.less');
require('./theme/main.less');
var React = require('react');
var NavBar = require('./navBar');
var {RouteHandler, State} = require('react-router');

var App = React.createClass({
    mixins: [State],
    getHandlerKey: function () {
        var childDepth = 1; // assuming App is top-level route
        var key = this.getRoutes()[childDepth].name;
        key += this.getParams().term || '';
        return key;
    },
    render() {
        return (
            <div>
                <NavBar />
                <RouteHandler key={this.getHandlerKey()} />
            </div>
        );
    }
});

module.exports = App;