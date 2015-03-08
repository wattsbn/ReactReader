'use strict';
var React = require('react');

var SearchBox = React.createClass({
    handleClick: function() {
        this.props.search(this.refs.text.getDOMNode().value.trim());
    },
    render: function() {
        return (
            <form className="searchBox input-group">
                    <input className="form-control" type="text" placeholder="Enter comic name..." ref="text" />
                <span className="input-group-btn">
                    <div className="btn btn-primary" onClick={this.handleClick}>Search</div>
                </span>
            </form>
        );
    }
});

module.exports = SearchBox;