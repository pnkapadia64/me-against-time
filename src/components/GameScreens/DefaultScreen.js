import React from 'react';
import PropTypes from 'prop-types';
import './defaultScreen.scss';
import MainButton from '../MainButton/MainButton';

const DefaultScreen = ({ userHighScore = 0, highestScore = 0, onStartGame }) => {
  const highScoreHtml = (
    <div className="start-container__high-score">
      <p className="start-container__hs__user">Your High Score: {userHighScore}</p>
      <p>Highest Score: {highestScore}</p>
    </div>
  );

  return (
    <div className="start-container">
      <MainButton label="GO" onClick={onStartGame} />
      {highScoreHtml}
      <div className="start-container__rules">
        <label className="start-container__r__label">
          How To Play?
        </label>
        <p className="start-container__r__details">
          Answer true/false for simple questions at your best speed!
        </p>
      </div>
    </div>
  );
};

DefaultScreen.propTypes = {
  highestScore: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  userHighScore: PropTypes.number.isRequired,
  onStartGame: PropTypes.func.isRequired
};

export default DefaultScreen;
