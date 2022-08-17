import { render } from '@testing-library/react';
import Header from './Header';

describe('Header render test', () => {
  test('Header render test', async () => {
    render(
      <div>
        <Header />
      </div>
    );
  });
});
