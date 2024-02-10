import type { StyleConfig } from '@chakra-ui/react';
import { hexToRGB } from 'theme/colors';
import {
  borderRadius,
  rtlDirection,
  secondaryBgGradient,
  tertiaryBgGradient,
} from 'utils/constant';

export const buttonStyles: Record<string, Record<string, StyleConfig>> = {
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
        color: 'white',
        width: '97px',
        pt: 1,
        borderRadius: borderRadius,
        _loading: {
          _hover: {
            opacity: 0.4,
            bg: 'secondary.500',
            cursor: 'not-allowed',
          },
        },
        _disabled: {
          _hover: {
            opacity: 0.4,
            bg: 'secondary.500',
            cursor: 'not-allowed',
          },
        },
      },
      sizes: {
        xl: {
          h: '56px',
          fontSize: 'lg',
          px: '32px',
        },
        md: {
          h: '40px',
        },
        sm: {
          h: '40px',
          w: '100px',
          fontSize: 'md',
        },
        xs: {
          h: '30px',
          w: '100px',
          fontSize: 'md',
        },
      },
      variants: {
        iconButton: {
          bg: 'secondary.500',
          '> svg': {
            fontSize: '2xl',
            color: 'white',
          },
          w: '40px',
          _hover: {
            opacity: 0.6,
          },
        },
        iconButtonTransparent: {
          bg: 'transparent',
          // transform={i18n?.dir() === 'rtl' ? 'scaleX(-1)' : 'scaleX(1)'}
          transform: rtlDirection === 'rtl' ? 'scaleX(-1)' : 'scaleX(1)',
          _hover: {
            bg: hexToRGB('tertiary', 0.2),
          },
          _loading: {
            _hover: {
              opacity: 0.4,
              cursor: 'not-allowed',
              bg: 'transparent',
            },
          },
        },
        'with-shadow': {
          bg: 'secondary.100',
          boxShadow: '0 0 2px 2px #efdfde',
        },
        default: {
          bgGradient: secondaryBgGradient,
          fontSize: 'md',
          width: '200px',
          _hover: {
            opacity: 0.8,
            color: 'white',
          },
        },
        gold: {
          bgGradient: tertiaryBgGradient,
          fontSize: 'md',
          width: '98px',
          _hover: {
            opacity: 0.8,
            color: 'white',
          },
        },
        goldenGradientIconBtn: {
          bgGradient: tertiaryBgGradient,
          fontSize: 'md',
          width: 'auto',
          px: '2 !important',
          _hover: {
            opacity: 0.8,
            color: 'white',
          },
        },
        gradientIconBtn: {
          bgGradient: secondaryBgGradient,
          fontSize: 'md',
          width: 'auto',
          px: '2 !important',
          _hover: {
            opacity: 0.8,
            color: 'white',
          },
        },
        outline: {
          bg: 'transparent',
          fontSize: 'md',
          width: '100px',
          _hover: {
            opacity: 0.8,
            color: 'white',
          },
        },
      },
      defaultProps: {
        variant: 'default',
        colorScheme: 'secondary',
      },
    },
  },
};
