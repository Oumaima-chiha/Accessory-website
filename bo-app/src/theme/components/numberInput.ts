import type { StyleConfig } from '@chakra-ui/react';
import { hexToRGB } from 'theme/colors';
import { borderRadius } from 'utils/constant';

export const numberInputStyles: Record<string, Record<string, StyleConfig>> = {
  components: {
    NumberInput: {
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
            fontSize: 'sm',
          },
        },
      },
      variants: {
        outline: {
          field: {
            border: 'none',
            borderRadius: borderRadius,
            bg: hexToRGB('secondary', 0.1),
            color: 'secondary.500',
            textAlign: 'center',
            p: 0,
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
