import type { CardProps } from '@chakra-ui/react';
import { Box, useStyleConfig } from '@chakra-ui/react';
import React from 'react';

const CardFooter = (props: CardProps): JSX.Element => {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig('CardFooter', { variant });
  // Pass the computed styles into the `__css` prop
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
};

export default CardFooter;
