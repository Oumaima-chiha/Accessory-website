import { HStack } from '@chakra-ui/react';
import type { FormControlInputProps } from 'components/Form/components/FormControlInput';
import FormControlInput from 'components/Form/components/FormControlInput';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface RangeFormInputsProps extends FormControlInputProps {
  range: number[];
}

const excludedKeys = ['e', '+', '-', '*', '.'];

const RangeFormInputs: React.FC<RangeFormInputsProps> = (
  props,
): React.ReactElement => {
  const { formik, onChange, label, range } = props;
  const { t } = useTranslation(['fields']);
  return (
    <HStack>
      <FormControlInput
        formik={formik}
        name={'min'}
        placeholder={range[0] !== null ? t('min') : ''}
        onChange={onChange}
        label={label}
        type="number"
        onKeyDown={(e): void => {
          if (excludedKeys?.includes(e?.key)) {
            return e?.preventDefault();
          }
        }}
        isFieldImportant
      />
      <FormControlInput
        formik={formik}
        name={'max'}
        mt="30px"
        label=""
        onChange={onChange}
        placeholder={range[1] !== null ? t('max') : ''}
        type="number"
        isFieldImportant
      />
    </HStack>
  );
};

export default RangeFormInputs;
