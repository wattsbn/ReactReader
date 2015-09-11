import React from 'react';
import Spinner from './Spinner';

var spinnerStyle = {
    height: 50,
    width: 50
};

class SearchResults extends React.Component {
    render() {
        return (
            <div className="flex">
                <div className="flex-all" />
                <div style={spinnerStyle} className="flex-none">
                    <Spinner spinnerName='double-bounce' />
                </div>
                <div className="flex-none flex-column">
                    <div className="flex-all"/>
                    { this.props.text }
                    <div className="flex-all"/>
                </div>
                <div className="flex-all" />
            </div>
        );
    }
}

export default SearchResults;