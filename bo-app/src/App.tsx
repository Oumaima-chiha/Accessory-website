import { ChakraProvider, Container } from '@chakra-ui/react';
import RtlProvider from 'components/RtlProvider';
import { useAppSelector } from 'hooks';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { login } from 'modules/Authentication/redux';
import { useEffect, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { RouterProvider } from 'react-router-dom';
import themes from 'theme';
import { getCookie } from 'utils/functions';
import AppRoutes from './routes/index';

const App = (): JSX.Element => {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const themeExtended = themes('ltr');

  useEffect(() => {
    i18n.changeLanguage(getCookie('lang') ?? 'en');
  }, [i18n]);

  useLayoutEffect(() => {
    if (isAuthenticated) {
      dispatch(login());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <ChakraProvider theme={themeExtended}>
      <RtlProvider>
        <Container h="100vh" minWidth="100%">
          <RouterProvider router={AppRoutes} />
        </Container>
      </RtlProvider>
    </ChakraProvider>
  );
};

export default App;
