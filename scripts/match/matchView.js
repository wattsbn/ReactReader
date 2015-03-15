'use strict';
var React = require('react');
var DirectoryInfo = require('./directoryInfo');


var MatchView = React.createClass({
    getInitialState: function() {
        return {
            results: []
        };
    },
    componentDidMount: function() {
        $.ajax({
            url: 'http://localhost:1337/files/unmatched',
            dataType: 'json',
            success: function(data) {
                this.setState({results: data});
            }.bind(this)
        });
    },
    getUnMatched: function() {
        return this.state.results.map(function(info) {
            return (
                <DirectoryInfo key={info.location} data={info} />
            );
        });
    },
    render: function() {
        return (
            <div className="container">
            {this.getUnMatched()}
            </div>
        );
    }
});

module.exports = MatchView;