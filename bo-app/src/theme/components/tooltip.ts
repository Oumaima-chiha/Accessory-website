import type { StyleConfig } from '@chakra-ui/react';
import { getColor } from 'theme/colors';
import { borderRadius } from 'utils/constant';

export const tooltipStyles: Record<string, Record<string, StyleConfig>> = {
  components: {
    Tooltip: {
      baseStyle: {
        // bg: 'secondary.200',
        fontSize: 16,
        bg: 'gray.300',
        color: 'secondary.900',
        borderRadius: borderRadius,
        textTransform: 'capitalize',
        '--popper-arrow-bg': getColor('gray', 300),
      },
    },
  },
};
