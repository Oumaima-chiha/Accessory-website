/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
  useDisclosure,
  useTheme,
} from '@chakra-ui/react';
import ConfirmModal from 'components/ConfirmModal';
import ContentApprovalModal from 'components/ContentApproval/Modal';
import { Icon } from 'components/Icon';
import usePermissions from 'hooks/usePermissions';
import { ContentApprovalTypes, TABLE_ACTION } from 'interfaces';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface ActionProps {
  name: string | ((data?: any) => string);
  handleClick: (data: any) => void;
  isDisabled?: (data: any) => boolean;
  isShown?: boolean;
  isApproval?: boolean;
  showConfirmationModal?: boolean;
}
const getActionProps = (type: string): Record<string, any> => {
  const colors = [
    {
      name: TABLE_ACTION.PRINT,
      icon: 'print',
      color: 'secondary',
      opacity: '500',
    },
    {
      name: TABLE_ACTION.IMPORT,
      icon: 'import',
      color: 'secondary',
      opacity: '500',
    },
    {
      name: TABLE_ACTION.DELETE,
      icon: 'trash',
      color: 'secondary',
      opacity: '500',
    },
    {
      name: TABLE_ACTION.VIEW,
      icon: 'view',
      color: 'secondary',
      opacity: '500',
    },

    {
      name: TABLE_ACTION.ACTIVATE,
      icon: 'activate',
      color: 'secondary',
      opacity: '500',
    },
    {
      name: TABLE_ACTION.DEACTIVATE,
      icon: 'deactivate',
      color: 'secondary',
      opacity: '500',
    },
    {
      name: TABLE_ACTION.APPROVE_CONTENT,
      icon: 'approve',
      color: 'secondary',
      opacity: '500',
    },
    {
      name: TABLE_ACTION.DISAPPROVE_CONTENT,
      icon: 'disapprove',
      color: 'secondary',
      opacity: '500',
    },
    {
      name: TABLE_ACTION.ACTIVATE_USER,
      icon: 'activate-user',
      color: 'secondary',
      opacity: '500',
    },
    {
      name: TABLE_ACTION.DEACTIVATE_USER,
      icon: 'deactivate-user',
      color: 'secondary',
      opacity: '500',
    },
    {
      name: TABLE_ACTION.MORE,
      icon: 'more',
      color: 'secondary',
      opacity: '500',
    },
    {
      name: TABLE_ACTION.EDIT,
      icon: 'edit',
      color: 'secondary',
      opacity: '500',
    },
    {
      name: TABLE_ACTION.RESEND,
      icon: 'resend',
      color: 'secondary',
      opacity: '500',
    },
    {
      name: TABLE_ACTION.DOWNLOAD,
      icon: 'download',
      color: 'secondary',
      opacity: '500',
    },
    {
      name: TABLE_ACTION.ANSWER,
      icon: 'chat',
      color: 'secondary',
      opacity: '500',
    },
  ];
  const selectedAction = colors?.filter(
    color => type?.toLowerCase() === color?.name?.toLowerCase(),
  )[0];
  return (
    selectedAction ?? {
      name: 'warning-2',
      icon: 'warning-2',
      color: 'red',
      opacity: '500',
    }
  );
};

const ActionButtons = ({
  actions,
  data,
}: {
  actions: ActionProps[];
  data: any;
}): JSX.Element => {
  const [selectedActionData, setSelectedActionData] = useState<any>(null);
  const theme = useTheme();
  const { t } = useTranslation(['shared']);
  const { isSuperAdmin } = usePermissions({});
  const { isOpen: isConfirmationModalOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isContentApprovalModalOpen,
    onClose: onCloseContentApprovalModal,
    onOpen: onOpenContentApprovalModal,
  } = useDisclosure();
  const [contentApprovalType, setContentApprovalType] =
    useState<ContentApprovalTypes>(ContentApprovalTypes.APPROVE);

  const handleClickWithConfirmation = (action: ActionProps): void => {
    onOpen();
    setSelectedActionData(action);
  };

  const handleClickContentApproval = (action: ActionProps): void => {
    if (typeof action?.name === 'string') {
      onOpenContentApprovalModal();
      setContentApprovalType(action.name as ContentApprovalTypes);
      setSelectedActionData(action);
    }
  };

  const handleConfirm = (): void => {
    selectedActionData?.handleClick(data);
  };

  return (
    <Flex gap={4}>
      {actions?.map(
        ({ isShown = true, ...action }) =>
          (isSuperAdmin || isShown) &&
          (action?.name === 'more' ? (
            <Menu key={action?.name} autoSelect={false} placement="bottom-end">
              <MenuButton>
                <IconButton
                  aria-label={action?.name}
                  bg="transparent"
                  size="sm"
                  icon={
                    <Icon
                      displayName={action?.name}
                      color={
                        theme.colors[getActionProps(action?.name)?.color][
                          getActionProps(action?.name)?.opacity
                        ]
                      }
                      boxSize="20px"
                      overflow="visible"
                      position="relative"
                      insetStart="-1px"
                    />
                  }
                />
              </MenuButton>
              <MenuList zIndex={9} ringColor={'red'}>
                {['Import', 'Export', 'Print'].map((item, index) => (
                  <MenuItem
                    key={index}
                    onClick={(): void => console.log(item, 'clicked!')}>
                    {item}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          ) : (
            <Tooltip
              key={
                typeof action?.name === 'string'
                  ? action?.name
                  : action?.name(data)
              }
              hasArrow
              // @ts-ignore
              label={
                typeof action?.name === 'string'
                  ? // @ts-ignore
                    t(action?.name)
                  : // @ts-ignore
                    t(action?.name(data))
              }
              bg="gray.300">
              <IconButton
                aria-label={
                  typeof action?.name === 'string'
                    ? action?.name
                    : action?.name(data)
                }
                bg="transparent"
                size="sm"
                w="fit-content"
                onClick={(): void => {
                  action?.showConfirmationModal
                    ? handleClickWithConfirmation(action)
                    : action?.isApproval
                    ? handleClickContentApproval(action)
                    : action?.handleClick(data);
                }}
                isDisabled={
                  isSuperAdmin
                    ? false
                    : action?.isDisabled
                    ? action?.isDisabled(data)
                    : false
                }
                icon={
                  <Icon
                    color={
                      theme.colors[
                        getActionProps(
                          typeof action?.name === 'string'
                            ? action?.name
                            : action?.name(data),
                        )?.color
                      ][
                        getActionProps(
                          typeof action?.name === 'string'
                            ? action?.name
                            : action?.name(data),
                        )?.opacity
                      ]
                    }
                    displayName={
                      getActionProps(
                        typeof action?.name === 'string'
                          ? action?.name
                          : action?.name(data),
                      ).icon
                    }
                    boxSize="20px"
                    overflow="visible"
                    position="relative"
                    insetStart="-1px"
                  />
                }
              />
            </Tooltip>
          )),
      )}
      <ConfirmModal
        onConfirm={handleConfirm}
        isOpen={isConfirmationModalOpen}
        onClose={onClose}
      />
      <ContentApprovalModal
        onSubmit={selectedActionData?.handleClick}
        targetId={data?.id}
        type={contentApprovalType}
        isOpen={isContentApprovalModalOpen}
        onClose={onCloseContentApprovalModal}
      />
    </Flex>
  );
};

export default ActionButtons;
