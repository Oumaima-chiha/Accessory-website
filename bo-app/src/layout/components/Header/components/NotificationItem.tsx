// chakra imports
import { Avatar, Flex, Text } from '@chakra-ui/react';
import { Icon } from 'components/Icon';
import React from 'react';

const NotificationItem = (props: any): JSX.Element => {
  return (
    <>
      <Avatar
        name={props.aName}
        src={props.aSrc}
        borderRadius="12px"
        me="16px"
      />
      <Flex flexDirection="column">
        <Text fontSize="md" mb="5px">
          <Text fontWeight="bold" fontSize="md" as="span" mr={1}>
            {props.boldInfo}
          </Text>
          {props.info}
        </Text>
        <Flex alignItems="center">
          <Icon displayName="notification" w="13px" h="13px" me="3px" />
          <Text fontSize="xs" lineHeight="100%" alignSelf={'flex-end'}>
            {props.time}
          </Text>
        </Flex>
      </Flex>
    </>
  );
};

export default NotificationItem;
