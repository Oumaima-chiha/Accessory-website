import { describe, it } from 'vitest';
import { render, screen } from 'utils/test-utils';
import NotFound from './NotFound';
import { BrowserRouter } from 'react-router-dom';
describe('NotFound', () => {
  it('renders the NotFound component', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>,
    );
    screen.debug();
  });
});
