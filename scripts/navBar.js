var React = require('react');
var {Link} = require('react-router');

class NavBar extends React.Component {
    render() {
        return (
            <div className="navbar navbar-default navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <Link className="navbar-brand" to="/">ReactReader</Link>
                        <button className="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target="#navbar-main" aria-expanded="false">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                    </div>
                    <div className="navbar-collapse collapse" id="navbar-main">
                        <ul className="nav navbar-nav">
                            <li><Link to="/search">Search</Link></li>
                            <li><Link to="/unmatched">Match</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = NavBar;