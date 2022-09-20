import { Link } from 'react-router-dom';

import { IAuthState } from '../../interfaces/auth/auth-state.interface';
import { useAppSelector, RootState } from '../../store/store';
import { logout } from '../../utils/auth-utils';
import './Header.scss';

const Header = (): JSX.Element => {
  const { isLoading, loggedInUser } = useAppSelector<IAuthState>((state: RootState) => state.auth);

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
            <span className="email">{loggedInUser?.email || localStorage.getItem('email')}</span>
            {isLoading ? (
              <span className="logout" role="button">
                Logging out...
              </span>
            ) : (
              <span className="logout" role="button" onClick={logout}>
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
