import { Box, FormControl, FormErrorMessage } from '@chakra-ui/react';
import Select from 'components/Select';
import type { SelectInputProps } from 'components/Select/Select';
import type { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { hexToRGB } from 'theme/colors';
import { borderRadius } from 'utils/constant';
import { isFieldRequired } from 'utils/functions';
import type * as Yup from 'yup';
import StyledFormLabel from './StyledFormLabel';

interface FormSelectInputProps extends SelectInputProps {
  name: string;
  formik: FormikProps<any>;
  schema?: Yup.ObjectSchema<any>;
  isFieldImportant?: boolean;
}

const FormControlSelect: React.FC<FormSelectInputProps> = ({
  onChange,
  options,
  style,
  defaultValue,
  name,
  label = '',
  formik,
  isDisabled = false,
  readOnly = false,
  schema,
  namespace,
  isFieldImportant,
}) => {
  const { t } = useTranslation('errors');
  return (
    <Box>
      <FormControl
        isInvalid={!!formik?.errors?.[name] && !!formik?.touched?.[name]}
        isRequired={isFieldImportant || isFieldRequired(schema, name)}>
        <StyledFormLabel htmlFor={name} isFieldImportant={isFieldImportant}>
          {t(label, { ns: 'fields', defaultValue: label })}
        </StyledFormLabel>
        <Box
          display="flex"
          alignItems={'center'}
          justifyContent="start"
          style={style}
          height={35}
          borderColor={
            formik?.errors?.[name] && formik?.touched?.[name] ? 'red' : 'none'
          }
          borderWidth={1}
          bg={hexToRGB('secondary', 0.1)}
          opacity={isDisabled && !readOnly ? 0.4 : 1}
          borderRadius={borderRadius}>
          <Select
            options={options}
            isDisabled={isDisabled}
            readOnly={readOnly}
            value={formik?.values?.[name]}
            defaultValue={defaultValue}
            onChange={onChange}
            namespace={namespace}
            isForm={true}
          />
        </Box>
        <FormErrorMessage>
          {String(
            t(`${formik.errors?.[name]}`, { defaultValue: '', ns: 'errors' }),
          )}
        </FormErrorMessage>
      </FormControl>
    </Box>
  );
};

export default FormControlSelect;
