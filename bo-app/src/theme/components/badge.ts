import type { StyleConfig } from '@chakra-ui/react';
import { getColor, hexToRGB } from 'theme/colors';
import { borderRadius } from 'utils/constant';

const defaultStyles = {
  textTransform: 'capitalize',
  color: 'white',
  fontSize: 15,
  fontWeight: 'normal',
  bg: hexToRGB('secondary', 0.1),
  py: 3,
  px: 3,
  minW: '70px',
  textAlign: 'center',
  width: 'fit-content',
  borderRadius,
  _focus: {
    boxShadow: `0 0 0 1px ${getColor('secondary', 600)}`,
  },
  _hover: {
    boxShadow: `0 0 0 1px ${getColor('secondary', 600)}`,
  },
};

export const badgeStyles: Record<string, Record<string, StyleConfig>> = {
  components: {
    Badge: {
      variants: {
        beauty: defaultStyles,
        inactive: {
          ...defaultStyles,
          bg: 'primary.500',
        },
        active: {
          ...defaultStyles,
          bg: 'senary.500',
        },
        pending: {
          ...defaultStyles,
          bg: 'orange.200',
          color: 'secondary.500',
        },
        processing: {
          ...defaultStyles,
          bg: 'quaternary.500',
          color: 'secondary.500',
        },
      },
      defaultProps: {
        variant: 'beauty',
        colorScheme: 'secondary',
      },
    },
  },
};
