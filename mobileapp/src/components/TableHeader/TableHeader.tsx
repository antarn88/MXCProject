import React from 'react';
import {View, Text} from 'react-native';

import {styles} from './TableHeader.styles';

export const TableHeader = (): JSX.Element => {
  return (
    <View style={styles.headerContainer}>
      {/* PRODUCT NAME */}
      <View style={[styles.headerCell, styles.productNameCell]}>
        <Text style={styles.alignSelfCenter}>Terméknév</Text>
      </View>

      {/* PRODUCT NUMBER */}
      <View style={[styles.headerCell, styles.productNumberCell]}>
        <Text style={styles.alignSelfCenter}>Cikkszám</Text>
      </View>

      {/* PRICE */}
      <View style={[styles.headerCell, styles.priceCell]}>
        <Text style={styles.alignSelfCenter}>Ár</Text>
      </View>

      {/* CREATED AT */}
      <View style={[styles.headerCell, styles.createdAtCell]}>
        <Text style={styles.alignSelfCenter}>CreatedAt</Text>
      </View>

      {/* DELETE  */}
      <View style={[styles.headerCell, styles.deleteCell]}>
        <Text style={styles.alignSelfCenter}>Törlés</Text>
      </View>
    </View>
  );
};
