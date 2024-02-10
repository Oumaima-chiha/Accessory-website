import type { RadioProps } from '@chakra-ui/react';
import {
  FormControl,
  FormErrorMessage,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react';
import type { FormikProps } from 'formik';
import type { HTMLInputTypeAttribute } from 'react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { isFieldRequired } from 'utils/functions';
import type * as Yup from 'yup';
import StyledFormLabel from './StyledFormLabel';

export interface IRadio {
  label: string;
  value: string;
  isRadioDisabled?: boolean;
}

interface FormControlRadioGroupProps extends RadioProps {
  formik: FormikProps<any>;
  name: string;
  label: string;
  readOnly?: boolean;
  options: IRadio[];
  isDisabled?: boolean;
  isHorizontal?: boolean;
  type?: HTMLInputTypeAttribute;
  schema?: Yup.ObjectSchema<any>;
  handleChange?: (nextValue: string) => void;
  isFieldImportant?: boolean;
}

const FormControlRadioGroup = ({
  formik,
  name,
  label,
  isDisabled,
  options,
  isHorizontal = true,
  schema,
  handleChange,
  readOnly,
  isFieldImportant,
}: FormControlRadioGroupProps): JSX.Element => {
  const { t } = useTranslation(['errors', 'fields']);

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
        {t(label, { ns: 'fields', defaultValue: '' })}
      </StyledFormLabel>
      <RadioGroup
        value={formik?.values[name]}
        onChange={(nextValue: string): void => {
          handleChange && handleChange(nextValue);
          formik.handleChange(name)(nextValue);
        }}
        isDisabled={isDisabled}>
        <Stack flexDir={isHorizontal ? 'row' : 'column'}>
          {options?.map(radioOption => (
            <Radio
              key={radioOption?.value}
              value={radioOption?.value}
              isReadOnly={readOnly}
              isDisabled={radioOption?.isRadioDisabled}>
              <Text alignSelf="center" pt={1}>
                {t(radioOption?.label, { defaultValue: '' })}
              </Text>
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
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

export default FormControlRadioGroup;
