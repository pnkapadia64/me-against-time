import React from 'react';
import './mainButton.scss';

const MainButton = props => (
    // <div className="start-container__button" onClick={props.onClick}>{props.label}</div>
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

export default MainButton;
