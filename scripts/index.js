import 'babel-core/polyfill';
import React from 'react';
import getRoutes from './routes';
import store from './state/store';
import { Provider } from 'react-redux';
import createBrowserHistory from 'history/lib/createBrowserHistory'

var history = createBrowserHistory();

React.render(
    <Provider store={store}>
        { getRoutes.bind(null, history) }
    </Provider>,
    document.body
);
