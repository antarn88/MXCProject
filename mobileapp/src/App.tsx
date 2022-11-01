import React from 'react';
import {View} from 'react-native';
import {Provider} from 'react-redux';
import {NativeRouter, Route, Routes} from 'react-router-native';

import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import ProductEditor from './pages/ProductEditor/ProductEditor';
import store from './store/store';

const App = (): JSX.Element => {
  return (
    <NativeRouter>
      <Provider store={store}>
        <View>
          <Header />

          {/* <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{title: 'Welcome'}} />
            <Stack.Screen name="ProductEditor" component={ProductEditor} />
          </Stack.Navigator>
        </NavigationContainer> */}
          {/* <Home /> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:productId" element={<ProductEditor />} />
          </Routes>
        </View>
      </Provider>
    </NativeRouter>
  );
};

export default App;
