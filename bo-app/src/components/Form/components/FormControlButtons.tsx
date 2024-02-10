import { Button, HStack } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { tertiaryBgGradient } from 'utils/constant';

interface FormControlButtonsProps {
  isLoading: boolean;
}

const FormControlButtons: React.FC<FormControlButtonsProps> = ({
  isLoading,
}): React.ReactElement => {
  const { t } = useTranslation(['common']);
  return (
    <HStack alignSelf="center">
      <Button alignSelf="center" type="submit" isLoading={isLoading}>
        {t('submit')}
      </Button>
      <Button alignSelf="center" type="reset" bgGradient={tertiaryBgGradient}>
        {t('reset')}
      </Button>
    </HStack>
  );
};

export default FormControlButtons;
