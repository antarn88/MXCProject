import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Navigate, Route, Routes, useNavigate} from 'react-router-native';

import Header from './components/Header/Header';
import {IAuthState} from './interfaces/auth/auth-state.interface';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import ProductEditor from './pages/ProductEditor/ProductEditor';
import {RootState, useAppSelector} from './store/store';
import {hasToken} from './utils/auth-utils';

const App = (): JSX.Element => {
  const {isLoggedIn} = useAppSelector<IAuthState>((state: RootState) => state.auth);
  const [hasTokenInLocalStorage, setHasTokenInLocalStorage] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect((): void => {
    (async (): Promise<void> => {
      setHasTokenInLocalStorage(await hasToken());
    })();
  }, [hasTokenInLocalStorage, navigate]);

  return (
    <View>
      {hasTokenInLocalStorage !== null && (
        <View>
          {/* HEADER */}
          {(isLoggedIn || hasTokenInLocalStorage) && <Header />}

          <Routes>
            {/* LOGIN */}
            <Route path="/login" element={<Login />} />

            {/* PRODUCT EDITOR */}
            <Route path="/:productId" element={<ProductEditor />} />

            {/* HOME */}
            {isLoggedIn || hasTokenInLocalStorage ? (
              <Route path="/" element={<Home />} />
            ) : (
              <Route path="/" element={<Navigate to="/login" />} />
            )}

            {/* OTHER */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </View>
      )}
    </View>
  );
};

export default App;
