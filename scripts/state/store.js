import topReducer from './reducers';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';

const loggerMiddleware = createLogger({
    transformer: (state) => state.toJS()
});

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
)(createStore);

const store = createStoreWithMiddleware(topReducer);
export default store;
