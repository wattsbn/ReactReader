var React = require('react');

class SearchBox extends React.Component {
    componentDidMount() {
        this.refs.text.getDOMNode().value = this.props.value||'';
    }
    handleClick() {
        this.props.search(this.refs.text.getDOMNode().value.trim());
    }
    handleKeyDown(event) {
        if (event.keyCode !== 13) { return; } // Enter
        return this.handleClick();
    }
    render() {
        return (
            <div className="form-group input-group">
                <input autoFocus ref="text" className="form-control" type="text" onKeyDown={this.handleKeyDown.bind(this)}
                    placeholder="Enter comic name..." />
                <span className="input-group-btn">
                    <div className="btn btn-primary" onClick={this.handleClick.bind(this)}>Search</div>
                </span>
            </div>
        );
    }
}

module.exports = SearchBox;
