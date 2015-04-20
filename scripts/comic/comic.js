/** @jsx React.DOM **/
'use strict';
var $ = require('jquery');
var React = require('react');
require('./comic.less');

var Comic = React.createClass({
    getInitialState: function() {
        return {active: false};
    },
    onSelect: function() {
        this.setState({active: !this.state.active});
    },
    getDescription: function() {
        var d = this.props.data.description;
        //var index = d.indexOf('</p>');
        //d = d > 0 ? d = d.substring(0, index + 4) : d;
        d = d.replace(new RegExp('href="', 'g'), 'target=="_blank" href="http://www.comicvine.com');
        // Fix any malformed html that we got from ComicVine
        return {__html: $('<div/>').append(d).html()};
    },
    render: function() {
        var active = this.state.active ? 'active' : '';
        return (
            <div className={'comic-container ' + active}>
                <div className="comic">
                    <div className="flex">
                        <div className="flex-none">
                            <a href={this.props.data.site_detail_url} target="_blank">
                                <img src={this.props.data.image.small_url} alt={this.props.data.name}/>
                            </a>
                        </div>
                        <div className="comicDetails container-fluid flex-column flex-all">
                            <h3 className="flex-none">{this.props.data.name} ({this.props.data.start_year})</h3>
                            <div className="description row flex-all" onWheel={this.onWheel}>
                                <div dangerouslySetInnerHTML={this.getDescription()}/>
                            </div>
                        </div>
                        <div className="check-box flex-none flex-column no-select" onClick={this.onSelect}>
                            <span className="flex-all" />
                            <span className="flex-none glyphicon glyphicon-ok" aria-hidden="true"></span>
                            <span className="flex-all" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Comic;