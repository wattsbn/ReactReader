/** @jsx React.DOM **/
'use strict';
var React = require('react');
var Comic = require('./comic');

var ComicList = React.createClass({
    getInitialState: function() {
        return {results: []};
    },
    componentDidMount: function() {
        $.ajax({
            url: 'http://192.168.2.100:1337/search/grifter',
            dataType: 'json',
            success: function(data) {
                console.log(data.response.results.volume);
                this.setState({results: data.response.results.volume});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function() {
        console.log(this.props, this.state);
        var commentNodes = this.state.results.map(function (comic) {
            return (
                <Comic data={comic}></Comic>
            );
        });
        return (
            <div>
                <h1>Comments Zoom</h1>
            {commentNodes}
            </div>
        );
    }
});

module.exports = ComicList;