import { describe, it } from 'vitest';
import { render, screen } from 'utils/test-utils';
import UnderConstruction from './UnderConstruction';
import { BrowserRouter } from 'react-router-dom';
describe('NotFound', () => {
  it('renders the NotFound component', () => {
    render(
      <BrowserRouter>
        <UnderConstruction />
      </BrowserRouter>,
    );
    screen.debug();
  });
});
