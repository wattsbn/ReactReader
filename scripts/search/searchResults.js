var React = require('react');
var Comic = require('./../comic/comic');

class SearchResults extends React.Component {
    render() {
        var comics = this.props.results.map(function (comic) {
            return (
                <Comic key={comic.id} data={comic}></Comic>
            );
        });
        return (
            <div className="form-group">{comics}</div>
        );
    }
}

module.exports = SearchResults;