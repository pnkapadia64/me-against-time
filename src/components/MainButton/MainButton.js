import React from 'react';
import './mainButton.scss';

const MainButton = props => {
    const onKeyDown = (e) => {
        // Space or Enter key
        if (e.keyCode === 32 || e.keyCode === 13) {
            props.onClick();
        }
    }

    React.useEffect(() => {
        window.addEventListener('keydown', onKeyDown);
    }, () => {
        window.removeEventListener('keydown', onKeyDown);
    });

    return (
        <div className="main-btn" onClick={props.onClick}>
            <div className="dots-container">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            </div>
            <span>{props.label}</span>
        </div>
    );
};

export default MainButton;
