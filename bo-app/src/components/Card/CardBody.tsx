import React from 'react';
import type { CardProps } from '@chakra-ui/react';
import { Box, useStyleConfig } from '@chakra-ui/react';

const CardBody = (props: CardProps): JSX.Element => {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig('CardBody', { variant });
  // Pass the computed styles into the `__css` prop
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
};

export default CardBody;
