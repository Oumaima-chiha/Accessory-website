import type { StyleConfig } from '@chakra-ui/react';

export const CardBodyComponent: Record<string, Record<string, StyleConfig>> = {
  components: {
    CardBody: {
      baseStyle: {
        display: 'flex',
        width: '100%',
        borderRadius: 50,
      },
    },
  },
};
