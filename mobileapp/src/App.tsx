import React from 'react';
import {View} from 'react-native';
import {Provider} from 'react-redux';

import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import store from './store/store';

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <View>
        <Header />
        <Home />
      </View>
    </Provider>
  );
};

export default App;
