import React from 'react';
import {View, Text, Button} from 'react-native';

import {dateFormatter} from '../../utils/Utils';
import {styles} from './TableRow.styles';

export const TableRow = ({item}) => {
  return (
    <View style={styles.renderItemContainer}>
      <View style={{borderRightWidth: 1, width: 147, padding: 10, borderColor: '#DCDCDC'}}>
        <Text>{item.productName}</Text>
      </View>
      <View style={{borderRightWidth: 1, width: 83, padding: 10, borderColor: '#DCDCDC'}}>
        <Text style={{alignSelf: 'center'}}>{item.productNumber}</Text>
      </View>
      <View style={{borderRightWidth: 1, width: 70, padding: 10, borderColor: '#DCDCDC'}}>
        <Text style={{alignSelf: 'center'}}>{item.price}</Text>
      </View>
      <View style={{borderRightWidth: 1, width: 110, padding: 10, borderColor: '#DCDCDC'}}>
        <Text>{dateFormatter(item.createdAt!)}</Text>
      </View>
      <View style={{borderRightWidth: 1, width: 90, padding: 10, borderColor: '#DCDCDC'}}>
        <Text style={{alignSelf: 'center'}}>
          <Button title="Törlés" color="#B22222" />
        </Text>
      </View>
    </View>
  );
};
