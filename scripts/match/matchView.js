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
    select: function(data) {
        console.log('Matching', data.location);
    },
    getUnMatched: function() {
        return this.state.results.map(function(info) {
            return (
                <DirectoryInfo key={info.location} data={info} select={this.select}/>
            );
        }.bind(this));
    },
    render: function() {
        return (
            <div className="container-fluid">
                {this.getUnMatched()}
            </div>
        );
    }
});

module.exports = MatchView;