/** @jsx React.DOM **/
'use strict';
var React = require('react');

var Comic = React.createClass({
    render: function() {
        return (
            <div>
                <img src={this.props.data.image.small_url}/>
                <span>{this.props.data.name}</span>
            </div>
        );
    }
});

module.exports = Comic;