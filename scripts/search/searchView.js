'use strict';
var React = require('react');
var SearchBox = require('./searchBox');
var SearchResults = require('./searchResults');


var SearchView = React.createClass({
    getInitialState: function() {
        return {
            results: []
        };
    },
    handleSearch: function(searchTerm) {
        $.ajax({
            url: 'http://localhost:1337/search/' + searchTerm,
            dataType: 'json',
            success: function(data) {
                console.log('changing state', data.response.results.volume.length);
                this.setState({results: data.response.results.volume});
            }.bind(this)
        });
    },
    render: function() {
        return (
            <div className="container">
                <SearchBox search={this.handleSearch} />
                <SearchResults results={this.state.results} />
            </div>
        );
    }
});

module.exports = SearchView;