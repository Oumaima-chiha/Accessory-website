import { Box } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import { scrollbarStyle } from 'utils/constant';

const Container = (): JSX.Element => {
  const { i18n } = useTranslation();
  return (
    <Box
      width={'100%'}
      pb="1rem"
      mt="7rem"
      mb="2rem"
      ps="0px !important"
      pe="10px !important"
      flex={1}
      maxW="100%"
      overflowY="auto"
      overflowX="hidden"
      dir={i18n.dir()}
      sx={scrollbarStyle}>
      <Outlet />
    </Box>
  );
};

export default Container;
