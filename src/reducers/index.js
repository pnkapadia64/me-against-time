import { combineReducers } from 'redux';

import firebase from './firebase';
import game from './game';
import timer from './timer';

const rootReducer = combineReducers({
	firebase,
	game,
	timer
});

export default rootReducer;
