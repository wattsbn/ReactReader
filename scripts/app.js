/** @jsx React.DOM **/
'use strict';

require('./theme/flexbox.less');
require('./theme/variables.less');
require('./theme/main.less');
var React = require('react');
var NavBar = require('./navBar');
var {RouteHandler} = require('react-router');

class App extends React.Component {
    getHandlerKey() {
        var childDepth = 1; // assuming App is top-level route
        var key = this.context.router.getCurrentRoutes()[childDepth].name;
        key += this.context.router.getCurrentParams().term || '';
        return key;
    }
    render() {
        return (
            <div>
                <NavBar />
                <RouteHandler key={this.getHandlerKey()} />
            </div>
        );
    }
}

App.contextTypes = {
    router: React.PropTypes.func
};

module.exports = App;