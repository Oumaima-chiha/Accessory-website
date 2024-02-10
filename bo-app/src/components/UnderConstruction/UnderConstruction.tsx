import { useNavigate } from 'react-router-dom';
import UnderConstructionSvg from 'assets/images/svg/under_construction.svg';

// Customization state
import { Box, Container, Image, styled, Text, Button } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import config from 'config/app_config';
import type { IRootState } from 'app/store/reducer';
import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

const RootStyle = styled('div', {
  baseStyle: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    backgroundColor: 'white',
  },
});

// ----------------------------------------------------------------------

const UnderConstruction = (): JSX.Element => {
  const navigate = useNavigate();
  const { t } = useTranslation('common');
  const _isAuthenticated = useSelector(
    (state: IRootState) => state.auth.isAuthenticated,
  );
  return (
    <RootStyle title="Under Construction">
      <Container>
        <Image
          src={UnderConstructionSvg}
          alt="Under Construction"
          sx={{
            mx: 'auto',
          }}
        />
        <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center', mt: 5 }}>
          <Text sx={{ color: 'black', mb: 5 }}>{t('under_construction')}</Text>
          <Button
            onClick={(): void =>
              navigate(
                _isAuthenticated ? config.defaultPath : config?.publicDashboard,
              )
            }>
            {t('back')}
          </Button>
        </Box>
      </Container>
    </RootStyle>
  );
};

export default UnderConstruction;
