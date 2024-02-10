import type { TextareaProps } from '@chakra-ui/react';
import {
  FormControl,
  FormErrorMessage,
  Textarea,
  useConst,
} from '@chakra-ui/react';
import type { FormikProps } from 'formik';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { hexToRGB } from 'theme/colors';
import { scrollbarStyle } from 'utils/constant';
import { isFieldRequired } from 'utils/functions';
import type * as Yup from 'yup';
import StyledFormLabel from './StyledFormLabel';

interface FormControlTextAreaProps extends TextareaProps {
  formik: FormikProps<any>;
  name: string;
  label: string;
  placeholder?: string;
  readOnly?: boolean;
  isDisabled?: boolean;
  schema?: Yup.ObjectSchema<any>;
}

const FormControlTextArea = ({
  formik,
  name,
  placeholder,
  label,
  readOnly,
  isDisabled,
  schema,
  dir = 'ltr',
  ...rest
}: FormControlTextAreaProps): JSX.Element => {
  const { t } = useTranslation('errors');
  const formLabel = useConst(t(label, { ns: 'fields', defaultValue: '' }));

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
      isRequired={isFieldRequired(schema, name)}>
      <StyledFormLabel htmlFor={name}>{formLabel}</StyledFormLabel>
      <Textarea
        placeholder={placeholder ?? formLabel}
        id={name}
        onChange={formik.handleChange}
        value={formik?.values?.[name]}
        readOnly={readOnly}
        isDisabled={isDisabled}
        name={name}
        sx={scrollbarStyle}
        borderWidth={0}
        bg={hexToRGB('secondary', 0.1)}
        dir={dir}
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

export default FormControlTextArea;
