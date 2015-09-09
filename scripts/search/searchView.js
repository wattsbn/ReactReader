import { connect } from 'react-redux';
import { searchComics } from '../state/actions';

var $ = require('jquery');
var React = require('react');
var SearchBox = require('./searchBox');
var SearchResults = require('./searchResults');

class SearchView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {results: []};
    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(searchComics(this.context.router.getCurrentParams().term));
        //
        //var term = this.context.router.getCurrentParams().term;
        //if (!term) { return; }
        //$.ajax({
        //    url: 'http://localhost:1337/search/' + this.context.router.getCurrentParams().term,
        //    dataType: 'json',
        //    success: data => this.setState({results: data.response.results.volume})
        //});
    }
    handleSearch(searchTerm) {
        if (!searchTerm) { return; }
        this.context.router.transitionTo('/search/'+searchTerm);
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

SearchView.contextTypes = {
    router: React.PropTypes.func
};

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