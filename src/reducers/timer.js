import { DEFAULT_STATE } from '../constants';

const timer = (state = DEFAULT_STATE.timer, action) => {
  switch (action.type) {
    case 'SET_TIMER':
      return Object.assign({}, state, { timer: action.payload });

    case 'RESET_TIMER':
      return Object.assign({}, state, { ...action.payload, ongoing: true });

    case 'STOP_GAME':
      return Object.assign({}, state, { ongoing: false });

    default:
      return state;
  }
};

export default timer;
