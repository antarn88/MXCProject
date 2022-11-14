/**
 * @format
 */

import {AppRegistry} from 'react-native';
import React from 'react';
import {Provider} from 'react-redux';
import {NativeRouter} from 'react-router-native';

import App from './src/App';
import {name as appName} from './app.json';
import store from './src/store/store';

const Index = (): JSX.Element => {
  return (
    <NativeRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </NativeRouter>
  );
};

AppRegistry.registerComponent(appName, () => Index);
