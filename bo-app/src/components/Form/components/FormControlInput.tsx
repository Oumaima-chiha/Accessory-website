import type { InputProps } from '@chakra-ui/react';
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  HStack,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from '@chakra-ui/react';
import { Icon } from 'components/Icon';
import type { FormikProps } from 'formik';
import type { HTMLInputTypeAttribute } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { acceptedFileTypes, borderRadius } from 'utils/constant';
import { isFieldRequired } from 'utils/functions';
import type * as Yup from 'yup';
import StyledFormLabel from './StyledFormLabel';

export interface FormControlInputProps extends InputProps {
  formik: FormikProps<any>;
  name: string;
  label: string;
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

const FormControlInput = ({
  formik,
  name,
  label,
  readOnly,
  isDisabled,
  schema,
  type = 'text',
  icon,
  isFieldImportant,
  dir = 'ltr',
  ...rest
}: FormControlInputProps): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const { t } = useTranslation(['errors', 'fields']);
  const [imagePreview, setImagePreview] = useState('');

  const handleClick = (): void => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

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

  useEffect(() => {
    if (type === 'file' && typeof formik?.values?.[name] !== 'string') {
      // create the imagePreview
      const objectUrl = URL.createObjectURL(formik?.values?.[name]);
      setImagePreview(objectUrl);

      // free memory when ever this component is unmounted
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [formik?.values, name, type]);
  return (
    <FormControl
      isInvalid={formikErrorObject?.hasErrors}
      zIndex={999}
      isRequired={isFieldImportant || isFieldRequired(schema, name)}>
      {label && (
        <StyledFormLabel htmlFor={name} isFieldImportant={isFieldImportant}>
          {t(label, { ns: 'fields', defaultValue: label })}
        </StyledFormLabel>
      )}
      <InputGroup>
        {type === 'file' && (
          <Flex
            flexDir={formik?.values?.[name]?.name ? 'row' : 'column'}
            alignItems={formik?.values?.[name]?.name ? 'center' : 'normal'}
            justifyContent="space-between"
            gap={5}
            w="100%">
            {readOnly && formik?.values?.[name] ? (
              <></>
            ) : (
              <HStack>
                {!readOnly && !isDisabled && (
                  <Button h="35" onClick={handleClick}>
                    {t('file', {
                      context: 'upload',
                      ns: 'shared',
                      defaultValue: '',
                    })}
                  </Button>
                )}
                {formik?.values?.[name]?.name ? (
                  <Text>{formik?.values?.[name]?.name}</Text>
                ) : formik?.values?.[name] ? (
                  <></>
                ) : (
                  <Text>
                    {t('file', {
                      context: 'not_selected',
                      ns: 'shared',
                      defaultValue: '',
                    })}
                  </Text>
                )}
              </HStack>
            )}
            {formik?.values?.[name] ? (
              typeof formik?.values?.[name] === 'string' ? (
                <Image
                  w="150px"
                  borderRadius={borderRadius}
                  src={formik?.values?.[name]}
                />
              ) : (
                <Popover placement="left-start">
                  <PopoverTrigger>
                    <Link color="secondary.500" mr={1}>
                      {t('file', {
                        context: 'preview',
                        ns: 'shared',
                        defaultValue: '',
                      })}
                    </Link>
                  </PopoverTrigger>
                  <PopoverContent
                    bg="white"
                    maxW="250px"
                    h="100%"
                    borderRadius={borderRadius}>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader w="100%" textAlign="center">
                      <Text fontSize={18}>
                        {t('file', {
                          context: 'preview',
                          ns: 'shared',
                          defaultValue: '',
                        })}
                      </Text>
                    </PopoverHeader>
                    <PopoverBody>
                      <Image
                        w="100%"
                        borderRadius={borderRadius}
                        src={imagePreview}
                      />
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              )
            ) : (
              <></>
            )}
          </Flex>
        )}
        <Input
          ref={hiddenFileInput}
          id={name}
          name={name}
          type={
            type === 'password' ? (showPassword ? 'text' : 'password') : type
          }
          onChange={(e): void => {
            if (type === 'file' && e?.currentTarget?.files?.length) {
              formik.setFieldValue(name, e?.currentTarget?.files[0]);
            } else {
              formik.handleChange(e);
            }
          }}
          value={type === 'file' ? undefined : formik?.values?.[name]}
          readOnly={readOnly}
          isDisabled={isDisabled}
          hidden={type === 'file'}
          placeholder={t(label, { ns: 'fields', defaultValue: '' })}
          dir={dir}
          accept={acceptedFileTypes}
          sx={{
            '&::-webkit-calendar-picker-indicator': {
              width: '90%',
              pb: 2,
            },
            '&::-webkit-datetime-edit': {
              flex: 'inherit',
            },
          }}
          {...rest}
        />
        {(icon?.name || type === 'password') && (
          <InputRightElement
            _hover={{ cursor: 'pointer' }}
            onClick={
              type === 'password'
                ? (): void => setShowPassword(!showPassword)
                : icon?.onClick
            }>
            <Icon
              displayName={
                type === 'password'
                  ? showPassword
                    ? 'eye'
                    : 'eye-close'
                  : icon?.name
              }
            />
          </InputRightElement>
        )}
      </InputGroup>

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

export default FormControlInput;
