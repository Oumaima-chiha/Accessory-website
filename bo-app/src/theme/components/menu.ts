import { menuAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
import { hexToRGB } from 'theme/colors';
import { borderRadius } from 'utils/constant';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys);

const baseStyle = definePartsStyle({
  list: {
    p: '10px',
  },
  button: {
    _hover: {
      opacity: 0.8,
    },
  },
  item: {
    borderRadius: borderRadius,
    _hover: {
      bg: hexToRGB('secondary', 0.08),
    },
  },
});
export const menuStyles = {
  components: {
    Menu: defineMultiStyleConfig({ baseStyle }),
  },
};
