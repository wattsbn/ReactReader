import 'babel-core/polyfill';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import store from './state/store';
import { Redirect, Router, Route } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'

var React = require('react');
var App = require('./app');
var HomeView = require('./home');
var SearchView = require('./search/searchView');
var MatchView = require('./match/matchView');
var MatchingView = require('./matching/matchingView');


function getRoutes() {
    return (
        <Router history={createBrowserHistory()}>
            <Route component={App}>
                <Route path="/" component={HomeView} />
                <Route path="/search" component={SearchView} />
                <Route path="/search/:term" component={SearchView} />
                <Route path="/matching/:term" component={MatchingView} />
            </Route>
        </Router>
    );
}


React.render(
    <Provider store={store}>
        {getRoutes.bind(null)}
    </Provider>,
    document.body
);
