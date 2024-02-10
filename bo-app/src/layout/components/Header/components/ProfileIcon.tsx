import { IconButton } from '@chakra-ui/react';
import { Icon } from 'components/Icon';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { profileRoute } from 'utils/constant';

const ProfileIcon = (): JSX.Element => {
  const navigate = useNavigate();
  const onProfileIconClick = (): void => {
    navigate(profileRoute);
  };
  return (
    <IconButton
      w="auto"
      aria-label="sign-button"
      variant={'iconButtonTransparent'}
      onClick={onProfileIconClick}
      icon={<Icon color="secondary.500" displayName="profile" />}
    />
  );
};

export default ProfileIcon;
