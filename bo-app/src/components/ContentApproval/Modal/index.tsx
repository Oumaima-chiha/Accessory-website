import { Button } from '@chakra-ui/react';
import Modal from 'components/Modal';
import { ContentApprovalTypes } from 'interfaces';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { disabledButtonStyle } from 'utils/constant';
import ApproveContent from './components/ApproveContent';
import DisapproveContent from './components/DisapproveContent';

interface ContentApprovalModalProps {
  type: ContentApprovalTypes;
  isOpen: boolean;
  onClose: () => void;
  targetId: string;
  onSubmit: (data: any) => Promise<void>;
}

const ContentApprovalModal: React.FC<ContentApprovalModalProps> = ({
  isOpen,
  onClose,
  type,
  onSubmit,
  targetId,
}) => {
  const currentDate = new Date().toISOString().slice(0, 16);
  const { t } = useTranslation(['shared']);
  const [rejectionComment, setRejectionComment] = useState('');
  const [scheduledDate, setScheduledDate] = useState(currentDate);

  const onModalClose = (): void => {
    onClose();
    scheduledDate?.length && setScheduledDate('');
    rejectionComment?.length && setRejectionComment('');
  };
  const onSubmitHandler = (): void => {
    const payload = {
      id: targetId,
      ...(type === ContentApprovalTypes.APPROVE
        ? { publishDate: scheduledDate }
        : { comment: rejectionComment }),
    };
    onSubmit(payload);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onModalClose}
      title={t(type, {
        context: 'content',
        defaultValue: '',
      })}
      size="lg"
      centerHeader
      isLoading={false}
      centerFooter
      footerContent={
        <Button
          maxW="150px"
          isDisabled={
            type === ContentApprovalTypes.APPROVE ? !scheduledDate : false
          }
          onClick={onSubmitHandler}
          alignSelf="center"
          _disabled={disabledButtonStyle}>
          {t(type, { defaultValue: type })}
        </Button>
      }>
      {type === ContentApprovalTypes.APPROVE ? (
        <ApproveContent setScheduledDate={setScheduledDate} />
      ) : (
        <DisapproveContent setRejectionComment={setRejectionComment} />
      )}
    </Modal>
  );
};

export default ContentApprovalModal;
