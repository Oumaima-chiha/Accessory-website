import { FormControl, FormErrorMessage } from '@chakra-ui/react';
import type { QuillEditorProps } from 'components/QuillEditor';
import QuillEditor from 'components/QuillEditor';
import { useTranslation } from 'react-i18next';
import { isFieldRequired } from 'utils/functions';
import type * as Yup from 'yup';
import StyledFormLabel from './StyledFormLabel';

interface FormControlEditorProps extends QuillEditorProps {
  label: string;
  schema?: Yup.ObjectSchema<any>;
}

const FormControlEditor = ({
  formik,
  name,
  label,
  readOnly,
  schema,
  dir,
}: FormControlEditorProps): JSX.Element => {
  const { t } = useTranslation(['errors', 'fields']);
  return (
    <FormControl
      isInvalid={
        !!formik?.errors?.[name] ||
        (formik?.values?.[name] &&
          !formik?.values?.[name]?.replaceAll(/<[^>]*>/g, ''))
      }
      isRequired={isFieldRequired(schema, name)}
      width="100%">
      <StyledFormLabel htmlFor={name}>
        {t(label, { ns: 'fields', defaultValue: '' })}
      </StyledFormLabel>
      <QuillEditor
        name={name}
        value={formik?.values[name]}
        handleChange={formik.handleChange(name)}
        formik={formik}
        readOnly={readOnly}
        dir={dir}
        placeholder={t(label, { ns: 'fields', defaultValue: '' })}
      />
      <FormErrorMessage>
        {String(t('field_required', { defaultValue: '', ns: 'errors' }))}
      </FormErrorMessage>
    </FormControl>
  );
};

export default FormControlEditor;
