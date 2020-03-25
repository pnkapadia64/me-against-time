import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import MainApp from '../mainApp';

const mockStore = configureStore();
const store = mockStore({}, {});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <MainApp />
    </Provider>, div);
});
