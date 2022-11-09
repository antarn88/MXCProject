import React, {useCallback, useEffect, useState} from 'react';
import {View, FlatList, ScrollView, Text, Button, ListRenderItemInfo, GestureResponderEvent} from 'react-native';
import {useNavigate} from 'react-router-native';

import {IProduct} from '../../interfaces/products/product.interface';
import {IProductsState} from '../../interfaces/products/products-state.interface';
import {deleteProduct, getProducts} from '../../store/products/products-api';
import store, {useAppSelector, RootState} from '../../store/store';
import {OrderByOption} from '../../enums/order-by-option.enum';
import {OrderOption} from '../../enums/order-option.enum';
import Loading from '../../components/Loading/Loading';
import {styles} from './Home.styles';
import {TableHeader} from '../../components/TableHeader/TableHeader';
import {TableRow} from '../../components/TableRow/TableRow';
import DeleteModal from '../../components/DeleteModal/DeleteModal';

const Home = (): JSX.Element => {
  const {products, isLoading} = useAppSelector<IProductsState>((state: RootState) => state.products);
  const [displayedProducts, setDisplayedProducts] = useState<IProduct[]>([]);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [orderBy, setOrderBy] = useState<OrderByOption>(OrderByOption.PRODUCT_NAME);
  const [order, setOrder] = useState<OrderOption>(OrderOption.ASC);
  const [currentProductId, setCurrentProductId] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isDeletingProduct, setIsDeletingProduct] = useState(false);
  const navigate = useNavigate();
  const pageSize = 10;

  const fetchProducts = async (): Promise<void> => {
    console.log('FETCH MEGHÍVÓDOTT, az oldal:', pageIndex);
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
      console.log('Beállítottam a reloadban');
    } else {
      console.error('Hiba a termékek betöltésekor!');
    }
  }, [order, orderBy]);

  useEffect((): void => {
    reloadTableAfterSorting();
  }, [reloadTableAfterSorting]);

  const onPressCreateProduct = (): void => navigate('/create');

  const showDeleteModal = async (_event: GestureResponderEvent, productId: string): Promise<void> => {
    setCurrentProductId(productId);
    setModalVisible(true);
  };

  const onDeleteProduct = async (): Promise<void> => {
    if (currentProductId) {
      setIsDeletingProduct(true);
      if ((await store.dispatch(deleteProduct(currentProductId))).meta.requestStatus === 'fulfilled') {
        setDisplayedProducts(displayedProducts.filter((product: IProduct) => product.id?.toString() !== currentProductId));
      } else {
        console.log('TÖRLÉS NEM SIKERÜLT!');
      }
      setIsDeletingProduct(false);
      setCurrentProductId(null);
      setModalVisible(false);
    }
  };

  return (
    <View style={[styles.mainContainer]}>
      <DeleteModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onDeleteProduct={onDeleteProduct}
        isDeletingProduct={isDeletingProduct}
      />

      <View style={[styles.newProductContainer]}>
        <Button onPress={onPressCreateProduct} title="Új termék" />
      </View>

      {!isLoading && !products.length && <Text>Nincsenek termékek.</Text>}

      {displayedProducts.length > 0 && (
        <ScrollView
          horizontal={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={styles.mainContainer}>
          <FlatList
            ListHeaderComponent={TableHeader}
            data={displayedProducts}
            renderItem={(item: ListRenderItemInfo<IProduct>) => TableRow(item, showDeleteModal)}
            keyExtractor={(_item: IProduct, index: number) => index.toString()}
            ListFooterComponent={<Loading loadingText={'Termékek betöltése...'} />}
            onEndReached={fetchProducts}
            onEndReachedThreshold={0.9}
            stickyHeaderIndices={[0]}
          />
        </ScrollView>
      )}
    </View>
  );
};

export default Home;
