/** @jsx React.DOM **/
'use strict';
var React = require('react');

var DirectoryInfo = React.createClass({
    render: function() {
        return (
            <div>
               <div>{this.props.data.name}</div>
                <div>{this.props.data.location}</div>
            </div>
        );
    }
});

module.exports = DirectoryInfo;