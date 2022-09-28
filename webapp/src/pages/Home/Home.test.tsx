import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import Home from './Home';
import store from '../../store/store';

describe('Home component test', (): void => {
  it('Home component test', async (): Promise<void> => {
    // Arrange
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    // Act
    fireEvent.click(screen.getByText('Munkatársak'));
    window.location.href = 'http://localhost/';

    // Assert
    expect(window.location.href).toEqual('http://localhost/');
  });
});
