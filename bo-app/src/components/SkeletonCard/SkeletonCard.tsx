import { Skeleton, Box, Flex, VStack, SkeletonText } from '@chakra-ui/react';

export const SkeletonCard = (): JSX.Element => {
  return (
    <Flex
      p={{ base: 2, md: 2, lg: 2 }}
      alignItems={'flex-start'}
      justifyContent="flex-start"
      direction={'column'}
      w={'100%'}
      flex={1}>
      <SkeletonText noOfLines={1} w="50%" mb={5}>
        <Box h="25px" w="100%"></Box>
      </SkeletonText>

      <VStack mt={10} maxH="100%" overflow="auto" style={{ width: '100%' }}>
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} w="100%">
            <Box h="50px" w="100%"></Box>
          </Skeleton>
        ))}
      </VStack>
    </Flex>
  );
};

export default SkeletonCard;
