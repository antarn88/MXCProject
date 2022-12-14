import { render, fireEvent, screen } from '@testing-library/react';

import ConfirmDeleteModal from './ConfirmDeleteModal';

describe('Confirm delete modal render test', (): void => {
  test('Confirm delete modal render test', (): void => {
    // Arrange
    render(<ConfirmDeleteModal isLoading={false} deleteUserOutputEvent={() => {}}></ConfirmDeleteModal>);

    // Act
    fireEvent.click(screen.getByText('Biztosan törli a munkatársat?'));

    // Assert
    expect(screen.getByTestId('accept-button')).toBeTruthy();
  });
});
