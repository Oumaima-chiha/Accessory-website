import type { ReactNode } from 'react';

// Components Imports
import type { ModalProps } from '@chakra-ui/react';
import {
  HStack,
  IconButton,
  Modal as ChakraModal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SkeletonText,
} from '@chakra-ui/react';
import { Icon } from 'components/Icon';
import i18n from 'config/i18n';
import { hexToRGB } from 'theme/colors';
import { borderRadius } from 'utils/constant';

// ----------------------------------------------------------------------

type CustomModalProps = Omit<ModalProps, 'children'> & {
  title: string | ReactNode;
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onCloseComplete?: () => void;
  footerContent?: ReactNode;
  centerHeader?: boolean;
  centerFooter?: boolean;
  isLoading?: boolean;
  enableBgColor?: boolean;
  showCloseIcon?: boolean;
  titleColor?: string;
};

const Modal: React.FC<CustomModalProps> = ({
  title,
  children,
  footerContent,
  isOpen,
  centerHeader = true,
  centerFooter,
  onClose,
  onCloseComplete,
  isLoading = true,
  enableBgColor,
  showCloseIcon = true,
  titleColor = 'secondary.500',
  ...props
}) => {
  return (
    <ChakraModal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      onCloseComplete={onCloseComplete}
      size={{ base: 'md', md: '2xl', lg: '5xl' }}
      {...props}>
      <ModalOverlay />
      <ModalContent
        gap={5}
        dir={i18n.dir()}
        justifyContent="flex-start"
        borderRadius={borderRadius}>
        <HStack
          w="100%"
          justifyContent="space-between"
          bg={hexToRGB('secondary', 0.03)}
          borderRadius={borderRadius}
          px={2}>
          <ModalHeader
            textAlign={centerHeader ? 'center' : 'inherit'}
            flex={1}
            color={titleColor}
            fontSize="2xl">
            {isLoading ? <SkeletonText noOfLines={1} /> : title}
          </ModalHeader>
          {showCloseIcon && (
            <IconButton
              bg="transparent"
              w="auto"
              aria-label="close-modal-button"
              onClick={onClose}
              variant={'iconButtonTransparent'}
              icon={<Icon w="10px" displayName="close" color="secondary.500" />}
            />
          )}
        </HStack>
        <ModalBody
          bg={enableBgColor ? hexToRGB('secondary', 0.03) : 'transparent'}
          borderColor={hexToRGB('secondary', 0.1)}
          borderTopWidth={1}
          px={'20px'}
          pt={'20px'}>
          {isLoading ? <SkeletonText /> : children}
        </ModalBody>
        {footerContent && (
          <ModalFooter justifyContent={centerFooter ? 'center' : 'flex-end'}>
            {footerContent}
          </ModalFooter>
        )}
      </ModalContent>
    </ChakraModal>
  );
};

export default Modal;
