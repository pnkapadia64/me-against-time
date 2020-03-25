import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'

import App from './components/MainApp';
import store from './reducers';
import { loadInitialLocalState, saveLocalState } from './localStorage';

import './index.scss';

const firebaseConfig = {
  apiKey: "AIzaSyDHrT-h5FwhGpP3vx4ysOyjUacD6zddQw0",
  authDomain: "sample1-5ee92.firebaseapp.com",
  databaseURL: "https://sample1-5ee92.firebaseio.com",
  projectId: "sample1-5ee92", //
  storageBucket: "sample1-5ee92.appspot.com",
  messagingSenderId: "722727776852" //
};

const reduxFirebaseConfig = {
  //enableLogging: true
};

const persistedState = loadInitialLocalState();

// Add redux Firebase to compose app store
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebaseConfig, reduxFirebaseConfig)
)(createStore);

const appStore = createStoreWithFirebase(store, persistedState, applyMiddleware(thunk.withExtraArgument(getFirebase)));

appStore.subscribe(() => {
  saveLocalState(appStore.getState());
});

ReactDOM.render(
  <Provider store={appStore}>
    <App />
  </Provider>,
  document.getElementById('root')
);
