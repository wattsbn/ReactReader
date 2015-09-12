import App from './app';
import React from 'react';
import HomeView from './views/HomeView';
import SearchView from './views/SearchView';
import { Router, Route } from 'react-router';
import MatchingView from './views/MatchingView';

function getRoutes(history) {
    return (
        <Router history={history}>
            <Route component={App}>
                <Route path="/" component={HomeView} />
                <Route path="/search" component={SearchView} />
                <Route path="/search/:term" component={SearchView} />
                <Route path="/matching/:term" component={MatchingView} />
            </Route>
        </Router>
    );
}

export default getRoutes;