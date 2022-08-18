import { Route, Routes } from 'react-router';

import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';

const App = (): JSX.Element => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8 offset-lg-2 p-2 pt-0">
          <Header />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
