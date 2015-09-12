import { connect } from 'react-redux';
import SearchBox from '../search/searchBox';
import { searchComics } from '../state/actions';
import SearchResults from '../search/searchResults';
import React, { findDOMNode, PropTypes } from 'react';
import SpinnerBanner from '../components/spinner/SpinnerBanner';

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
        var bottom = isSearching ?
            ( <SpinnerBanner text={"Searching..."} /> ):
            ( <SearchResults results={searchResults} /> );
        return (
            <div className="container">
                <SearchBox value={searchTerm} search={this.handleSearch.bind(this)} />
                { bottom }
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

export default connect(select)(SearchView);