'use strict';
var React = require('react');
var ThemeItem = require('./theme/themeItem');
var config = require('./config');
var themes = require('./theme/themes');
var {Link} = require('react-router');

var NavBar = React.createClass({
    getThemes: function(){
        return themes.map(function (theme) {
            return (
                <ThemeItem key={theme.name} theme={theme}/>
            );
        }.bind(this));
    },
    render: function() {
        return (
            <div className="navbar navbar-default navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <Link className="navbar-brand" to="home">{config.appName}</Link>
                        <button className="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target="#navbar-main" aria-expanded="false">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                    </div>
                    <div className="navbar-collapse collapse" id="navbar-main">
                        <ul className="nav navbar-nav">
                            <li className="dropdown">
                                <a className="dropdown-toggle" data-toggle="dropdown" href="#" id="themes">Themes <span className="caret"></span></a>
                                <ul className="dropdown-menu" aria-labelledby="themes">
                                {this.getThemes()}
                                </ul>
                            </li>
                            <li><Link to="search">Search</Link></li>
                            <li><Link to="match">Match</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = NavBar;