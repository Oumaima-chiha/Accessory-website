import _404 from 'assets/images/404.png';
import { Link as RouterLink } from 'react-router-dom';
import config from 'config/app_config';

// Customization state
import { Box, Container, Image, styled, Text, Button } from '@chakra-ui/react';
import type { IRootState } from 'app/store/reducer';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

const RootStyle = styled('div', {
  baseStyle: {
    display: 'flex',
    minHeight: '100%',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: 'white',
  },
});

// ----------------------------------------------------------------------

const NotFound = (): JSX.Element => {
  const _isAuthenticated = useSelector(
    (state: IRootState) => state.auth.isAuthenticated,
  );
  const { t } = useTranslation('common');
  return (
    <RootStyle title="404 Page Not Found">
      <Container minW={'100%'}>
        <Image
          src={_404}
          alt="404 Not Found"
          sx={{
            height: 450,
            mx: 'auto',
          }}
        />
        <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
          <Text variant="h3">{t('page_not_found')}</Text>
          <Text sx={{ color: 'black', mb: 5 }}>
            {t('page_not_found_description')}
          </Text>
          <Button
            as={RouterLink}
            to={_isAuthenticated ? config.defaultPath : config?.loginPath}>
            {t('back')}
          </Button>
        </Box>
      </Container>
    </RootStyle>
  );
};

export default NotFound;
