import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import './index.scss';
import store from './store/store';

// TODO Becsomagolni az Appot, egy komponensbe, ami beállítja az Auth store-t, és kivenni a requestből ezt a funkciót
const root: ReactDOM.Root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
