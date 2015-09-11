var React = require('react');
var Comic = require('../comic/comic');
var SpinnerBanner = require('../components/spinner/SpinnerBanner');

class SearchResults extends React.Component {
    render() {
        if (!this.props.results.length) {
            return (
                <SpinnerBanner text={"Searching..."} />
            );
        }
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