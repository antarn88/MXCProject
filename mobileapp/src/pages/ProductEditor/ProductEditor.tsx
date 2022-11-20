import React, {useCallback, useEffect} from 'react';
import {Button, Text, TextInput, ToastAndroid, View} from 'react-native';
import {useLocation, useNavigate} from 'react-router-native';
import {Controller, FieldValues, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';

import {styles} from './ProductEditor.styles';
import {IProduct} from '../../interfaces/products/product.interface';
import {createProduct, updateProduct} from '../../store/products/products-api';
import store, {RootState, useAppSelector} from '../../store/store';
import {IProductsState} from '../../interfaces/products/products-state.interface';
import {IAuthState} from '../../interfaces/auth/auth-state.interface';
import {resetProductsErrors} from '../../store/products/products-slice';

const ProductEditor = (): JSX.Element => {
  const {isLoading, error} = useAppSelector<IProductsState>((state: RootState) => state.products);
  const {isLoggedIn, accessToken} = useAppSelector<IAuthState>((state: RootState) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product as IProduct;

  const productSchema = z.object({
    productName: z.string().min(1, 'A terméknév kitöltése kötelező'),
    productNumber: z.string().min(1, 'A cikkszám kitöltése kötelező'),
    price: z.string().min(1, 'Az ár kitöltése kötelező'),
  });

  type FormSchemaType = z.infer<typeof productSchema>;

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
    setValue,
  } = useForm<FormSchemaType>({
    defaultValues: {productName: '', productNumber: '', price: ''},
    mode: 'onChange',
    resolver: zodResolver(productSchema),
  });

  const backToProductList = useCallback((): void => navigate(-1), [navigate]);

  const onSubmit = useCallback(
    async (fieldValues: FieldValues): Promise<void> => {
      let modifiedProduct: IProduct;

      if (product?.id) {
        modifiedProduct = {
          ...fieldValues,
          productNumber: parseInt(fieldValues.productNumber.toString(), 10),
          price: parseInt(fieldValues.price.toString(), 10),
          id: product.id,
        } as IProduct;

        if ((await store.dispatch(updateProduct(modifiedProduct))).meta.requestStatus === 'fulfilled') {
          backToProductList();
          ToastAndroid.show('Termék frissítése sikeres', ToastAndroid.LONG);
        } else {
          console.error('Hiba a termék frissítésekor!');
        }
      } else {
        modifiedProduct = {
          ...fieldValues,
          productNumber: parseInt(fieldValues.productNumber.toString(), 10),
          price: parseInt(fieldValues.price.toString(), 10),
        } as IProduct;

        if ((await store.dispatch(createProduct(modifiedProduct))).meta.requestStatus === 'fulfilled') {
          backToProductList();
          ToastAndroid.show('Termék létrehozása sikeres', ToastAndroid.LONG);
        } else {
          console.error('Hiba a termék létrehozásakor!');
        }
      }
    },
    [backToProductList, product],
  );

  const setFormValues = useCallback((): void => {
    if (product) {
      setValue('productName', product.productName);
      setValue('productNumber', product.productNumber.toString());
      setValue('price', product.price.toString());
    }
  }, [product, setValue]);

  useEffect((): void => setFormValues(), [setFormValues]);

  useEffect((): void => {
    (async (): Promise<void> => {
      if (
        !accessToken &&
        !isLoggedIn &&
        (error?.errorAtUpdateProduct?.message?.includes('401') || error?.errorAtCreateProduct?.message?.includes('401'))
      ) {
        navigate('/login');
        store.dispatch(resetProductsErrors);
        setTimeout(() => {
          console.warn('Lejárt munkamenet, jelentkezzen be újra!');
        }, 500);
      }
    })();
  }, [accessToken, isLoggedIn, navigate, error]);

  return (
    <View style={[styles.container]}>
      <Text style={[styles.editorTitle]}>{product ? 'Termék szerkesztő' : 'Új termék felvétele'}</Text>

      <View style={[styles.formContainer]}>
        <View>
          <Text style={[styles.label]}>Terméknév *</Text>
          <Controller
            control={control}
            name="productName"
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                keyboardType={'default'}
                editable={!isLoading}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={[
                  errors.productName ? styles.inputFieldInvalid : styles.inputFieldValid,
                  !errors.productName ? styles.inputFieldBottomMargin : null,
                ]}
              />
            )}
          />
          {errors.productName && <Text style={[styles.warningText]}>{errors.productName.message}</Text>}
        </View>

        <View>
          <Text style={[styles.label]}>Cikkszám *</Text>
          <Controller
            control={control}
            name="productNumber"
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                editable={!isLoading}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType={'number-pad'}
                style={[
                  errors.productNumber ? styles.inputFieldInvalid : styles.inputFieldValid,
                  !errors.productNumber ? styles.inputFieldBottomMargin : null,
                ]}
              />
            )}
          />
          {errors.productNumber && <Text style={[styles.warningText]}>{errors.productNumber.message}</Text>}
        </View>

        <View>
          <Text style={[styles.label]}>Ár *</Text>
          <Controller
            control={control}
            name="price"
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                editable={!isLoading}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType={'number-pad'}
                style={[
                  errors.price ? styles.inputFieldInvalid : styles.inputFieldValid,
                  !errors.price ? styles.inputFieldBottomMargin : null,
                ]}
              />
            )}
          />
          {errors.price && <Text style={[styles.warningText]}>{errors.price.message}</Text>}
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Vissza" onPress={backToProductList} color={'gray'} />
          <Button title="Mentés" onPress={handleSubmit((fieldValues: FieldValues) => onSubmit(fieldValues))} />
        </View>
      </View>
    </View>
  );
};

export default ProductEditor;
