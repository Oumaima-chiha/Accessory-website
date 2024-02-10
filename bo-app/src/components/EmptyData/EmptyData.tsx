import empty_data from 'assets/images/empty_data.png';

// Customization state
import { Box, Container, Heading, Image } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

const EmptyData = (): JSX.Element => {
  const { t } = useTranslation('common');
  return (
    <Container minW={'100%'}>
      <Image
        src={empty_data}
        alt="404 Not Found"
        sx={{
          height: 350,
          mx: 'auto',
        }}
      />
      <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
        <Heading textTransform="capitalize" color="secondary.500" size="md">
          {t('no_data_found', { context: 'api' })}
        </Heading>
      </Box>
    </Container>
  );
};

export default EmptyData;
