import React from 'react';
import {Text, View} from 'react-native';

import {styles} from './Header.styles';

const Header = (): JSX.Element => {
  return (
    <View style={styles.headerContainer}>
      <Text>Header</Text>
    </View>
  );
};

export default Header;
