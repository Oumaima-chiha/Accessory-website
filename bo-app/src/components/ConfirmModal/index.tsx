import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { borderRadius } from 'utils/constant';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (() => Promise<void>) | ((args?: any) => void);
  isLoading?: boolean;
  isConfirmDisabled?: boolean;
  title?: string;
  description?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = props => {
  const {
    isOpen,
    onClose,
    onConfirm,
    title = 'confirm',
    description = 'confirm_msg',
    isLoading = false,
    isConfirmDisabled = false,
  } = props;
  const { t } = useTranslation();
  const cancelRef = React.useRef(null);

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isCentered>
      <AlertDialogOverlay>
        <AlertDialogContent borderRadius={borderRadius} gap={2}>
          <AlertDialogHeader
            alignSelf="center"
            fontSize="2xl"
            fontWeight="bold">
            {t(title, { ns: 'shared', defaultValue: title })}
          </AlertDialogHeader>
          <AlertDialogCloseButton />

          <AlertDialogBody>
            {t(description, { ns: 'shared', defaultValue: description })}
          </AlertDialogBody>

          <AlertDialogFooter gap={5} justifyContent="center">
            <Button ref={cancelRef} onClick={onClose}>
              {t('no')}
            </Button>
            <Button
              bg="primary.500"
              ml={3}
              isLoading={isLoading}
              isDisabled={isConfirmDisabled}
              onClick={(): void => {
                onConfirm();
                onClose();
              }}
              _hover={{
                bg: 'primary.500 !important',
              }}>
              {t('yes')}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ConfirmModal;
