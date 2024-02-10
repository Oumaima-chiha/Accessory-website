import React from 'react';
import { Box } from '@chakra-ui/react';
import type { FunctionComponent } from 'react';

interface BackdropProps {
  closeSidebar: () => void;
}
const Backdrop: FunctionComponent<BackdropProps> = ({ closeSidebar }) => {
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      w="100%"
      h="100%"
      bg="blackAlpha.400"
      display="block"
      zIndex="85"
      onClick={closeSidebar}></Box>
  );
};

export default Backdrop;
