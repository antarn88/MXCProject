import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

import {ILoadingProps} from '../../interfaces/loading/loading-props.interface';

const Loading = ({loadingText}: ILoadingProps): JSX.Element => {
  return (
    <View>
      <ActivityIndicator size="large" style={styles.spinner} />
      <Text style={styles.loadingText}>{loadingText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingText: {
    fontSize: 16,
    marginLeft: 132,
    marginBottom: 15,
  },
  spinner: {
    marginLeft: 190,
    padding: 15,
    width: 30,
  },
});

export default Loading;
