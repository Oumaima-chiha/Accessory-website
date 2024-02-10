import { getColor } from 'theme/colors';
import { borderRadius } from 'utils/constant';
import type { StyleConfig } from '@chakra-ui/react';

const defaultStyle = {
  width: '100%',
  boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.08)',
  borderRadius,
  border: `2px solid ${getColor('tertiary', 50)}`,
};

export const CardComponent: Record<string, Record<string, StyleConfig>> = {
  components: {
    CustomCard: {
      baseStyle: {
        p: { base: '30px 10px', sm: '30px', md: '30px', lg: '30px' },
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        position: 'relative',
        minWidth: '0px',
        wordWrap: 'break-word',
        backgroundClip: 'border-box',
        borderRadius,
        gap: 5,
        bg: 'white',
      },
      variants: {
        default: defaultStyle,
      },
      defaultProps: {
        variant: 'default',
      },
    },
  },
};
