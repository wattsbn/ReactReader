import Immutable from 'immutable';
import { combineReducers } from 'redux';
import { COMICS_SEARCH, COMICS_SEARCH_SUCCESS } from './actions';

const initialState = Immutable.Map({
    isSearching: false,
    searchTerm: '',
    searchResults: null
});

function comicReducer(state = initialState, action = {}) {
    switch (action.type) {
        case COMICS_SEARCH:
            return state.merge({
                isSearching: true,
                searchTerm: action.searchTerm,
                searchResults: null
            });
        case COMICS_SEARCH_SUCCESS:
            if (action.searchTerm !== state.get('searchTerm')) {
                return state;
            }

            return state.merge({
                isSearching: false,
                searchResults: Immutable.fromJS(action.results)
            });
        default:
            return state;
    }
}

const topReducer = combineReducers({
    comicReducer
});

export default comicReducer;