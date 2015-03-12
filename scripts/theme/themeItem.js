/** @jsx React.DOM **/
'use strict';
var React = require('react');

var Theme = React.createClass({
    shouldComponentUpdate: function(nextProps) {
        return this.props.theme.name !== nextProps.theme.name;
    },
    handleClick: function() {
        localStorage['reader-theme'] = encodeURIComponent(this.props.theme.name);
        location.reload();
    },
    render: function() {
        return (
            <li onClick={this.handleClick}><a >{this.props.theme.name}</a></li>
        );
    }
});

module.exports = Theme;