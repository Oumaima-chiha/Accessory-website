import { ChakraProvider } from '@chakra-ui/react';
import type { queries, RenderResult } from '@testing-library/react';
import { render } from '@testing-library/react';
import type { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import theme from 'theme';
const customRender = (
  ui: React.ReactElement,
  options = {},
): RenderResult<typeof queries, HTMLElement, HTMLElement> =>
  render(ui, {
    wrapper: ({ children }) => children,
    ...options,
  });

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
export { customRender as render };

export function renderWithProviders(
  ui: React.ReactElement,
  { store, ...renderOptions },
): RenderResult<typeof queries, HTMLElement, HTMLElement> {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <Provider store={store}>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </Provider>
    );
  }
  return { ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
