import { describe, it } from 'vitest';
import { render, screen } from 'utils/test-utils';
import AccessDenied from './AccessDenied';
import { BrowserRouter } from 'react-router-dom';
describe('AccessDenied', () => {
  it('renders the AccessDenied component', () => {
    render(
      <BrowserRouter>
        <AccessDenied />
      </BrowserRouter>,
    );
    screen.debug();
  });
});
