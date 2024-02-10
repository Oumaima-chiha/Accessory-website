import type { StyleConfig } from '@chakra-ui/react';

export const CardHeaderComponent: Record<
  string,
  Record<string, StyleConfig>
> = {
  components: {
    CardHeader: {
      baseStyle: {
        display: 'flex',
        flexDir: 'column',
        width: '100%',
        // pt: 10,
        // px: 10,
      },
    },
  },
};
