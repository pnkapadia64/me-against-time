import _merge from 'lodash/merge';
import { DEFAULT_STATE } from '../constants';

const getSerializesHighScore = () => {
  try {
    const serializedHighScore = localStorage.getItem('userHighScore');
    if (serializedHighScore === null)
      return 0;
    return JSON.parse(serializedHighScore);
  } catch (err) {
    return 0;
  }
};

export const loadInitialLocalState = () => {
  const userHighScore = getSerializesHighScore();
  return _merge({}, DEFAULT_STATE, {
    game: {
      userHighScore
    }
  });
};

export const saveLocalState = (state) => {
  const savedHighScore = getSerializesHighScore();
  const newHighScore = state.game.userHighScore;

  if (savedHighScore !== newHighScore) {
    try {
      const serializedState = JSON.stringify(newHighScore || 0);
      localStorage.setItem('userHighScore', serializedState);
    } catch (err) {
      return {};
    }
  }
};
