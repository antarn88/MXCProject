import React from 'react';
import {View, Text} from 'react-native';

import {styles} from './TableHeader.styles';

export const TableHeader = (): JSX.Element => {
  return (
    <View style={styles.headerContainer}>
      <View style={{borderRightWidth: 1, width: 147, padding: 10, borderColor: '#DCDCDC'}}>
        <Text style={{alignSelf: 'center'}}>Terméknév</Text>
      </View>
      <View style={{borderRightWidth: 1, width: 83, padding: 10, borderColor: '#DCDCDC'}}>
        <Text style={{alignSelf: 'center'}}>Cikkszám</Text>
      </View>
      <View style={{borderRightWidth: 1, width: 70, padding: 10, borderColor: '#DCDCDC'}}>
        <Text style={{alignSelf: 'center'}}>Ár</Text>
      </View>
      <View style={{borderRightWidth: 1, width: 110, padding: 10, borderColor: '#DCDCDC'}}>
        <Text style={{alignSelf: 'center'}}>CreatedAt</Text>
      </View>
      <View style={{borderRightWidth: 1, width: 90, padding: 10, borderColor: '#DCDCDC'}}>
        <Text style={{alignSelf: 'center'}}>Törlés</Text>
      </View>
    </View>
  );
};
