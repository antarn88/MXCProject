import React, {useCallback, useEffect, useState} from 'react';
import {View, FlatList, ScrollView} from 'react-native';

import {IProduct} from '../../interfaces/products/product.interface';
import {IProductsState} from '../../interfaces/products/products-state.interface';
import {getProducts} from '../../store/products/products-api';
import store, {useAppSelector, RootState} from '../../store/store';
import {OrderByOption} from '../../enums/order-by-option.enum';
import {OrderOption} from '../../enums/order-option.enum';
import Loading from '../../components/Loading/Loading';
import {styles} from './Home.styles';
import {TableHeader} from '../../components/TableHeader/TableHeader';
import {TableRow} from '../../components/TableRow/TableRow';

// const createDataProvider = () => {
//   return new DataProvider((r1, r2) => r1 !== r2);
// };

const Home = (): JSX.Element => {
  const {products, isLoading} = useAppSelector<IProductsState>((state: RootState) => state.products);
  const [displayedProducts, setDisplayedProducts] = useState<IProduct[]>([]);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [orderBy, setOrderBy] = useState<OrderByOption>(OrderByOption.PRODUCT_NAME);
  const [order, setOrder] = useState<OrderOption>(OrderOption.ASC);
  // const [dataProvider, setDataProvider] = useState<BaseDataProvider>(createDataProvider().cloneWithRows([]));
  const pageSize = 10;

  const fetchProducts = async (): Promise<void> => {
    console.log('FETCH MEGHÍVÓDOTT, az oldal:', pageIndex);
    if (pageIndex !== 0) {
      const request = await store.dispatch(getProducts({pageIndex, limit: pageSize, order, orderBy}));
      if (request.meta.requestStatus === 'fulfilled') {
        const productListPiece = request.payload as IProduct[];
        setPageIndex((previousPage: number) => previousPage + 1);
        setDisplayedProducts([...displayedProducts, ...productListPiece]);
        // setDataProvider(createDataProvider().cloneWithRows([...displayedProducts, ...productListPiece]));
      } else {
        console.log('Hiba a termékek betöltésekor!');
      }
    }
  };

  const reloadTableAfterSorting = useCallback(async (): Promise<void> => {
    setDisplayedProducts([]);
    // setDataProvider(createDataProvider().cloneWithRows([]));
    const request = await store.dispatch(getProducts({orderBy, order, pageIndex: 0, limit: pageSize}));
    if (request.meta.requestStatus === 'fulfilled') {
      const productListPiece = request.payload as IProduct[];
      setDisplayedProducts(productListPiece);
      setPageIndex((previousValue: number) => previousValue + 1);
      // setDataProvider(createDataProvider().cloneWithRows(productListPiece));
      console.log('Beállítottam a reloadban');
    } else {
      console.error('Hiba a termékek betöltésekor!');
    }
  }, [order, orderBy]);

  useEffect((): void => {
    reloadTableAfterSorting();
  }, [reloadTableAfterSorting]);

  // const rowRenderer = (_type: string | number, data: IProduct, _index: number) => {
  //   return (
  //     <View>
  //       <TableRow item={data} />
  //     </View>
  //   );
  // };

  // let {width, height} = Dimensions.get('window');

  // const ViewTypes = {
  //   FULL: 0,
  //   HALF_LEFT: 1,
  //   HALF_RIGHT: 2,
  // };

  // const layoutProvider = new LayoutProvider(
  //   (index) => 1,
  //   (type: any, dim: Dimension) => {
  //     dim.width = width;
  //     dim.height = height / 2;
  //   },
  // );

  return (
    <View>
      {/* {!isLoading && !products.length && <Text>Nincsenek termékek.</Text>} */}

      {displayedProducts.length > 0 && (
        // <>
        //   <RecyclerListView
        //     layoutProvider={layoutProvider}
        //     dataProvider={dataProvider}
        //     rowRenderer={rowRenderer}
        //     renderFooter={() => <Loading loadingText={'Termékek betöltése...'} />}
        //     onEndReached={fetchProducts}
        //     onEndReachedThreshold={150}
        //     forceNonDeterministicRendering
        //   />
        // </>
        <ScrollView
          horizontal={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={styles.mainContainer}>
          <FlatList
            ListHeaderComponent={TableHeader}
            data={displayedProducts}
            renderItem={TableRow}
            keyExtractor={(_item: IProduct, _index: number) => _item.id!.toString()}
            ListFooterComponent={<Loading loadingText={'Termékek betöltése...'} />}
            onEndReached={fetchProducts}
            onEndReachedThreshold={0.9}
          />
        </ScrollView>
      )}
    </View>
  );
};

export default Home;
