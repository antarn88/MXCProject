import React, {useCallback, useState} from 'react';
import {ActivityIndicator, Button, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useNavigate} from 'react-router-native';
import {IAuthState} from '../../interfaces/auth/auth-state.interface';

import {ILoginResponse} from '../../interfaces/auth/login-response.interface';
import {login} from '../../store/auth/auth-api';
import store, {RootState, useAppSelector} from '../../store/store';
import {setTokenToLocalStorage} from '../../utils/auth-utils';

const Login = (): JSX.Element => {
  const {isLoading} = useAppSelector<IAuthState>((state: RootState) => state.auth);
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onPressLogin = useCallback(async (): Promise<void> => {
    const loginResponse = await store.dispatch(login({username, password}));
    if (loginResponse.meta.requestStatus === 'fulfilled') {
      const loginResponseData = loginResponse.payload as ILoginResponse;
      setTokenToLocalStorage(loginResponseData.content.accessToken || '');
      navigate('/');
    }
  }, [navigate, password, username]);

  return (
    <View style={{padding: 30}}>
      <Text>Felhasználónév *</Text>
      <TextInput style={{borderWidth: 1, marginBottom: 20}} onChangeText={setUsername} />

      <Text>Jelszó *</Text>
      <TextInput style={{borderWidth: 1}} onChangeText={setPassword} secureTextEntry={true} />

      <View style={{marginTop: 20}}>
        {isLoading ? (
          <TouchableOpacity
            onPress={onPressLogin}
            style={{backgroundColor: '#4a8ef1', height: 40, alignContent: 'center', borderRadius: 10}}>
            <ActivityIndicator />
            <Text style={{color: 'white', textAlign: 'center'}}>Belépés...</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={onPressLogin}
            style={{backgroundColor: '#4a8ef1', height: 40, alignContent: 'center', borderRadius: 10}}>
            <Text style={{color: 'white', textAlign: 'center'}}>Belépés</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Login;
