import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Header from './Header';

describe('Header render test with router', () => {
  test('Load header and router for it and click logout button', () => {
    // Arrange
    render(<Header />, { wrapper: MemoryRouter });

    // Act
    fireEvent.click(screen.getByText('Logout'));

    // Assert
    expect(screen.getByRole('button')).toBeTruthy();
  });
});
