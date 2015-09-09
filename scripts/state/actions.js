import fetch from 'isomorphic-fetch';


export const COMICS_SEARCH = 'COMICS_SEARCH';
function requestComics(searchTerm) {
    return { type: COMICS_SEARCH, searchTerm };
}

export const COMICS_SEARCH_SUCCESS = 'COMICS_SEARCH_SUCCESS';
function receiveResults(searchTerm, data) {
    return {
        type: COMICS_SEARCH_SUCCESS,
        searchTerm,
        results: data.response.results.volume,
        receivedAt: Date.now()
    };
}

export function searchComics(searchTerm) {
    return function (dispatch) {
        dispatch(requestComics(searchTerm));

        return fetch(`http://localhost:1337/search/${searchTerm}`)
            .then(response => response.json())
            .then(json => dispatch(receiveResults(searchTerm, json)));
    };
}