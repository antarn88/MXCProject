import React from 'react';
import {View, Text, Button} from 'react-native';

import {dateFormatter} from '../../utils/Utils';
import {styles} from './TableRow.styles';

export const TableRow = ({item}) => {
  return (
    <View style={styles.tableContentContainer}>
      {/* PRODUCT NAME */}
      <View style={[styles.rowCell, styles.productNameCell]}>
        <Text>{item.productName}</Text>
      </View>

      {/* PRODUCT NUMBER */}
      <View style={[styles.rowCell, styles.productNumberCell]}>
        <Text style={styles.alignSelfCenter}>{item.productNumber}</Text>
      </View>

      {/* PRICE */}
      <View style={[styles.rowCell, styles.priceCell]}>
        <Text style={styles.alignSelfCenter}>{item.price}</Text>
      </View>

      {/* CREATED AT */}
      <View style={[styles.rowCell, styles.createdAtCell]}>
        <Text style={styles.alignSelfCenter}>{dateFormatter(item.createdAt!)}</Text>
      </View>

      {/* DELETE */}
      <View style={[styles.rowCell, styles.deleteCell]}>
        <Text style={styles.alignSelfCenter}>
          <Button title="Törlés" color="#B22222" />
        </Text>
      </View>
    </View>
  );
};
