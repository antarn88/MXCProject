import React, {useEffect} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';

import {IProductsState} from '../../interfaces/products/products-state.interface';
import {getProducts} from '../../store/products/products-api';
import store, {useAppSelector, RootState} from '../../store/store';

const Home = (): JSX.Element => {
  const {products} = useAppSelector<IProductsState>((state: RootState) => state.products);

  const fetchProducts = async (): Promise<void> => {
    await store.dispatch(getProducts());
  };

  useEffect((): void => {
    fetchProducts();
  }, []);

  const tableHead = ['productName', 'productNum', 'price', 'createdAt'];
  const tableData = products.map((row) => [row.productName, row.productNumber, row.price, row.createdAt]);

  return (
    <View>
      {products.length > 0 && (
        <View>
          <Text style={styles.titleText}>Termék lista:</Text>
          <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
            <Row data={tableHead} style={styles.head} textStyle={styles.text} />
            <Rows data={tableData} textStyle={styles.text} />
          </Table>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin',
    fontSize: 15,
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  head: {height: 40, backgroundColor: '#f1f8ff'},
  text: {margin: 6},
});

export default Home;
