import type { StyleConfig } from '@chakra-ui/react';
import { hexToRGB } from 'theme/colors';
import { borderRadius } from 'utils/constant';

export const inputStyles: Record<string, Record<string, StyleConfig>> = {
  components: {
    Input: {
      baseStyle: {
        field: {
          fontWeight: 400,
          width: '100%',
        },
      },
      sizes: {
        sm: {
          field: {
            w: '20%',
          },
        },
      },
      variants: {
        outline: {
          field: {
            border: 'none',
            borderRadius: borderRadius,
            bg: hexToRGB('secondary', 0.1),
            fontSize: '16px',
            color: 'secondary.500',
            _focus: {
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: 'secondary.500',
              boxShadow: 'none',
            },
          },
        },
      },
      defaultProps: {
        variant: 'outline',
      },
    },
  },
};
