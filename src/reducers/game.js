import { GAME_STATUS, DEFAULT_STATE } from '../constants';
import Equation from '../helpers/equation';

const game = (state = DEFAULT_STATE.game, action) => {
  let gameState;

  switch (action.type) {
    case 'START_GAME':
      gameState = Object.assign({}, state, {
        status: GAME_STATUS.ONGOING,
        score: 0,
        highScoreCreated: false,
        equation: new Equation()
      });
      return gameState;

    case 'USER_ANSWER_INCORRECT':
      gameState = Object.assign({}, state, {
        status: GAME_STATUS.OVER
      });
      return gameState;

    case 'USER_ANSWER_CORRECT':
      gameState = Object.assign({}, state, {
        score: state.score + 1,
        equation: new Equation()
      });
      if (gameState.score > gameState.userHighScore) {
        gameState.userHighScore = gameState.score;
        gameState.highScoreCreated = true;
      }
      return gameState;

    default:
      return state;
  }
};

export default game;
