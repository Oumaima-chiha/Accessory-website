import { Divider, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { isDate, stringToDate } from 'utils/functions';

interface DetailsBlockProps {
  label: string;
  value: string | null;
  showDivider?: boolean;
}

const DetailsBlock: React.FC<DetailsBlockProps> = ({
  label,
  value,
  showDivider = true,
}) => {
  return (
    <>
      {showDivider && (
        <Divider borderColor="secondary.500" orientation="vertical" h={14} />
      )}
      <VStack>
        <Text fontWeight="bold">{label}</Text>
        <Text>
          {value?.length
            ? isDate(value)
              ? stringToDate(value)
              : value
            : '------'}
        </Text>
      </VStack>
    </>
  );
};

export default DetailsBlock;
