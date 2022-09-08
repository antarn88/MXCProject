import { render, fireEvent, screen } from '@testing-library/react';

import Loading from './Loading';

describe('Loading component test', () => {
  test('Loading component test', async () => {
    // Arrange
    const loadingText = 'Loading...';
    render(<Loading loadingText={loadingText} />);

    // Act
    fireEvent.click(await screen.findByText(loadingText));

    // Assert
    expect(screen.getAllByTestId('loading-screen')).toBeTruthy();
  });
});
