/** @jsx React.DOM **/
'use strict';
var React = require('react');
var $ = require('jquery');

var ComicList = React.createClass({
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
        $.ajax({
            url: 'http://68.39.81.154:5000/webapi/FileStation/file_share.cgi?api=SYNO.FileStation.List&version=1&method=list&folder_path=%2FComics%2FThe%20New%2052',
            dataType: 'json',
            success: function(data) {
                console.log(data);
                //this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function() {
        return (
            <div>
                <h1>Comments</h1>
            </div>
        );
    }
});

module.exports = ComicList;