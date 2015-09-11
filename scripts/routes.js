import 'babel-core/polyfill';
import App from './app';
import React from 'react';
import store from './state/store';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import HomeView from './views/HomeView';
import SearchView from './views/SearchView';
import MatchingView from './views/MatchingView';
import { Redirect, Router, Route } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'

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
