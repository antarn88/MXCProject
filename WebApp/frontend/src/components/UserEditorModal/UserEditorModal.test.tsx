import { render, fireEvent, screen } from '@testing-library/react';

import { IUser } from '../../interfaces/users/user.interface';
import UserEditorModal from './UserEditorModal';

describe('UserEditorModal render test', () => {
  test('UserEditorModal render test', () => {
    // Arrange
    const mockUser: IUser = {
      id: 999,
      lastname: 'Mityushkin',
      firstname: 'Sonny',
      username: 'smityushkinrq',
      password: 'eiLmGJtX',
      phone: '991-781-6350',
      email: 'smityushkinrq@nytimes.com',
      createdAt: '2022-03-23T01:22:28Z',
    };

    render(
      <UserEditorModal
        incomingUser={mockUser}
        isLoading={false}
        updateUserOutputEvent={() => {}}
        createUserOutputEvent={() => {}}></UserEditorModal>
    );

    // Act
    fireEvent.click(screen.getByText('Vezetéknév *'));

    // Assert
    expect(screen.getByPlaceholderText('Keresztnév *')).toBeTruthy();
  });
});
