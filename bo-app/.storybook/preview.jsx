import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { themes } from '@storybook/theming';
import theme from '../src/theme';
import { getColor } from '../src/theme/colors';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  darkMode: {
    // Override the default dark theme
    dark: {
      ...themes.dark,
      brandImage: '/logo.png',
      appBg: getColor('secondary'),
      colorPrimary: getColor('secondary'),
      colorSecondary: getColor('secondary'),
      appContentBg: getColor('secondary'),
      barBg: getColor('secondary'),
      inputBg: getColor('secondary'),
    },
  },
  options: {
    storySort: (a, b) =>
      a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
  },
};
export const decorators = [
  Story => (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    </ChakraProvider>
  ),
];
