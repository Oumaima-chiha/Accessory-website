import React from 'react';

import { Box, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { hexToRGB } from 'theme/colors';

const ProgressBar = ({
  value,
  height,
  borderRadius,
  color,
  width = '100%',
  totalSteps = 4,
  isHorizontal = false,
}): JSX.Element => {
  return (
    <Box
      height={isHorizontal ? 1.5 : height}
      width={isHorizontal ? width : 1.5}
      borderRadius={borderRadius}
      backgroundColor={hexToRGB('secondary', 0.1)}
      position="relative">
      <motion.span
        style={{
          ...(isHorizontal ? { height: 5 } : { width: 5 }),
          backgroundColor: color,
          borderRadius,
          position: 'absolute',
          left: 0,
          top: 0,
        }}
        animate={
          isHorizontal ? { width: `${value}%` } : { height: `${value}%` }
        }
        transition={{
          duration: 0.5,
          ease: 'backInOut',
          bounce: true,
        }}
      />
      {isHorizontal && (
        <Text
          pos="absolute"
          top={'-20px'}
          right={0}
          dir="ltr"
          color="primary.500"
          fontWeight="bold"
          textAlign="end">
          {Math.ceil((value / 100) * totalSteps)} / {totalSteps}
        </Text>
      )}
    </Box>
  );
};

export default ProgressBar;
