var React = require('react');
var Router = require('react-router');
var App = require('./app');
var HomeView = require('./home');
var SearchView = require('./search/searchView');
var MatchView = require('./matchView');

var {Route, DefaultRoute} = Router;

var routes = (
    <Route name="home" path="/" handler={App}>
        <DefaultRoute handler={HomeView}/>
        <Route name="search" handler={SearchView}/>
        <Route name="match" handler={MatchView}/>
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.body);
});