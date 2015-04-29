'use strict';
var React = require('react');
var Router = require('react-router');
var App = require('./app');
var HomeView = require('./home');
var SearchView = require('./search/searchView');
var MatchView = require('./match/matchView');
var MatchingView = require('./matching/matchingView');

var {Route, DefaultRoute} = Router;

var routes = (
    <Route name="home" path="/" handler={App}>
        <DefaultRoute handler={HomeView}/>
        <Route name="search" path="search/?:term?" handler={SearchView} />
        <Route name="unmatched" handler={MatchView}/>
        <Route name="matching" path="matching/:term" handler={MatchingView}/>
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.body);
});