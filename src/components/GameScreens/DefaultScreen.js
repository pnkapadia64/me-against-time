import React, { PropTypes } from 'react';
import './defaultScreen.scss';

const DefaultScreen = ({ userHighScore = 0, highestScore = 0, onStartGame }) => {
  const highScoreHtml = (
    <div className="start-container__high-score">
      <p>Your High Score: {userHighScore}</p>
      <p>Highest Score: {highestScore}</p>
    </div>
  );

  return (
    <div className="start-container">
      <div className="start-container__button" onClick={onStartGame}>GO</div>
      {highScoreHtml}
      <div className="start-container__rules">
        <label className="start-container__r__label">
          How To Play?
        </label>
        <p className="start-container__r__details">
          For given simple math equations, answer whether they are true or false within a couple of seconds
        </p>
      </div>
    </div>
  );
};

DefaultScreen.propTypes = {
  highestScore: PropTypes.number,
  userHighScore: PropTypes.number.isRequired,
  onStartGame: PropTypes.func.isRequired
};

export default DefaultScreen;
