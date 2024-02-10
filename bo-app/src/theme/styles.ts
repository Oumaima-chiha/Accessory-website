import { mode } from '@chakra-ui/theme-tools';
import colors from './colors';
import { baseFontSize } from './foundations/fontSize';

export const globalStyles = {
  colors,
  styles: {
    global: (props): Record<string, any> => ({
      html: {
        fontSize: baseFontSize,
        webkitUserSelect: 'none',
        msUserSelect: 'none',
        userSelect: 'none',
        bg: mode('gray.50', 'gray.800')(props),
        height: '100%',
        width: '100%',
      },
      body: {
        overflow: 'hidden',
        // color: 'secondary.500',
        bg: mode('gray.50', 'gray.800')(props),
        backgroundColor: 'white.500',
      },
    }),
  },
};
