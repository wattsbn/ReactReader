require('./theme/flexbox.less');
require('./theme/variables.less');
require('./theme/main.less');
var React = require('react');
var NavBar = require('./navBar');
var {RouteHandler} = require('react-router');

class App extends React.Component {
    render() {
        return (
            <div>
                <NavBar />
                <div>{this.props.children}</div>
            </div>
        );
    }
}

App.contextTypes = {
    router: React.PropTypes.func
};

module.exports = App;