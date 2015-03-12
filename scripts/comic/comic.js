/** @jsx React.DOM **/
'use strict';
var React = require('react');
require('./comic.less');

var Comic = React.createClass({
    getDescription: function() {
        var d = this.props.data.description;
        var index = d.indexOf('</p>');
        if (index) {
            d = d.substring(0, d.indexOf('</p>') + 4);
        }
        d = d.replace('href="', 'href="http://www.comicvine.com');
        return {__html: d}
    },
    render: function() {
        return (
            <div className="comic">
                <a href={this.props.data.site_detail_url} target="_blank">
                    <img src={this.props.data.image.small_url} alt={this.props.data.name}/>
                </a>
                <div className="comicDetails container-fluid">
                    <h3>{this.props.data.name} ({this.props.data.start_year})</h3>
                    <div className="description row">
                        <div dangerouslySetInnerHTML={this.getDescription()}/>
                    </div>
                    <div className="btn-group row pull-right">
                        <button className="btn btn-default">Add to Collection</button>
                        <button className="btn btn-default">Map to Directory</button>
                    </div>
                </div>

            </div>
        );
    }
});

module.exports = Comic;