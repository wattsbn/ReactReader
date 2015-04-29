'use strict';
var $ = require('jquery');
var React = require('react');
var DirectoryInfo = require('./directoryInfo');

class MatchView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {results: []};
    }
    componentDidMount() {
        $.ajax({
            url: 'http://localhost:1337/files/unmatched',
            dataType: 'json',
            success: function(data) {
                this.setState({results: data});
            }.bind(this)
        });
    }
    selectMatch(data) {
        console.log('Matching', data.location);
        this.context.router.transitionTo('/matching/' + data.name);
    }
    getUnMatched() {
        return this.state.results.map(function(info) {
            return (
                <DirectoryInfo key={info.location} data={info} select={this.selectMatch.bind(this)}/>
            );
        }.bind(this));
    }
    render() {
        return (
            <div className="container-fluid">
                {this.getUnMatched()}
            </div>
        );
    }
}

MatchView.contextTypes = {
    router: React.PropTypes.func
};

module.exports = MatchView;