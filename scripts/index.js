import 'babel-core/polyfill';
import React from 'react';
import getRoutes from './routes';
import store from './state/store';
import { Provider } from 'react-redux';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

var history = createBrowserHistory();

React.render(
    <div>
        <Provider store={store}>
            { getRoutes.bind(null, history) }
        </Provider>
        <DebugPanel top right bottom>
            <DevTools store={store} monitor={LogMonitor} />
        </DebugPanel>
    </div>,
    document.body
);
