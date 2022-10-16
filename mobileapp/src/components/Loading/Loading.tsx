import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

import {ILoadingProps} from '../../interfaces/loading/loading-props.interface';

const Loading = ({loadingText}: ILoadingProps): JSX.Element => {
  return (
    <View style={styles.loadingBox}>
      <ActivityIndicator size="large" />
      <Text style={styles.loadingText}>{loadingText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingBox: {
    marginTop: 13,
  },
  loadingText: {
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 18,
  },
});

export default Loading;
