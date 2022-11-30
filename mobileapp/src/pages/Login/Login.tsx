import React, {useCallback} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {ActivityIndicator, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useNavigate} from 'react-router-native';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {IAuthState} from '../../interfaces/auth/auth-state.interface';
import {ILoginRequest} from '../../interfaces/auth/login-request.interface';
import {ILoginResponse} from '../../interfaces/auth/login-response.interface';
import {login} from '../../store/auth/auth-api';
import store, {RootState, useAppSelector} from '../../store/store';
import {setTokenToLocalStorage} from '../../utils/auth-utils';
import {styles} from './Login.styles';

const Login = (): JSX.Element => {
  const {isLoading, error} = useAppSelector<IAuthState>((state: RootState) => state.auth);
  const navigate = useNavigate();

  const loginSchema = z.object({
    username: z.string().min(1, 'A felhasználónév kitöltése kötelező'),
    password: z.string().min(1, 'A jelszó kitöltése kötelező'),
  });

  type FormSchemaType = z.infer<typeof loginSchema>;

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm<FormSchemaType>({
    defaultValues: {username: '', password: ''},
    mode: 'onChange',
    resolver: zodResolver(loginSchema),
  });

  const onPressLogin = useCallback(
    async (loginData: ILoginRequest): Promise<void> => {
      const loginResponse = await store.dispatch(login(loginData));
      if (loginResponse.meta.requestStatus === 'fulfilled') {
        const loginResponseData = loginResponse.payload as ILoginResponse;
        setTokenToLocalStorage(loginResponseData.content.accessToken || '');
        navigate('/');
      }
    },
    [navigate],
  );

  return (
    <View style={[styles.mainContainer]}>
      {/* LOGIN LABEL */}
      <Text style={[styles.loginLabel]}>
        <MaterialCommunityIcons name="login" size={25} color={'#485FFB'} />
        <Text> Bejelentkezés</Text>
      </Text>

      <View style={[styles.loginFormContainer]}>
        {/* ERROR MESSAGE BOX */}
        {!isLoading && error && (
          <View style={[styles.errorMessageContainer]}>
            <MaterialCommunityIcons name="alert" size={25} style={[styles.errorMessageIcon]} />
            {error.code === 'ERR_BAD_REQUEST' ? (
              <View style={[styles.errorMessageTextContainer]}>
                <Text style={[styles.errorMessageText]}>Hibás felhasználónév vagy jelszó!</Text>
              </View>
            ) : (
              <View style={[styles.errorMessageTextContainer]}>
                <Text style={[styles.errorMessageText]}>A szerver nem elérhető!</Text>
              </View>
            )}
          </View>
        )}

        {/* USERNAME */}
        <View style={[styles.usernameContainer]}>
          <Text>Felhasználónév *</Text>
          <Controller
            control={control}
            name="username"
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                autoFocus={true}
                editable={!isLoading}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={[errors.username ? styles.inputFieldInvalid : styles.inputFieldValid]}
              />
            )}
          />
          {errors.username && <Text style={[styles.warningText]}>{errors.username.message}</Text>}
        </View>

        {/* PASSWORD */}
        <View>
          <Text>Jelszó *</Text>
          <Controller
            control={control}
            name="password"
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                secureTextEntry={true}
                editable={!isLoading}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={[errors.password ? styles.inputFieldInvalid : styles.inputFieldValid]}
              />
            )}
          />
          {errors.password && <Text style={[styles.warningText]}>{errors.password.message}</Text>}
        </View>

        {/* LOGIN BUTTON */}
        <View style={[styles.loginButtonContainer]}>
          {isLoading ? (
            <TouchableOpacity style={[styles.loginButtonDisabled]} disabled={true}>
              <View style={[styles.loginButtonContent]}>
                <ActivityIndicator style={[styles.spinner]} color="white" size="small" />
                <Text style={[styles.loginButtonText]}>Bejelentkezés...</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleSubmit(onPressLogin)}
              style={[isValid ? styles.loginButton : styles.loginButtonDisabled]}
              disabled={!isValid}>
              <View style={[styles.loginButtonContent]}>
                <Text style={[styles.loginButtonText]}>Bejelentkezés</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default Login;
