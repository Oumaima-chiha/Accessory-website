import { Container } from '@chakra-ui/layout';
import config from 'config/app_config';
import { useAppSelector } from 'hooks/useAppSelector';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, useLocation } from 'react-router';
import LoginForm from './components/LoginForm';

const Authentication = (): JSX.Element => {
  const { state } = useLocation();
  const { i18n } = useTranslation();
  const _isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const redirectionPath = useMemo(
    () => (state?.name ? `/private/${state?.name}` : config.defaultPath),
    [state],
  );

  if (_isAuthenticated) {
    return <Navigate to={redirectionPath} />;
  }
  return (
    <Container
      maxW={'3xl'}
      height="100%"
      display="flex"
      justifyContent={'center'}
      alignItems="center"
      dir={i18n.dir()}>
      <LoginForm />
    </Container>
  );
};

export default Authentication;
