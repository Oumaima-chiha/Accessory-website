import type { InputProps } from '@chakra-ui/react';
import {
  Flex,
  FormControl,
  FormErrorMessage,
  Switch,
  Text,
} from '@chakra-ui/react';
import type { FormikProps } from 'formik';
import type { HTMLInputTypeAttribute } from 'react';
import { useTranslation } from 'react-i18next';
import { isFieldRequired } from 'utils/functions';
import type * as Yup from 'yup';
import StyledFormLabel from './StyledFormLabel';

interface FormControlSwitchProps extends InputProps {
  formik: FormikProps<any>;
  name: string;
  label: string;
  leftLabel?: string;
  rightLabel?: string;
  readOnly?: boolean;
  isDisabled?: boolean;
  type?: HTMLInputTypeAttribute;
  schema?: Yup.ObjectSchema<any>;
  icon?: {
    onClick: () => void;
    name: string;
  };
  isFieldImportant?: boolean;
}

const FormControlSwitch = ({
  formik,
  name,
  label,
  leftLabel,
  rightLabel,
  readOnly,
  isDisabled,
  schema,
  defaultChecked,
  onChange,
  isFieldImportant,
}: FormControlSwitchProps): JSX.Element => {
  const { t } = useTranslation();
  return (
    <FormControl
      isInvalid={!!formik?.errors?.[name]}
      isRequired={isFieldImportant}>
      <StyledFormLabel htmlFor={name} isFieldImportant={isFieldImportant}>
        {t(label, { ns: 'fields', defaultValue: '' })}
        {isFieldRequired(schema, name) ? '*' : ''}
      </StyledFormLabel>
      <Flex alignItems="center" gap={2}>
        {leftLabel && (
          <Text>{t(leftLabel, { ns: 'fields', defaultValue: '' })}</Text>
        )}
        <Switch
          disabled={isDisabled}
          readOnly={readOnly}
          name={name}
          defaultChecked={defaultChecked}
          isChecked={formik?.values?.[name]}
          onChange={(e): void => {
            formik.handleChange(e);
            onChange && onChange(e);
          }}
          colorScheme="secondary"
          size="lg"
        />
        {rightLabel && (
          <Text>{t(rightLabel, { ns: 'fields', defaultValue: '' })}</Text>
        )}
      </Flex>
      <FormErrorMessage>{String(formik.errors?.[name])}</FormErrorMessage>
    </FormControl>
  );
};

export default FormControlSwitch;
