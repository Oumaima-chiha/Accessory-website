// import { useAppDispatch } from 'hooks/useAppDispatch';
// import { logout } from '@symptoms-checker/auth';
import { Button, IconButton, styled, Text, Tooltip } from '@chakra-ui/react';
import type { IRootState } from 'app/store/reducer';
import { Icon } from 'components/Icon';
import config from 'config/app_config';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { logout } from 'modules/Authentication/redux';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CapitalizedButton = styled(Button, {
  baseStyle: {
    textTransform: 'uppercase',
    width: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: 2,
  },
});

const SignButton = (): JSX.Element => {
  const { t, i18n } = useTranslation('common');
  const _isAuthenticated = useSelector(
    (state: IRootState) => state.auth.isAuthenticated,
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function onSignButtonClick(): void {
    dispatch(logout());
    navigate(config.loginPath);
  }
  return (
    <Tooltip label={_isAuthenticated ? t('logout') : ''}>
      {_isAuthenticated ? (
        <IconButton
          bg="transparent"
          w="auto"
          aria-label="sign-button"
          variant={'iconButtonTransparent'}
          onClick={onSignButtonClick}
          icon={<Icon color="secondary.500" displayName="logout" />}
        />
      ) : (
        <CapitalizedButton bg="primary.500" onClick={onSignButtonClick}>
          <Text color="white" ml={2}>
            {t('login')}
          </Text>
          <Icon
            transform={i18n?.dir() === 'rtl' ? 'scaleX(-1)' : 'scaleX(1)'}
            width={'17px'}
            color="white"
            displayName="login"
          />
        </CapitalizedButton>
      )}
    </Tooltip>
  );
};

export default SignButton;
