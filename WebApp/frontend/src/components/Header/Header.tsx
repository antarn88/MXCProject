import { Link } from 'react-router-dom';

import { logout } from '../../store/auth/auth-api';
import store, { useAppSelector, RootState } from '../../store/store';

import './Header.scss';

const Header = (): JSX.Element => {
  const { isLoading, authData } = useAppSelector((state: RootState) => state.auth);

  const onLogout = async () => await store.dispatch(logout());

  return (
    <div>
      <div className="header-container px-lg-2 px-1">
        <div className="left-side">
          <Link to="/">
            <img src={'./img/mxc_logo.png'} alt="Logo" />
          </Link>
        </div>
        <div className="right-side">
          <div className="email-section">
            <span className="email">{authData.user?.email || localStorage.getItem('email')}</span>
            {isLoading ? (
              <span className="logout">Logging out...</span>
            ) : (
              <span className="logout" role="button" onClick={onLogout}>
                Logout
              </span>
            )}
          </div>
          <div className="image-section">
            <img src={'./img/placeholder.jpg'} alt="Placeholder" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
