import React, {useEffect} from 'react';
import {Text, StyleSheet, View, ActivityIndicator} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';

import {IProductsState} from '../../interfaces/products/products-state.interface';
import {getProducts} from '../../store/products/products-api';
import store, {useAppSelector, RootState} from '../../store/store';

const Home = (): JSX.Element => {
  const {products, isLoading} = useAppSelector<IProductsState>((state: RootState) => state.products);

  const fetchProducts = async (): Promise<void> => {
    await store.dispatch(getProducts());
  };

  useEffect((): void => {
    fetchProducts();
  }, []);

  const tableHead = ['Terméknév', 'Cikkszám', 'Ár', 'CreatedAt'];
  const tableData = products.map((row) => [row.productName, row.productNumber, row.price, row.createdAt]);

  return (
    <View>
      {isLoading && (
        <View style={styles.mainContainer}>
          <Text style={styles.loadingBox}>
            <Text>
              <ActivityIndicator size="large" style={styles.spinner} />
            </Text>
            <Text style={styles.loadingText}>
              <Text>Termékek betöltése...</Text>
            </Text>
          </Text>
        </View>
      )}
      {!isLoading && products.length === 0 && <Text>Nincsenek termékek.</Text>}

      {products.length > 0 && !isLoading && (
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
  mainContainer: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    marginRight: 20,
  },
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
