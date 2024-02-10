import type { StyleConfig } from '@chakra-ui/react';
import { hexToRGB } from 'theme/colors';

export const CardFooterComponent: Record<
  string,
  Record<string, StyleConfig>
> = {
  components: {
    CardFooter: {
      baseStyle: {
        display: 'flex',
        flexDir: 'column',
        width: '100%',
        pt: 10,
      },
      variants: {
        withDivider: {
          borderTopWidth: '1px',
          borderTopColor: hexToRGB('secondary', 0.3),
        },
      },
    },
  },
};
