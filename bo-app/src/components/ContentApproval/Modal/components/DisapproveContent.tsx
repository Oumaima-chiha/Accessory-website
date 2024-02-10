import { Text, VStack } from '@chakra-ui/react';
import Textarea from 'components/Textarea';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface DisapproveContentProps {
  setRejectionComment: React.Dispatch<React.SetStateAction<string>>;
}

const DisapproveContent: React.FC<DisapproveContentProps> = ({
  setRejectionComment,
}) => {
  const { t, i18n } = useTranslation(['shared']);
  return (
    <VStack alignItems="flex-start" w="100%">
      <Text>{t('content_approval_modal.comment')}</Text>
      <Textarea
        dir={i18n.dir()}
        onChange={(event): void =>
          setRejectionComment(event?.currentTarget?.value)
        }
        placeholder={t('content_approval_modal.comment', {
          context: 'rejection',
        })}
      />
    </VStack>
  );
};

export default DisapproveContent;
