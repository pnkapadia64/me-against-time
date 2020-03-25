import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { firebase, helpers } from 'react-redux-firebase'

import DefaultScreen from './GameScreens/DefaultScreen';
import GameOverScreen from './GameScreens/GameOverScreen';
import Game from './Game';
import { startGame } from '../actions';
import { GAME_STATUS } from '../constants';
import './mainApp.scss';

const CURRENT_GAME_STATE = {
  DEFAULT: 'DEFAULT', // Initial default state of the game
  ONGOING: 'ONGOING', // Game in progress
  GAME_OVER: 'GAME_OVER', // Game over when user has answered incorrectly
  TIME_UP: 'TIME_UP'  // Game over when time is up
};

const GAME_COMPONENT_MAP = {
  [CURRENT_GAME_STATE.DEFAULT]: DefaultScreen,
  [CURRENT_GAME_STATE.ONGOING]: Game,
  [CURRENT_GAME_STATE.GAME_OVER]: GameOverScreen,
  [CURRENT_GAME_STATE.TIME_UP]: GameOverScreen
};

const mapStateToProps = state => {
  const { firebase, game = {}, timer = {} } = state;
  const { userHighScore, highScoreCreated, score, status } = game;
  const { ongoing } = timer;
  const props = {
    userHighScore,
    highScoreCreated,
    score,
    highestScore: helpers.dataToJS(firebase, 'highestScore')
  };

  if (status === GAME_STATUS.DEFAULT) {
    props.gameState = CURRENT_GAME_STATE.DEFAULT;
    return props;
  }

  if (status === GAME_STATUS.OVER) {
    props.gameState = CURRENT_GAME_STATE.GAME_OVER;
    return props;
  }

  if (!ongoing) {
    props.gameState = CURRENT_GAME_STATE.TIME_UP;
    return props;
  }

  if (ongoing || status === GAME_STATUS.ONGOING) {
    props.gameState = CURRENT_GAME_STATE.ONGOING;
    return props;
  }

  return props;
};

const mapDispatchToProps = (dispatch) => ({
  onStartGame: () => {
    setTimeout(() => {
      dispatch(startGame())
    }, 200);
  }
});

const MainApp = (props) => {
  const GameComponent = GAME_COMPONENT_MAP[props.gameState];

  return (
    <div className="my-app">
      <div className="my-app__title">That Game!</div>
      <GameComponent {...props} />
    </div>
  )
};

MainApp.propTypes = {
  gameState: PropTypes.string
};

const withFirebaseWrapper = firebase([
  '/highestScore'
])(MainApp);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withFirebaseWrapper);
