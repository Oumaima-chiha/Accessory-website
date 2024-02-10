import type { StyleConfig } from '@chakra-ui/react';

export const toastStyles: Record<string, Record<string, StyleConfig>> = {
  components: {
    Alert: {
      variants: {
        error: {
          container: {
            bg: 'primary.50',
          },
        },
        success: {
          container: {
            bg: 'senary.50',
          },
        },
        warning: {
          container: {
            bg: 'orange.400',
          },
        },
        info: {
          container: {
            bg: 'orange.100',
          },
        },
      },
    },
  },
};
