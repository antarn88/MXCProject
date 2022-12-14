import React, {useCallback, useEffect, useState} from 'react';
import {View, FlatList, ScrollView, Text, Button, ListRenderItemInfo, GestureResponderEvent, ToastAndroid} from 'react-native';
import {useLocation, useNavigate} from 'react-router-native';

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
import {IAuthState} from '../../interfaces/auth/auth-state.interface';
import {resetProductsErrors} from '../../store/products/products-slice';

let orderBackup: OrderOption = OrderOption.ASC;
let orderByBackup: OrderByOption = OrderByOption.PRODUCT_NAME;

const Home = (): JSX.Element => {
  const {products, isLoading, error} = useAppSelector<IProductsState>((state: RootState) => state.products);
  const {isLoggedIn, accessToken} = useAppSelector<IAuthState>((state: RootState) => state.auth);
  const [displayedProducts, setDisplayedProducts] = useState<IProduct[]>([]);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [orderBy, setOrderBy] = useState<OrderByOption>(OrderByOption.PRODUCT_NAME);
  const [order, setOrder] = useState<OrderOption>(OrderOption.ASC);
  const [currentProductId, setCurrentProductId] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isDeletingProduct, setIsDeletingProduct] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  let backNavigated = location.state?.backNavigated;

  const pageSize = 15;

  const fetchProducts = useCallback(async (): Promise<void> => {
    if (pageIndex !== 0 && !isLoading) {
      const request = await store.dispatch(
        getProducts({
          pageIndex,
          limit: pageSize,
          order: backNavigated ? orderBackup : order,
          orderBy: backNavigated ? orderByBackup : orderBy,
        }),
      );
      if (request.meta.requestStatus === 'fulfilled') {
        const productListPiece = request.payload as IProduct[];
        setDisplayedProducts([...displayedProducts, ...productListPiece]);
        setPageIndex((previousPage: number) => previousPage + 1);
      } else {
        console.error('Hiba a term??kek bet??lt??sekor!');
      }
    }
  }, [backNavigated, displayedProducts, isLoading, order, orderBy, pageIndex]);

  const reloadTableAfterSorting = useCallback(async (): Promise<void> => {
    setDisplayedProducts([]);
    const request = await store.dispatch(
      getProducts({
        orderBy: backNavigated ? orderByBackup : orderBy,
        order: backNavigated ? orderBackup : order,
        pageIndex: 0,
        limit: pageSize,
      }),
    );
    if (request.meta.requestStatus === 'fulfilled') {
      const productListPiece = request.payload as IProduct[];
      setDisplayedProducts(productListPiece);
      setPageIndex((previousValue: number) => previousValue + 1);
    } else {
      console.error('Hiba a term??kek bet??lt??sekor!');
    }
  }, [backNavigated, order, orderBy]);

  const onPressCreateProduct = useCallback((): void => navigate('/create'), [navigate]);

  const showDeleteModal = useCallback((_event: GestureResponderEvent, productId: string): void => {
    setCurrentProductId(productId);
    setModalVisible(true);
  }, []);

  const onDeleteProduct = useCallback(async (): Promise<void> => {
    if (currentProductId) {
      setIsDeletingProduct(true);
      if ((await store.dispatch(deleteProduct(currentProductId))).meta.requestStatus === 'fulfilled') {
        setDisplayedProducts(displayedProducts.filter((product: IProduct) => product.id?.toString() !== currentProductId));
        setModalVisible(false);
        setIsDeletingProduct(false);
        setCurrentProductId(null);
        ToastAndroid.show('Sikeresen t??r??lte a term??ket', ToastAndroid.LONG);
      } else {
        setModalVisible(false);
        setIsDeletingProduct(false);
        setCurrentProductId(null);
        console.error('Hiba a term??k t??rl??sekor!');
      }
    }
  }, [currentProductId, displayedProducts]);

  const keyExtractor = useCallback((_item: IProduct, index: number) => index.toString(), []);

  const headerCallback = ({newOrder, newOrderBy}: {newOrder: OrderOption; newOrderBy: OrderByOption}): void => {
    setPageIndex(0);
    if (order === newOrder && orderBy === newOrderBy) {
      setOrder((previousValue: OrderOption) => (previousValue === OrderOption.ASC ? OrderOption.DESC : OrderOption.ASC));
    } else {
      setOrder(newOrder);
      setOrderBy(newOrderBy);
    }
    orderBackup = newOrder;
    orderByBackup = newOrderBy;
  };

  useEffect((): void => {
    reloadTableAfterSorting();
  }, [reloadTableAfterSorting]);

  useEffect((): void => {
    (async (): Promise<void> => {
      if (
        !accessToken &&
        !isLoggedIn &&
        (error.errorAtGetProducts?.message?.includes('401') || error.errorAtDeleteProduct?.message?.includes('401'))
      ) {
        navigate('/login');
        store.dispatch(resetProductsErrors);
        setTimeout(() => {
          console.warn('Lej??rt munkamenet, jelentkezzen be ??jra!');
        }, 500);
      }
    })();
  }, [accessToken, isLoggedIn, navigate, error]);

  return (
    <View style={[styles.mainContainer]}>
      {/* DELETE MODAL */}
      <DeleteModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onDeleteProduct={onDeleteProduct}
        isDeletingProduct={isDeletingProduct}
      />

      {/* NEW PRODUCT BUTTON */}
      <View style={[styles.newProductContainer]}>
        <Button onPress={onPressCreateProduct} title="??j term??k" />
      </View>

      {/* EMPTY CALLOUT */}
      {!isLoading && !products.length && <Text style={[styles.noProductsText]}>Nincsenek term??kek.</Text>}

      {/* LOADING */}
      {isLoading && !displayedProducts.length && !error.errorAtGetProducts && (
        <View>
          <Loading loadingText="Term??kek bet??lt??se..." />
        </View>
      )}

      {/* DATA LIST TABLE */}
      {displayedProducts.length > 0 && (
        <ScrollView
          horizontal={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={styles.mainContainer}>
          <FlatList
            ListHeaderComponent={TableHeader(
              {orderBy: backNavigated ? orderByBackup : orderBy, order: backNavigated ? orderBackup : order},
              headerCallback,
            )}
            data={displayedProducts}
            renderItem={(item: ListRenderItemInfo<IProduct>) => TableRow(item, showDeleteModal)}
            keyExtractor={keyExtractor}
            ListFooterComponent={<Loading loadingText={'Term??kek bet??lt??se...'} />}
            onEndReached={fetchProducts}
            onEndReachedThreshold={0.8}
            stickyHeaderIndices={[0]}
          />
        </ScrollView>
      )}
    </View>
  );
};

export default Home;
