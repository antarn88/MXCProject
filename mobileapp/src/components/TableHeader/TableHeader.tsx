import React from 'react';
import {View, Text} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {OrderByOption} from '../../enums/order-by-option.enum';
import {OrderOption} from '../../enums/order-option.enum';
import {styles} from './TableHeader.styles';

export const TableHeader = (
  {orderBy, order}: {orderBy: OrderByOption; order: OrderOption},
  setSortingCallback: ({newOrder, newOrderBy}: {newOrder: OrderOption; newOrderBy: OrderByOption}) => void,
): JSX.Element => {
  let newOrder: OrderOption = order;
  let newOrderBy: OrderByOption = orderBy;

  const setNewOrder = (): void => {
    newOrder = order === OrderOption.ASC ? OrderOption.DESC : OrderOption.ASC;
    setSortingCallback({newOrder, newOrderBy});
  };

  const setNewOrderBy = (column: OrderByOption): void => {
    if (newOrderBy !== column) {
      newOrderBy = column;
      setSortingCallback({newOrder, newOrderBy});
    }
  };

  return (
    <View style={styles.headerContainer}>
      {/* PRODUCT NAME */}
      <View style={[styles.headerCell, styles.productNameCell]}>
        <View style={[styles.headerCellContainer]}>
          <Text style={[styles.columnText]} onPress={() => setNewOrderBy(OrderByOption.PRODUCT_NAME)}>
            Terméknév
          </Text>
          {orderBy === OrderByOption.PRODUCT_NAME && (
            <MaterialCommunityIcons
              name={order === OrderOption.ASC ? 'arrow-up' : 'arrow-down'}
              size={17}
              style={[styles.columnIcon]}
              onPress={setNewOrder}
            />
          )}
        </View>
      </View>

      {/* PRODUCT NUMBER */}
      <View style={[styles.headerCell, styles.productNumberCell]}>
        <View style={[styles.headerCellContainer]}>
          <Text style={[styles.columnText]} onPress={() => setNewOrderBy(OrderByOption.PRODUCT_NUMBER)}>
            Cikkszám
          </Text>
          {orderBy === OrderByOption.PRODUCT_NUMBER && (
            <MaterialCommunityIcons
              name={order === OrderOption.ASC ? 'arrow-up' : 'arrow-down'}
              size={17}
              style={[styles.columnIcon]}
              onPress={setNewOrder}
            />
          )}
        </View>
      </View>

      {/* PRICE */}
      <View style={[styles.headerCell, styles.priceCell]}>
        <View style={[styles.headerCellContainer]}>
          <Text style={[styles.columnText]} onPress={() => setNewOrderBy(OrderByOption.PRICE)}>
            Ár
          </Text>
          {orderBy === OrderByOption.PRICE && (
            <MaterialCommunityIcons
              name={order === OrderOption.ASC ? 'arrow-up' : 'arrow-down'}
              size={17}
              style={[styles.columnIcon]}
              onPress={setNewOrder}
            />
          )}
        </View>
      </View>

      {/* CREATED AT */}
      <View style={[styles.headerCell, styles.createdAtCell]}>
        <View style={[styles.headerCellContainer]}>
          <Text style={[styles.columnText]} onPress={() => setNewOrderBy(OrderByOption.CREATED_AT)}>
            CreatedAt
          </Text>
          {orderBy === OrderByOption.CREATED_AT && (
            <MaterialCommunityIcons
              name={order === OrderOption.ASC ? 'arrow-up' : 'arrow-down'}
              size={17}
              style={[styles.columnIcon]}
              onPress={setNewOrder}
            />
          )}
        </View>
      </View>

      {/* DELETE  */}
      <View style={[styles.headerCell, styles.deleteCell]}>
        <Text style={styles.alignSelfCenter}>Törlés</Text>
      </View>
    </View>
  );
};
