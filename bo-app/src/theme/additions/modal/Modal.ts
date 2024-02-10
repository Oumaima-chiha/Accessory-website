import type { StyleConfig } from '@chakra-ui/react';

export const ModalComponent: Record<string, Record<string, StyleConfig>> = {
  components: {
    Modal: {
      baseStyle: {
        dialog: {
          bg: 'white',
          p: 10,
        },
        body: {
          maxHeight: 'calc(100vh - 300px)',
          overflowY: 'auto',
        },
      },
    },
  },
};
