'use strict';
var React = require('react');

var SearchBox = React.createClass({
    handleClick: function() {
        this.props.search(this.refs.text.getDOMNode().value.trim());
    },
    handleKeyDown: function(event) {
        if (event.keyCode !== 13) { return; } // Enter
        return this.handleClick();
    },
    render: function() {
        return (
            <div className="form-group input-group">
                <input ref="text" className="form-control" type="text" onKeyDown={this.handleKeyDown}
                    placeholder="Enter comic name..." defaultValue={this.props.value||''} />
                <span className="input-group-btn">
                    <div className="btn btn-primary" onClick={this.handleClick}>Search</div>
                </span>
            </div>
        );
    }
});

module.exports = SearchBox;
