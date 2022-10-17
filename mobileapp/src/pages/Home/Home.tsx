import React, {useCallback, useEffect, useState} from 'react';
import {Text, StyleSheet, View, FlatList, Button, ScrollView} from 'react-native';

import {IProduct} from '../../interfaces/products/product.interface';
import {IProductsState} from '../../interfaces/products/products-state.interface';
import {getProducts} from '../../store/products/products-api';
import store, {useAppSelector, RootState} from '../../store/store';
import {OrderByOption} from '../../enums/order-by-option.enum';
import {OrderOption} from '../../enums/order-option.enum';
import Loading from '../../components/Loading/Loading';

const Home = (): JSX.Element => {
  const {products, isLoading} = useAppSelector<IProductsState>((state: RootState) => state.products);
  const [displayedProducts, setDisplayedProducts] = useState<IProduct[]>([]);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [orderBy, setOrderBy] = useState<OrderByOption>(OrderByOption.PRODUCT_NAME);
  const [order, setOrder] = useState<OrderOption>(OrderOption.ASC);
  const pageSize = 25;

  const fetchProducts = async (): Promise<void> => {
    if (pageIndex !== 0) {
      const request = await store.dispatch(getProducts({pageIndex, limit: pageSize, order, orderBy}));
      if (request.meta.requestStatus === 'fulfilled') {
        const productListPiece = request.payload as IProduct[];
        setPageIndex((previousPage: number) => previousPage + 1);
        setDisplayedProducts([...displayedProducts, ...productListPiece]);
      } else {
        console.log('Hiba a termékek betöltésekor!');
      }
    }
  };

  const reloadTableAfterSorting = useCallback(async (): Promise<void> => {
    setDisplayedProducts([]);
    const request = await store.dispatch(getProducts({orderBy, order, pageIndex: 0, limit: pageSize}));
    if (request.meta.requestStatus === 'fulfilled') {
      const productListPiece = request.payload as IProduct[];
      setDisplayedProducts(productListPiece);
      setPageIndex((previousValue: number) => previousValue + 1);
    } else {
      console.error('Hiba a termékek betöltésekor!');
    }
  }, [order, orderBy, pageSize]);

  useEffect((): void => {
    reloadTableAfterSorting();
  }, [reloadTableAfterSorting]);

  const dateFormatter = (isoDate: string) => new Date(isoDate).toLocaleDateString('hu-HU');

  const renderItem = ({item}) => {
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

  const header = (): JSX.Element => {
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

  return (
    <View>
      {/* {!isLoading && !products.length && <Text>Nincsenek termékek.</Text>} */}

      {displayedProducts.length > 0 && (
        <ScrollView
          horizontal={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={styles.mainContainer}>
          <FlatList
            ListHeaderComponent={header}
            data={displayedProducts}
            renderItem={renderItem}
            keyExtractor={(_item: IProduct, index: number) => index.toString()}
            ListFooterComponent={<Loading loadingText={'Termékek betöltése...'} />}
            onEndReached={fetchProducts}
            onEndReachedThreshold={0.8}
          />
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: 160,
  },
  renderItemContainer: {
    flexDirection: 'row',
    flex: 1,
    borderWidth: 1,
    borderColor: '#DCDCDC',
    overflow: 'scroll',
  },
  headerContainer: {
    flexDirection: 'row',
    flex: 1,
    borderWidth: 1,
    borderColor: '#DCDCDC',
    backgroundColor: '#FDF5E6',
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
