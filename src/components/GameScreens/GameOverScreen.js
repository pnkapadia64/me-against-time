import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { sendGAHighestScore, sendGAUserScore } from '../../ga';
import './gameOverScreen.scss';
import { czyShowHappytime, czyShowMidgameAd } from '../../czy';

const renderGameState = (gameState) => {
  return (
    <div className="game-over-container__status">
      {gameState === 'TIME_UP' ? 'Time Up!' : 'Oops! Wrong Answer'}
    </div>
  )
};

const getSolvedEquationsPerMinute = (eqCount, timeTakenInSec) => {
  if (!eqCount) {
    return '';
  }
  return Math.round((60*eqCount ) / timeTakenInSec);
};

class GameOverScreen extends PureComponent {
  constructor(props) {
    super();
    this.state = {
      isHighestScore: props.highScoreCreated && props.userHighScore > props.highestScore
    }
  }

  componentWillMount() {
    const { props } = this;
    if (this.state.isHighestScore) {
      czyShowHappytime();
      props.firebase.set('highestScore', props.userHighScore);
      sendGAHighestScore(props.userHighScore);
    } else if (props.highScoreCreated) {
      czyShowHappytime(); 
    }
    sendGAUserScore(props.score);

    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  render() {
    const { props } = this;
    const eqSpeed = getSolvedEquationsPerMinute(props.score, props.timeTakenInMs);

    return (
      <div className="game-over-container">
        <div className="game-over-container__header">Game Over!</div>
        {renderGameState(props.gameState)}
        <div className="game-over-container__score">Score: {props.score}</div>
        <div className="game-over-container__button" onClick={this.onPlayAgain}>Play again</div>
        {eqSpeed && <div className="game-over-container__speed">You can solve {eqSpeed} equations in a minute!</div>}
        <div className="game-over-container__high-score-label">
          {props.highScoreCreated ? 'High Score created!' : ''}
          {this.state.isHighestScore ? ' You beat everyone!' : ''}
        </div>
        <div className="game-over-container__high-score">
          <p>Your High Score: {props.userHighScore}</p>
          <p>Highest Score: {props.highestScore}</p>
        </div>
      </div>
    );
  }

  onKeyDown = (e) => {
    // Space or Enter key
    if (e.keyCode === 32 || e.keyCode === 13) {
      this.onPlayAgain();
    }
  }

  onPlayAgain = () => {
    czyShowMidgameAd((avoidGameStart) => !avoidGameStart && this.props.onStartGame());
  }
}

GameOverScreen.propTypes = {
  firebase: PropTypes.object,
  highestScore: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  userHighScore: PropTypes.number.isRequired,
  highScoreCreated: PropTypes.bool,
  gameState: PropTypes.string.isRequired,
  onStartGame: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  timeTakenInMs: PropTypes.number.isRequired
};

export default GameOverScreen;
