import { Route, Routes } from 'react-router';
import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import Header from './components/Header/Header';
import { IAuthState } from './interfaces/auth/auth-state.interface';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import { useAppSelector, RootState } from './store/store';
import { hasToken } from './utils/auth-utils';

const App = () => {
  const { isLoggedIn } = useAppSelector<IAuthState>((state: RootState) => state.auth);

  return (
    <div className="container" data-testid="container">
      <div className="row">
        <div className="col-lg-8 offset-lg-2 p-2 pt-0">
          {/* HEADER */}
          {(isLoggedIn || hasToken()) && (
            <div className="sticky-top">
              <Header />
            </div>
          )}

          {/* ROUTES */}
          <Routes>
            {/* HOME */}
            {isLoggedIn || hasToken() ? (
              <Route path="/" element={<Home />}></Route>
            ) : (
              <Route path="/" element={<Navigate to="/login" />}></Route>
            )}

            {/* LOGIN PAGE */}
            <Route path="/login" element={<Login />}></Route>

            {/* OTHER */}
            <Route path="*" element={<Navigate to="/" />}></Route>
          </Routes>
          <ToastContainer
            hideProgressBar={true}
            position={toast.POSITION.TOP_RIGHT}
            draggable={false}
            closeOnClick={false}
            theme="colored"
            autoClose={3000}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
