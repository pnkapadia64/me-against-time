import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { sendGAHighestScore, sendGAUserScore } from '../../ga';
import './gameOverScreen.scss';

const renderGameState = (gameState) => {
  return (
    <div className="game-over-container__status">
      {gameState === 'TIME_UP' ? 'Time Up!' : 'Oops! Wrong Answer'}
    </div>
  )
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
      props.firebase.set('highestScore', props.userHighScore);
      sendGAHighestScore(props.userHighScore);
    }
    sendGAUserScore(props.score);
  }

  render() {
    const { props } = this;

    return (
      <div className="game-over-container">
        <div className="game-over-container__header">Game Over!</div>
        {renderGameState(props.gameState)}
        <div className="game-over-container__score">Score: {props.score}</div>
        <div className="game-over-container__button" onClick={props.onStartGame}>Play again</div>
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
}

GameOverScreen.propTypes = {
  firebase: PropTypes.object,
  highestScore: PropTypes.number.isRequired,
  userHighScore: PropTypes.number.isRequired,
  highScoreCreated: PropTypes.bool,
  gameState: PropTypes.string.isRequired,
  onStartGame: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired
};

export default GameOverScreen;
