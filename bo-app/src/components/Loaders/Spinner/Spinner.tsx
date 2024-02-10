import type { BoxProps } from '@chakra-ui/react';
import { Box, keyframes } from '@chakra-ui/react';
import type { FC } from 'react';

const beat = keyframes`
50% {
    transform:scale(0.75);
    opacity:0.2;
}
100%  {
  transform:scale(1);
  opacity:1;
}
 `;

interface LoaderProps extends BoxProps {
  backDrop?: boolean;
  fullScreen?: boolean;
}

const Loader: FC<LoaderProps> = ({
  backDrop = false,
  fullScreen = false,
  ...props
}) => {
  const animation_1 = beat + ' 1s infinite linear';
  const animation_2 = beat + ' 0.5s infinite linear';
  const animation_3 = beat + ' 0.3s infinite linear';
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      w={fullScreen ? '100vw' : 'full'}
      h={fullScreen ? '100vh' : 'full'}
      zIndex={5}
      {...props}>
      {backDrop && (
        <Box
          bg="blackAlpha.200"
          w="full"
          h="full"
          zIndex={2}
          position="fixed"></Box>
      )}
      <Box
        display="inline-block"
        bg="primary.500"
        w="1.3rem"
        h="1.3rem"
        rounded="full"
        animation={animation_1}></Box>
      <Box
        display="inline-block"
        bg="primary.500"
        w="1.3rem"
        h="1.3rem"
        rounded="full"
        animation={animation_2}></Box>
      <Box
        display="inline-block"
        bg="primary.500"
        w="1.3rem"
        h="1.3rem"
        rounded="full"
        animation={animation_3}></Box>
    </Box>
  );
};

export default Loader;
