import type { StyleConfig } from '@chakra-ui/react';
import { hexToRGB } from 'theme/colors';
import { borderRadius } from 'utils/constant';

export const radioStyles: Record<string, Record<string, StyleConfig>> = {
  components: {
    Radio: {
      variants: {
        primary: {
          control: {
            _checked: {
              borderColor: 'primary.500',
              color: 'primary.500',
            },
            _focus: {
              boxShadow: 'none',
            },
          },
          container: {
            bg: hexToRGB('secondary', 0.03),
            py: 5,
            px: 10,
            w: '100%',
            borderRadius,
          },
        },
        'no-style': {
          control: {
            _checked: {
              borderColor: 'primary.500',
              borderWidth: 0.5,
              color: 'primary.500',
              '::before': {
                boxShadow: '0px 3px 4.5px rgba(112, 1, 36, 0.2)',
              },
            },

            _focus: {
              boxShadow: 'none',
            },
          },
          container: {
            bg: 'transparent',
            w: '100%',
            borderRadius,
          },
        },
        'with-content': props => ({
          ...props,
          container: {
            ...props.container,
            borderRadius: borderRadius,
            borderWidth: 1,
            borderColor: hexToRGB('secondary', 0.1),
            p: 5,
            bg: hexToRGB('secondary', 0.02),
            _checked: {
              bg: hexToRGB('primary', 0.01),
              borderWidth: 1,
              borderColor: 'primary.500',
            },
            _hover: {
              borderWidth: 1,
              borderColor: 'primary.500',
              cursor: 'pointer',
            },
          },
          control: {
            display: 'none',
          },
        }),
      },
      defaultProps: {
        variant: 'primary',
        colorScheme: 'transparent',
      },
      baseStyle: {
        control: {
          borderRadius: 12,
        },
      },
    },
  },
};
