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
        var term = this.context.router.getCurrentParams().term;
        if (!term) { return; }
        $.ajax({
            url: 'http://localhost:1337/search/' + this.context.router.getCurrentParams().term,
            dataType: 'json',
            success: data => this.setState({results: data.response.results.volume})
        });
    }
    handleSearch(searchTerm) {
        if (!searchTerm) { return; }
        this.context.router.transitionTo('/search/'+searchTerm);
    }
    render() {
        return (
            <div className="container">
                <SearchBox value={this.context.router.getCurrentParams().term} search={this.handleSearch.bind(this)} />
                <SearchResults results={this.state.results} />
            </div>
        );
    }
}

SearchView.contextTypes = {
    router: React.PropTypes.func
};

module.exports = SearchView;