import React, { findDOMNode } from 'react';

class SearchBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        };
    }
    componentWillReceiveProps (nextProps) {
        if (this.props.value === nextProps.value) { return; }
        this.setState({value: nextProps.value});
    }
    getInputValue () {
        return findDOMNode(this.refs.text).value
    }
    handleClick() {
        this.props.search(this.getInputValue().trim());
    }
    handleKeyUp(event) {
        if (event.keyCode !== 13) { return; } // Enter
        return this.handleClick();
    }
    handleOnChange() {
        this.setState({value: this.getInputValue()});
    }
    render() {
        return (
            <div className="form-group input-group">
                <input autoFocus ref="text" className="form-control" type="text"
                       value={this.state.value}
                       onKeyUp={this.handleKeyUp.bind(this)}
                       onChange={this.handleOnChange.bind(this)}
                       placeholder="Enter comic name..." />
                <span className="input-group-btn">
                    <div className="btn btn-primary"
                         onClick={this.handleClick.bind(this)}>
                        Search
                    </div>
                </span>
            </div>
        );
    }
}

module.exports = SearchBox;
