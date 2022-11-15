import React, {useCallback} from 'react';
import {Button, Text, TextInput, ToastAndroid, View} from 'react-native';
import {useLocation, useNavigate} from 'react-router-native';
import {FieldValues, useController, useForm} from 'react-hook-form';

import {styles} from './ProductEditor.styles';
import {IProduct} from '../../interfaces/products/product.interface';
import {createProduct, updateProduct} from '../../store/products/products-api';
import store from '../../store/store';

const ProductEditor = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product as IProduct;
  const {control, handleSubmit} = useForm();

  const Input = ({name, inputControl, value, keyboardType}) => {
    const {field} = useController({
      control: inputControl,
      defaultValue: value,
      name,
    });
    return (
      <TextInput
        style={[styles.inputField]}
        value={field.value?.toString()}
        onChangeText={field.onChange}
        keyboardType={keyboardType}
      />
    );
  };

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
          ToastAndroid.show('Hiba a termék frissítésekor', ToastAndroid.LONG);
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
          ToastAndroid.show('Hiba a termék létrehozásakor', ToastAndroid.LONG);
        }
      }
    },
    [backToProductList, product],
  );

  return (
    <View style={[styles.container]}>
      <Text style={[styles.editorTitle]}>{product ? 'Termék szerkesztő' : 'Új termék felvétele'}</Text>

      <View style={[styles.formContainer]}>
        <View>
          <Text style={[styles.label]}>Terméknév *</Text>
          <Input name="productName" inputControl={control} value={product?.productName} keyboardType={'default'} />
        </View>

        <View>
          <Text style={[styles.label]}>Cikkszám *</Text>
          <Input name="productNumber" inputControl={control} value={product?.productNumber} keyboardType={'number-pad'} />
        </View>

        <View>
          <Text style={[styles.label]}>Ár *</Text>
          <Input name="price" inputControl={control} value={product?.price} keyboardType={'number-pad'} />
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
