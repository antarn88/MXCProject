import React from 'react';
import {View, Text, Button, GestureResponderEvent} from 'react-native';
import {Link} from 'react-router-native';

import {dateFormatter} from '../../utils/Utils';
import {styles} from './TableRow.styles';

export const TableRow = ({item}, handleDeleteClick: (event: GestureResponderEvent) => void) => {
  let clickProduct = false;

  return (
    <View style={styles.tableContentContainer}>
      {/* PRODUCT NAME */}
      <View style={[styles.rowCell, styles.productNameCell, clickProduct ? styles.clickProduct : undefined]}>
        <Link to={`/${item.id}`} state={item}>
          <Text onPressIn={() => (clickProduct = true)} onPressOut={() => (clickProduct = false)}>
            {item.productName}{' '}
          </Text>
        </Link>
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
          <Button title="Törlés" color="#B22222" onPress={handleDeleteClick} />
        </Text>
      </View>
    </View>
  );
};
