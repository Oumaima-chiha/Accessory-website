import { Container, Heading, useDisclosure } from '@chakra-ui/react';
import ConfirmModal from 'components/ConfirmModal';
import { Spinner } from 'components/Loaders';
import type { ReactNode } from 'react';
import { Form as ReactRouterForm } from 'react-router-dom';
import { getColor } from 'theme/colors';
import { secondaryBgGradient } from 'utils/constant';

const formStyle = {
  padding: 10,
  borderRadius: 10,
  background: getColor('gray', 50),
};
interface FormProps {
  handleSubmit: (
    e: React.SyntheticEvent<HTMLFormElement, Event>,
  ) => void | undefined;
  handleReset: (nextState?: any) => void | undefined;
  children: ReactNode;
  title?: string;
  fullWidth?: boolean;
  isLoading?: boolean;
  removePadding?: boolean;
  noValidate?: boolean;
  minWidth?: string;
  showConfirmPopup?: boolean;
}

const Form = ({
  fullWidth = true,
  noValidate = true,
  showConfirmPopup = false,
  ...props
}: FormProps): JSX.Element => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const onFormSubmitHandler = (
    e: React.SyntheticEvent<HTMLFormElement>,
  ): void => {
    if (showConfirmPopup) {
      const isFormValid = e.currentTarget.checkValidity();
      if (isFormValid) {
        onOpen();
      } else {
        props?.handleSubmit(e);
      }
      e.preventDefault();
    } else {
      props?.handleSubmit(e);
    }
  };

  return (
    <Container
      minW={fullWidth ? '100%' : props?.minWidth ? props?.minWidth : '80%'}
      display="flex"
      h="100%"
      flexDir="column"
      p={props?.removePadding ? 0 : 'auto'}
      gap={5}>
      {props?.title && (
        <Heading
          fontSize={20}
          bgGradient={secondaryBgGradient}
          bgClip="text"
          css={{
            WebkitBackgroundClip: 'text',
          }}>
          {props?.title}
        </Heading>
      )}
      {props?.isLoading ? (
        <Spinner alignSelf="center" />
      ) : (
        <ReactRouterForm
          onSubmit={onFormSubmitHandler}
          onReset={props?.handleReset}
          style={formStyle}
          noValidate={noValidate}>
          {props.children}
        </ReactRouterForm>
      )}
      {showConfirmPopup && (
        <ConfirmModal
          onConfirm={props?.handleSubmit}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </Container>
  );
};

export default Form;
