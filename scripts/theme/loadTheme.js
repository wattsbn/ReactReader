var themes = require('./themes');
var _ = require('underscore');

var loadTheme = function(url, callback) {
    // Adding the link tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.rel = 'styleSheet';
    link.href = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    link.onreadystatechange = callback;
    link.onload = callback;

    // Fire the loading
    head.appendChild(link);
};

var stored = localStorage['reader-theme'];
stored = _.findWhere(themes, {name: stored}) || _.findWhere(themes, {name: 'Darkly'});
loadTheme(stored.url);