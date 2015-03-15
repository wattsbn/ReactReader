/** @jsx React.DOM **/
'use strict';
require('./directoryInfo.less');
var React = require('react');


var DirectoryInfo = React.createClass({
    clickHandler: function() {
        this.props.select(this.props.data);
    },
    render: function() {
        return (
            <div className="directory-info col-xs-12 col-sm-6 col-md-4 col-lg-3">
                <div className="content flex">
                    <div className="main-content flex-all" title={this.props.data.location}>
                        <div className="text-ellipsis">{this.props.data.name}</div>
                        <div className="text-ellipsis">{this.props.data.location}</div>
                    </div>
                    <div className="action-box flex-none flex-column no-select" onClick={this.clickHandler}
                        title="Find the matching comic volume for this directory.">
                        <div className="flex-all" />
                        <div className="flex-none">
                            <span className="glyphicon glyphicon-chevron-right"></span>
                        </div>
                        <div className="flex-all" />
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = DirectoryInfo;