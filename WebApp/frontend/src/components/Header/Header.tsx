import { Link } from 'react-router-dom';

import './Header.scss';

const Header = (): JSX.Element => {
  const loggedIn = true;
  const loggingOut = false;

  return (
    <div>
      {loggedIn && (
        <div className="header-container px-lg-2 px-1">
          <div className="left-side">
            <Link to="/">
              <img src={'./img/mxc_logo.png'} alt="Logo" />
            </Link>
          </div>
          <div className="right-side">
            <div className="email-section">
              <span className="email">ruszo@lajonerricsi.hu</span>
              {loggingOut ? (
                <span className="logout">Logging out...</span>
              ) : (
                <span className="logout" role="button">
                  Logout
                </span>
              )}
            </div>
            <div className="image-section">
              <img src={'./img/placeholder.jpg'} alt="Placeholder" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
