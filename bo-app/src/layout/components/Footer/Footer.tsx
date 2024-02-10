// Core Imports
import { memo } from 'react';

// Theme Imports
import { Flex, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';

//Assets Imports
import { useTranslation } from 'react-i18next';

const Footer = (): JSX.Element => {
  const { t, i18n } = useTranslation('common');
  const currentYear = new Date().getUTCFullYear();
  return (
    <Flex
      as={motion.div}
      position="fixed"
      bottom="0"
      right="0"
      zIndex="9"
      bg={'gray.100'}
      transition="0.5s ease-in-out"
      dir={i18n.dir()}
      w="100%">
      <Flex
        gap={{ base: 5, lg: 20 }}
        justifyContent="center"
        alignItems="center"
        w="100%"
        p={1}>
        <Text color="secondary.500">
          © {currentYear} {t('footer')}
        </Text>
      </Flex>
    </Flex>
  );
};

export default memo(Footer);
