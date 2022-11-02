import React, {useEffect} from 'react';
import {Alert, Button, Text, TextInput, View} from 'react-native';
import {useParams, useLocation, useNavigate} from 'react-router-native';
import {IProduct} from '../../interfaces/products/product.interface';
import {styles} from './ProductEditor.styles';
import {useController, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import store from '../../store/store';
import {updateProduct} from '../../store/products/products-api';
// import {useLocation} from 'react-router-native';

const ProductEditor = (): JSX.Element => {
  // const {productId} = useParams();
  // const navigate = useHardwareBackButton();
  const nav = useNavigate();
  const location = useLocation();
  const product = location.state as IProduct;

  // navigate;

  const {control, handleSubmit} = useForm();

  // const productSchema = z.object({
  //   productName: z.string().min(1, 'A terméknév kitöltése kötelező'),
  // });

  // type FormSchemaType = z.infer<typeof productSchema>;

  // const {
  //   register,
  //   getValues,
  //   setValue,
  //   reset,
  //   getFieldState,
  //   watch,
  //   formState: {isValid, errors},
  // } = useForm<FormSchemaType>({
  //   mode: 'onChange',
  //   resolver: zodResolver(productSchema),
  // });

  const Input = ({name, inputControl, value, keyboardType}) => {
    const {field} = useController({
      control: inputControl,
      defaultValue: value,
      name,
    });
    return (
      <TextInput
        style={[styles.inputField]}
        value={field.value.toString()}
        onChangeText={field.onChange}
        keyboardType={keyboardType}
      />
    );
  };

  // useEffect((): void => {
  //   setValue('productName', product.productName, {shouldValidate: true});
  //   setValue('productNumber', product.productNumber, {shouldValidate: true});
  //   setValue('productName', product.productName, {shouldValidate: true});
  //   console.log('getValues:', getValues());
  // }, [getValues, product.productName, setValue]);

  const onSubmit = async (updatedProduct): Promise<void> => {
    const modifiedProduct = {
      ...updatedProduct,
      productNumber: parseInt(updatedProduct.productNumber.toString(), 10),
      price: parseInt(updatedProduct.price.toString(), 10),
      id: product.id,
    };

    if (updatedProduct) {
      if ((await store.dispatch(updateProduct(modifiedProduct))).meta.requestStatus === 'fulfilled') {
        console.log('Termék mentése sikeres.');
        nav(-1);
      } else {
        console.log('Termék mentése NEM sikerült!');
      }
    }
  };

  return (
    <View style={[styles.container]}>
      <Text style={[styles.editorTitle]}>Termék szerkesztő</Text>

      <View style={[styles.formContainer]}>
        <View>
          <Text style={[styles.label]}>Terméknév *</Text>
          <Input name="productName" inputControl={control} value={product.productName} keyboardType={'default'} />
        </View>

        <View>
          <Text style={[styles.label]}>Cikkszám *</Text>
          <Input name="productNumber" inputControl={control} value={product.productNumber} keyboardType={'number-pad'} />
        </View>

        <View>
          <Text style={[styles.label]}>Ár *</Text>
          <Input name="price" inputControl={control} value={product.price} keyboardType={'number-pad'} />
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Vissza" onPress={() => nav(-1)} color={'gray'} />
          <Button title="Mentés" onPress={handleSubmit(onSubmit)} />
        </View>
      </View>
    </View>
  );
};

export default ProductEditor;
