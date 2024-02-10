import { Avatar, Flex, Text } from '@chakra-ui/react';
import AvatarImage from 'assets/images/avatar.png';
import { useAppSelector } from 'hooks';

const ProfileAvatarHeader = (): JSX.Element => {
  const userSelector = useAppSelector(state => state.auth.user);
  return (
    <Flex
      borderRadius="20px"
      w={{ base: '315px', md: '345px' }}
      alignItems="center"
      direction="column">
      <Flex flexDirection="column" mb="30px">
        <Avatar
          borderWidth="2px"
          mx="auto"
          borderColor={'primary.500'}
          size="xl"
          borderRadius="50%"
          src={AvatarImage}
        />
        <Text
          fontWeight="600"
          color={'secondary.500'}
          textAlign="center"
          fontSize="xl">
          {`${userSelector?.firstname} ${userSelector?.lastname}`}
        </Text>
        <Text
          color={'secondary.500'}
          textAlign="center"
          fontSize="sm"
          fontWeight="500">
          {userSelector?.role?.name}
        </Text>
      </Flex>
    </Flex>
  );
};

export default ProfileAvatarHeader;
