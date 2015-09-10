import { connect } from 'react-redux';
import { searchComics } from '../state/actions';
import React, { findDOMNode, PropTypes } from 'react'

var $ = require('jquery');
var SearchBox = require('./searchBox');
var SearchResults = require('./searchResults');

class SearchView extends React.Component {
    static propTypes = {
        params: PropTypes.shape({
            tem: PropTypes.string
        })
    };

    static contextTypes = {
        history: PropTypes.object.isRequired
    };

    componentWillMount() {
        if (!this.props.params.term) { return; }
        const { dispatch } = this.props;
        dispatch(searchComics(this.props.params.term));
    }
    componentDidUpdate (prevProps) {
        if (this.props.params.term === prevProps.params.term) { return; }
        const { dispatch } = this.props;
        dispatch(searchComics(this.props.params.term));
    }
    handleSearch(searchTerm) {
        if (!searchTerm) { return; }
        this.context.history.pushState({}, `/search/${searchTerm}`);
    }
    render() {
        const { isSearching, searchTerm, searchResults } = this.props;
        return (
            <div className="container">
                <SearchBox value={searchTerm} search={this.handleSearch.bind(this)} />
                <div> {isSearching ? 'true' : 'false'} </div>
                <SearchResults results={searchResults} />
            </div>
        );
    }
}

function selectResults(results) {
    return results ? results.toJS() : [];
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
    return {
        isSearching: state.get('isSearching'),
        searchTerm: state.get('searchTerm'),
        searchResults: selectResults(state.get('searchResults'))
    };
}

module.exports = connect(select)(SearchView);