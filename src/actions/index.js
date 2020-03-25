import _get from 'lodash/get';

import { TIMER_OFFSET, TIMER_BASE } from '../constants';

export const setTimer = time => ({
  type: 'SET_TIMER',
  payload: time
});

export const resetTimer = (timerId, timer) => ({
  type: 'RESET_TIMER',
  payload: { timerId, timer, ongoing: true }
});

export const stopGame = () => (dispatch, getState) => {
  const oldTimerId = _get(getState(), 'timer.timerId');
  oldTimerId && clearInterval(oldTimerId);

  return dispatch({
    type: 'STOP_GAME'
  });
};

export const startTimer = () => {
  return (dispatch, getState) => {
    const oldTimerId = _get(getState(), 'timer.timerId');
    oldTimerId && clearInterval(oldTimerId);

    const newTimerId = setInterval(() => {
      const oldTimer = getState().timer.timer;
      !(oldTimer - 1) ? dispatch(stopGame()) : dispatch(setTimer(oldTimer - 1));
    }, 1000 / TIMER_BASE);

    dispatch(resetTimer(newTimerId, TIMER_OFFSET));
  }
};

export const startGame = () => (dispatch) => {
  dispatch(startTimer());
  dispatch({ type: 'START_GAME' });
};

export const answerCorrectly = () => (dispatch) => {
  dispatch(startTimer());
  dispatch({ type: 'USER_ANSWER_CORRECT' });
};

export const answerIncorrectly = () => (dispatch) => {
  dispatch(stopGame());
  dispatch({ type: 'USER_ANSWER_INCORRECT' });
};
