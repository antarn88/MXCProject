import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import Header from './Header';
import store from '../../store/store';

describe('Header render test with router', () => {
  test('Load header and router for it and click logout button', () => {
    // Arrange
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    // Act
    fireEvent.click(screen.getByText('Logout'));

    // Assert
    expect(screen.getByRole('button')).toBeTruthy();
  });
});
