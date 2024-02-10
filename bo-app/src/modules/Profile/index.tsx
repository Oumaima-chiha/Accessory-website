import { Container } from '@chakra-ui/react';
import ProfileDataForm from './components/ProfileDataForm';

const ProfileContainer = (): JSX.Element => {
  return (
    <Container minW="80%">
      <ProfileDataForm />
    </Container>
  );
};

export default ProfileContainer;
