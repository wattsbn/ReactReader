require('./directoryInfo.less');
var React = require('react');

class DirectoryInfo extends React.Component {
    clickHandler() {
        this.props.select(this.props.data);
    }
    render() {
        return (
            <div className="directory-info col-xs-12 col-sm-6 col-md-4 col-lg-3">
                <div className="content flex">
                    <div className="main-content flex-all" title={this.props.data.location}>
                        <span className="fa fa-folder-o"></span>
                        <span className="name text-ellipsis">{this.props.data.name}</span>
                        <div className="text-ellipsis">{this.props.data.location}</div>
                    </div>
                    <div className="action-box flex-none flex-column no-select" onClick={this.clickHandler.bind(this)}
                        title="Find the matching comic volume for this directory.">
                        <div className="flex-all" />
                        <div className="flex-none">
                            <span className="glyphicon glyphicon-chevron-right"></span>
                        </div>
                        <div className="flex-all" />
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = DirectoryInfo;