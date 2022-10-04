import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import App from './App';
import store from './store/store';

describe('App render test', (): void => {
  test('App render test', (): void => {
    // Arrange
    render(
      <Provider store={store}>
        <MemoryRouter>
          <App></App>
        </MemoryRouter>
      </Provider>
    );

    // Act
    fireEvent.click(screen.getByPlaceholderText('Jelszó *'));

    // Assert
    expect(screen.getByTestId('container')).toBeTruthy();
  });
});
