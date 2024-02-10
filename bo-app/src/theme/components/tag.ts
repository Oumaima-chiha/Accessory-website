import type { StyleConfig } from '@chakra-ui/react';
import { getColor, hexToRGB } from 'theme/colors';
export const tagStyles: Record<string, Record<string, StyleConfig>> = {
  components: {
    Tag: {
      baseStyle: {
        container: {
          color: 'secondary.500',
          bg: hexToRGB('secondary', 0.1),
          py: 3,
          width: 'xs',
          _focus: {
            boxShadow: `0 0 0 1px ${getColor('secondary', 600)}`,
          },
          _hover: {
            boxShadow: `0 0 0 1px ${getColor('secondary', 600)}`,
          },
        },
      },
    },
  },
};
