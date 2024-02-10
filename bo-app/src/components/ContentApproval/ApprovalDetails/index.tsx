import { HStack } from '@chakra-ui/react';
import { ContentReviewStatus } from 'interfaces';
import React from 'react';
import { useTranslation } from 'react-i18next';
import DetailsBlock from './DetailsBlock';
interface ApprovalDetailsProps {
  reviewStatus: ContentReviewStatus;
  createdBy: string;
  reviewer: string;
  createdAt: string;
  updatedAt: string;
  comment: string;
  publishDate: string;
}

const ApprovalDetails: React.FC<ApprovalDetailsProps> = (
  props,
): React.ReactElement => {
  const { t } = useTranslation(['fields']);
  const {
    createdAt,
    createdBy,
    reviewStatus,
    reviewer,
    updatedAt,
    comment,
    publishDate,
  } = props;

  return (
    <HStack
      alignItems="center"
      justifyContent="space-evenly"
      borderTopWidth={1}
      w="100%"
      gap={10}
      p={10}
      mt={10}>
      <DetailsBlock
        label={t(
          reviewStatus === ContentReviewStatus.APPROVED
            ? 'publish_date'
            : reviewStatus === ContentReviewStatus.REJECTED
            ? 'rejection_reason'
            : 'status_pending',
        )}
        value={
          reviewStatus === ContentReviewStatus.PENDING
            ? ''
            : reviewStatus === ContentReviewStatus.APPROVED
            ? publishDate
            : comment
        }
        showDivider={false}
      />
      <DetailsBlock label={t('created_by')} value={createdBy} />
      {reviewStatus !== ContentReviewStatus.PENDING && (
        <DetailsBlock
          label={t(
            reviewStatus === ContentReviewStatus.APPROVED
              ? 'approved_by'
              : 'rejected_by',
          )}
          value={reviewer}
        />
      )}
      <DetailsBlock label={t('created_at')} value={createdAt} />
      <DetailsBlock label={t('updated_at')} value={updatedAt} />
    </HStack>
  );
};

export default ApprovalDetails;
