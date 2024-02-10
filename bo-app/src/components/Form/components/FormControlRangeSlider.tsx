import { FormErrorMessage } from '@chakra-ui/react';
import { FormControl } from '@chakra-ui/react';
import type { RangeSliderProps } from 'components/RangeSlider';
import RangeSlider from 'components/RangeSlider';
import type { FormikProps } from 'formik';
import { t } from 'i18next';
import React, { useMemo } from 'react';
import { isFieldRequired } from 'utils/functions';
import type { ObjectSchema } from 'yup';
import StyledFormLabel from './StyledFormLabel';

interface FormRangeSliderProps extends RangeSliderProps {
  name: string;
  label: string;
  formik: FormikProps<any>;
  schema?: ObjectSchema<any>;
  isFieldImportant?: boolean;
}

const FormControlRangeSlider: React.FC<FormRangeSliderProps> = props => {
  const { formik, schema, name, label, isFieldImportant, ...rest } = props;

  const formikErrorObject = useMemo(() => {
    if (name?.includes('.')) {
      const splitName = name?.split('.');
      return {
        hasErrors:
          formik?.errors?.[splitName[0]]?.[splitName[1]] &&
          formik?.touched?.[splitName[0]]?.[splitName[1]],
        errorLabel: formik?.errors?.[splitName[0]]?.[splitName[1]],
      };
    }
    return {
      hasErrors: formik?.errors?.[name] && formik?.touched?.[name],
      errorLabel: formik?.errors?.[name],
    };
  }, [formik?.errors, formik?.touched, name]);

  return (
    <FormControl
      isInvalid={formikErrorObject?.hasErrors}
      isRequired={isFieldImportant || isFieldRequired(schema, name)}>
      <StyledFormLabel htmlFor={name} isFieldImportant={isFieldImportant}>
        {t(label, { ns: 'fields', defaultValue: label })}
      </StyledFormLabel>
      <RangeSlider
        onChangeEnd={(value): void => {
          formik.setFieldValue(name, value);
        }}
        {...rest}
      />
      {formikErrorObject?.hasErrors && (
        <FormErrorMessage>
          {String(
            t(`${formikErrorObject?.errorLabel}`, {
              defaultValue: '',
              ns: 'errors',
            }),
          )}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default FormControlRangeSlider;
