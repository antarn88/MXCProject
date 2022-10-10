import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Header = (): JSX.Element => {
  return (
    <View style={styles.headerContainer}>
      <Text>Header</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'lightgreen',
    fontWeight: 'bold',
    height: 80,
  },
});

export default Header;
