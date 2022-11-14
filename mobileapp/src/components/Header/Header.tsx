import React, {useCallback} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useNavigate} from 'react-router-native';
import {IAuthState} from '../../interfaces/auth/auth-state.interface';
import {useAppSelector, RootState} from '../../store/store';
import {logout} from '../../utils/auth-utils';

import {styles} from './Header.styles';

const Header = (): JSX.Element => {
  const {isLoading, loggedInUser} = useAppSelector<IAuthState>((state: RootState) => state.auth);
  const navigate = useNavigate();

  const onPressLogo = useCallback((): void => navigate('/'), [navigate]);

  const onPressLogout = useCallback(async (): Promise<void> => {
    await logout();
    navigate('/login');
  }, [navigate]);

  return (
    <View style={styles.headerContainer}>
      <View>
        <TouchableOpacity onPress={onPressLogo}>
          <Image source={require('../../../assets/images/logo.png')} />
        </TouchableOpacity>
      </View>
      <View style={[styles.rightSideContainer]}>
        <View style={[styles.labels]}>
          <Text style={[styles.emailLabel]}>{loggedInUser?.email}</Text>
          {isLoading ? (
            <Text style={[styles.logoutLabel]} onPress={onPressLogout}>
              Logging out...
            </Text>
          ) : (
            <Text style={[styles.logoutLabel]} onPress={onPressLogout}>
              Logout
            </Text>
          )}
        </View>
        <View>
          <Image source={require('../../../assets/images/placeholder.jpg')} style={[styles.image]} />
        </View>
      </View>
    </View>
  );
};

export default Header;
