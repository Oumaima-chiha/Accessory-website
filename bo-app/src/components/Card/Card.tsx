import type { CardProps } from '@chakra-ui/react';
import { useStyleConfig, forwardRef, Box } from '@chakra-ui/react';

const Card = forwardRef((props: CardProps, ref) => {
  const { variant, ...rest } = props;

  const styles = useStyleConfig('CustomCard', { variant });

  return <Box ref={ref} __css={styles} {...rest} />;
});
Card.displayName = 'CustomCard';

export default Card;
