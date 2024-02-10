import type { StyleConfig } from '@chakra-ui/react';
import { borderRadius } from 'utils/constant';

export const accordionStyles: Record<string, Record<string, StyleConfig>> = {
  components: {
    Accordion: {
      baseStyle: {
        container: {
          bg: 'white',
          border: 'none',
        },

        button: {
          borderRadius: borderRadius,
          bg: 'rgba(0, 23, 56, 0.02)',
          _expanded: {
            bg: 'transparent',
          },
        },
      },
    },
  },
};
