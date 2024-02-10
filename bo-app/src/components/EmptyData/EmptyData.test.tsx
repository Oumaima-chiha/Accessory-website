import { describe, it } from 'vitest';
import { render, screen } from 'utils/test-utils';
import EmptyData from './EmptyData';
import { BrowserRouter } from 'react-router-dom';
describe('EmptyData', () => {
  it('renders the EmptyData component', () => {
    render(
      <BrowserRouter>
        <EmptyData />
      </BrowserRouter>,
    );
    screen.debug();
  });
});
