import React, {useCallback} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useNavigate} from 'react-router-native';
import {logout} from '../../utils/auth-utils';

import {styles} from './Header.styles';

const Header = (): JSX.Element => {
  // const {isLoading, loggedInUser} = useAppSelector<IAuthState>((state: RootState) => state.auth);
  const navigate = useNavigate();
  const email = 'nintendo@lakatos.hu';

  const onPressLogo = useCallback((): void => navigate('/'), [navigate]);
  // const onPressLogout = useCallback((): void => console.log('Logging out...'), []);

  return (
    <View style={styles.headerContainer}>
      <View>
        <TouchableOpacity onPress={onPressLogo}>
          <Image source={require('../../../assets/images/logo.png')} />
        </TouchableOpacity>
      </View>
      <View style={[styles.rightSideContainer]}>
        <View style={[styles.labels]}>
          <Text style={[styles.emailLabel]}>{email}</Text>
          <Text style={[styles.logoutLabel]} onPress={logout}>
            Logout
          </Text>
        </View>
        <View>
          <Image source={require('../../../assets/images/placeholder.jpg')} style={[styles.image]} />
        </View>
      </View>
    </View>
  );
};

export default Header;
