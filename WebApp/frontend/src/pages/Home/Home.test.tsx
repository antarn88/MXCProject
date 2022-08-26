import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import Home from './Home';
import store from '../../store/store';

describe('Home component test', () => {
  it('Home component test', async () => {
    // Arrange
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    // Act
    fireEvent.click(screen.getByText('Munkatársak'));

    // Assert
    expect(await screen.findByText('Név')).toBeTruthy();
  });
});
