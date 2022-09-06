import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import store from '../../store/store';
import Login from './Login';

describe('Login component test', () => {
  it('Login component test', async () => {
    // Arrange
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    // Act
    fireEvent.click(screen.getByText('Felhasználónév *'));

    // Assert
    expect(await screen.findByPlaceholderText('Jelszó *')).toBeTruthy();
  });
});
