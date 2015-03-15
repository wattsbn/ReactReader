/** @jsx React.DOM **/
'use strict';
require('./directoryInfo.less');
var React = require('react');


var DirectoryInfo = React.createClass({
    render: function() {
        return (
            <div className="directory-info flex">
                <div className="main-content flex-all">
                    <div className="text-ellipsis">{this.props.data.name}</div>
                    <div className="text-ellipsis">{this.props.data.location}</div>
                </div>
                <div className="action-box flex-none flex-column no-select">
                    <div className="flex-all" />
                    <div className="flex-none">
                        <span>Find Match</span>
                        <span className="glyphicon glyphicon-chevron-right"></span>
                    </div>
                    <div className="flex-all" />
                </div>
            </div>
        );
    }
});

module.exports = DirectoryInfo;