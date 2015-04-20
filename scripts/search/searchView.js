'use strict';
var $ = require('jquery');
var React = require('react');
var SearchBox = require('./searchBox');
var SearchResults = require('./searchResults');
var Router = require('react-router');

var SearchView = React.createClass({
    mixins: [Router.State, Router.Navigation],
    getInitialState: function() {
        return {
            results: []
        };
    },
    componentDidMount: function() {
        var term = this.getParams().term;
        if (!term) { return; }
        $.ajax({
            url: 'http://localhost:1337/search/' + this.getParams().term,
            dataType: 'json',
            success: function(data) {
                this.setState({results: data.response.results.volume});
            }.bind(this)
        });
    },
    handleSearch: function(searchTerm) {
        if (!searchTerm) { return; }
        this.transitionTo('/search/'+searchTerm);
    },
    render: function() {
        return (
            <div className="container">
                <SearchBox value={this.getParams().term} search={this.handleSearch} />
                <SearchResults results={this.state.results} />
            </div>
        );
    }
});

module.exports = SearchView;