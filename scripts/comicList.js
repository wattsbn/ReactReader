/** @jsx React.DOM **/
'use strict';
var React = require('react');

var ComicList = React.createClass({
    getInitialState: function() {
        return {data: {}};
    },
    componentDidMount: function() {
        $.ajax({
            url: 'http://192.168.2.100:1337/search/grifter',
            dataType: 'json',
            success: function(data) {
                console.log(data);
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function() {
        return (
            <div>
                <h1>Comments Zoom</h1>
            </div>
        );
    }
});

module.exports = ComicList;