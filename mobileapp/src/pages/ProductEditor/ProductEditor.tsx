import React from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import {useLocation, useNavigate} from 'react-router-native';
import {useController, useForm} from 'react-hook-form';

import {styles} from './ProductEditor.styles';
import {IProduct} from '../../interfaces/products/product.interface';
import store from '../../store/store';
import {createProduct, updateProduct} from '../../store/products/products-api';

const ProductEditor = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state as IProduct;

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

  const onSubmit = async (updatedProduct): Promise<void> => {
    let modifiedProduct: IProduct;

    if (product?.id) {
      modifiedProduct = {
        ...updatedProduct,
        productNumber: parseInt(updatedProduct.productNumber.toString(), 10),
        price: parseInt(updatedProduct.price.toString(), 10),
        id: product.id,
      } as IProduct;

      if ((await store.dispatch(updateProduct(modifiedProduct))).meta.requestStatus === 'fulfilled') {
        console.log('Termék mentése sikeres.');
        navigate(-1);
      } else {
        console.log('Termék mentése NEM sikerült!');
      }
    } else {
      modifiedProduct = {
        ...updatedProduct,
        productNumber: parseInt(updatedProduct.productNumber.toString(), 10),
        price: parseInt(updatedProduct.price.toString(), 10),
      } as IProduct;

      if ((await store.dispatch(createProduct(modifiedProduct))).meta.requestStatus === 'fulfilled') {
        console.log('Termék létrehozása sikeres.');
        navigate(-1);
      } else {
        console.log('Termék létrehozása NEM sikerült!');
      }
    }
  };

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
          <Button title="Vissza" onPress={() => navigate(-1)} color={'gray'} />
          <Button title="Mentés" onPress={handleSubmit(onSubmit)} />
        </View>
      </View>
    </View>
  );
};

export default ProductEditor;
