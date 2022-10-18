import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';

import {ILoadingProps} from '../../interfaces/loading/loading-props.interface';
import {styles} from './Loading.styles';

const Loading = ({loadingText}: ILoadingProps): JSX.Element => {
  return (
    <View>
      <ActivityIndicator size="large" style={styles.spinner} />
      <Text style={styles.loadingText}>{loadingText}</Text>
    </View>
  );
};

export default Loading;
