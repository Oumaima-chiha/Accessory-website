import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  Divider,
  Flex,
  HStack,
  IconButton,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';

import type { IRootState } from 'app/store/reducer';
import { motion } from 'framer-motion';
import type { FunctionComponent } from 'react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { hexToRGB } from 'theme/colors';
import { boxShadow } from 'utils/constant';
import Language from './components/Language';
import Notifications from './components/Notifications';
import ProfileIcon from './components/ProfileIcon';
import SignButton from './components/SignButton';
interface NavbarProps {
  toggleSideBar?: () => void;
  sideBarWidth: number;
  sideToggled?: boolean;
}

const Navbar: FunctionComponent<NavbarProps> = ({
  toggleSideBar,
  sideBarWidth,
  sideToggled,
}) => {
  const { i18n } = useTranslation('common');
  const [isNotLarge] = useMediaQuery('(max-width: 59.9em)');
  const userSelector = useSelector((state: IRootState) => state.auth.user);
  return (
    <Box
      as={motion.div}
      position="fixed"
      top="0"
      right="0"
      zIndex={isNotLarge ? '89' : sideToggled ? '91' : '51'}
      bg="white"
      dir={i18n.dir()}
      backdropFilter="auto"
      backdropBlur="15px"
      borderBottom="1px solid #C7C7D280"
      boxShadow={boxShadow}
      borderRadius={7}
      transition={sideToggled ? '0.4s ease-in-out' : '0.1s ease-in-out'}
      w={{ base: '100%', lg: `calc(100% - ${sideBarWidth + 5}px)` }}>
      <Flex
        alignItems="center"
        justifyContent={'space-between'}
        py="1.2rem"
        px="1rem">
        {isNotLarge && (
          <Flex alignItems="center">
            <IconButton
              px={5}
              variant="iconButtonTransparent"
              bg="transparent"
              onClick={toggleSideBar}
              color="primary.500"
              fontSize="fs-25"
              icon={<HamburgerIcon />}
              aria-label={'menu-sidebar'}
              w="auto"
            />
          </Flex>
        )}
        <HStack
          gap="0.5rem"
          color="gray.500"
          alignItems="center"
          w="100%"
          justifyContent={{
            base: 'space-between',
            md: 'space-between',
            sm: 'flex-end',
          }}
          display={'flex'}>
          <Text fontWeight="bold" fontSize="lg">
            {i18n.t('welcome', { user: userSelector?.firstname })}
          </Text>
          <HStack flex={1} h="30px" gap={15} w="100%" justifyContent="flex-end">
            <Language i18n={i18n} />
            <Divider
              borderColor={hexToRGB('secondary', 0.2)}
              orientation="vertical"
            />
            <SignButton />
            <Notifications />
            <ProfileIcon />
          </HStack>
        </HStack>
      </Flex>
    </Box>
  );
};

export default memo(Navbar);
