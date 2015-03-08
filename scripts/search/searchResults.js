'use strict';
var React = require('react');
var Comic = require('./../comic/comic');

var SearchResults = React.createClass({
    render: function() {
        var comics = this.props.results.map(function (comic) {
            return (
                <Comic data={comic}></Comic>
            );
        });
        return (
            <div>{comics}</div>
        );
    }
});

module.exports = SearchResults;