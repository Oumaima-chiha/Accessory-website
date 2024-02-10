import { Input, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface ApproveContentProps {
  setScheduledDate: React.Dispatch<React.SetStateAction<string>>;
}

const ApproveContent: React.FC<ApproveContentProps> = ({
  setScheduledDate,
}) => {
  const { t } = useTranslation(['shared']);
  const currentDate = new Date().toISOString().slice(0, 16);
  return (
    <VStack alignItems="flex-start" w="100%">
      <Text>{t('content_approval_modal.schedule_date')}</Text>
      <Input
        onChange={(event): void => {
          setScheduledDate(event?.currentTarget?.value);
        }}
        defaultValue={currentDate}
        type="datetime-local"
        min={new Date().toISOString().slice(0, 16)}
      />
    </VStack>
  );
};

export default ApproveContent;
