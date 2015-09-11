import React from 'react';
import './spinner.less';

const barStyles = [];
for (var i = 0; i < 12; i++) {
    let style = {};
    style.WebkitAnimationDelay = style.animationDelay =
        (i - 12) / 10 + 's';

    style.WebkitTransform = style.transform =
        'rotate(' + (i * 30) + 'deg) translate(146%)';

    barStyles.push(style);
}

class Spinner extends React.Component {
    render() {
        var bars = barStyles.map(function(style, index) {
            return (
                <div style={style} className="react-spinner_bar" key={index}/>
            );
        });

        return (
            <div className="react-spinner">{bars}</div>
        );
    }
}

export default Spinner;