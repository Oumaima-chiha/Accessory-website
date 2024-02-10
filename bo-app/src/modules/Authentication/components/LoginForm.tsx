import { Button } from '@chakra-ui/button';
import { Box, Flex, Heading, Text, VStack } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/react';
import HeartLogo from 'assets/images/svg/heart_logo.svg';
import FormControlInput from 'components/Form/components/FormControlInput';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-router-dom';
import { SignInFormValidation } from '../extra';
import { useLoginMutation } from '../redux';

const LoginForm = (): JSX.Element => {
  const [loginMutation, { isLoading }] = useLoginMutation();
  const { t, i18n } = useTranslation(['fields', 'common']);
  const formik = useFormik({
    initialValues: {
      username: '',
      rememberMe: false,
      password: '',
    },
    validationSchema: SignInFormValidation,
    onSubmit: async values => {
      try {
        await loginMutation({
          password: values?.password,
          username: values?.username,
        }).unwrap();
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Box
      bg="white"
      boxSize="lg"
      p={6}
      rounded="md"
      borderColor="primary.500"
      display="flex"
      alignItems="center"
      justifyContent="center"
      borderWidth={1}>
      <Form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
        <VStack spacing={4} gap={5}>
          <Flex
            gap={3}
            alignSelf="center"
            flexDir="column"
            w="100%"
            alignItems="center">
            <Image src={HeartLogo} width="50px" />
            <Heading
              bgGradient="linear(to-r, secondary.500, primary.500 50%)"
              bgClip="text"
              size={{ base: 'xl', lg: 'lg', sm: 'lg' }}
              css={{
                WebkitBackgroundClip: 'text',
              }}
              zIndex={1}>
              Symptoms Checker
            </Heading>
            <Text color="tertiary.700">Enter your credentials to continue</Text>
          </Flex>
          <FormControlInput
            formik={formik}
            schema={SignInFormValidation}
            name="username"
            label="username"
            dir={i18n.dir()}
          />
          <FormControlInput
            formik={formik}
            schema={SignInFormValidation}
            name="password"
            type={'password'}
            label="password"
            dir={i18n.dir()}
          />
          <Button type="submit" width="2xs" isLoading={isLoading}>
            {t('common:login')}
          </Button>
        </VStack>
      </Form>
    </Box>
  );
};

export default LoginForm;
