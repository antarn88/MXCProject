import React, {useEffect} from 'react';
import {FlatList, Text, ListRenderItem, StyleSheet, View} from 'react-native';

import {IProduct} from '../../interfaces/products/product.interface';
import {IProductsState} from '../../interfaces/products/products-state.interface';
import {getProducts} from '../../store/products/products-api';
import store, {useAppSelector, RootState} from '../../store/store';

const Home = (): JSX.Element => {
  const {products} = useAppSelector<IProductsState>((state: RootState) => state.products);

  const fetchProducts = async (): Promise<void> => {
    await store.dispatch(getProducts());
  };

  const renderItem: ListRenderItem<IProduct> = ({item}: {item: IProduct}) => (
    <Text style={styles.baseText}>{item.productName}</Text>
  );

  useEffect((): void => {
    fetchProducts();
  }, []);

  return (
    <View>
      {products.length > 0 && (
        <View>
          <Text style={styles.titleText}>Termék lista:</Text>
          <FlatList data={products} keyExtractor={(_item, index) => index.toString()} renderItem={renderItem} />
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
});

export default Home;
