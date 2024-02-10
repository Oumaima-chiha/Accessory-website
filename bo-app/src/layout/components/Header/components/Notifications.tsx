import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { Icon } from 'components/Icon';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { hexToRGB } from 'theme/colors';
import { borderRadius } from 'utils/constant';
import { notificationsMock } from '../extra/mock';
import NotificationItem from './NotificationItem';

const Notifications = (): JSX.Element => {
  const [notifyBadge, displayNotifyBadge] = useState(true);
  const { i18n } = useTranslation();

  function clearNotifications(): void {
    displayNotifyBadge(false);
  }

  return (
    <Menu onClose={clearNotifications}>
      <MenuButton
        borderRadius={borderRadius}
        _hover={{ bg: hexToRGB('tertiary', 0.2) }}>
        <Flex pos="relative" p={2}>
          <Icon displayName="notification" color="secondary.500" />
          {notifyBadge && (
            <Box
              w="7px"
              h="7px"
              position="absolute"
              right="10px"
              bg="#CE0E2D"
              boxShadow={'0px 2px 2px rgba(206, 14, 45, 0.1)'}
              borderRadius="full"
            />
          )}
        </Flex>
      </MenuButton>
      <MenuList p="16px 8px">
        <Flex flexDirection="column">
          {notificationsMock.map((notification, index) => (
            <MenuItem
              key={index}
              borderRadius="8px"
              mb="10px"
              bg={notifyBadge ? 'gray.100' : 'none'}>
              <NotificationItem
                time={notification.time[i18n.language]}
                info={notification.sub_title[i18n.language]}
                boldInfo={notification.title[i18n.language]}
                aName="Alicia"
                aSrc={''}
              />
            </MenuItem>
          ))}
        </Flex>
      </MenuList>
    </Menu>
  );
};

export default Notifications;
