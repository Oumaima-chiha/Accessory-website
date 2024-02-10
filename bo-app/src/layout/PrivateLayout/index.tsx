import { Flex, useMediaQuery } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Footer from 'layout/components/Footer';
import Header from 'layout/components/Header';
import Backdrop from '../components/Backdrop';
import SideBar from '../components/Sidebar/SideBar';
import useSideBarStyle from 'hooks/useSideBarStyle';
import useToggleSideBar from 'hooks/useToggleSideBar';
import Container from 'layout/components/Container';

const PrivateLayout = (): JSX.Element => {
  const { toggleSideBar, closeSidebar, sideToggled, openSideBar } =
    useToggleSideBar();
  const { toggledLayoutStyle } = useSideBarStyle({ sideToggled });
  const [isLarge] = useMediaQuery('(max-width: 59.9em)');

  return (
    <Flex
      as={motion.main}
      fontSize="xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 'ease-in-out' }}>
      <SideBar toggleSideBar={toggleSideBar} sideToggled={sideToggled} />
      {sideToggled && isLarge && <Backdrop closeSidebar={closeSidebar} />}
      <Flex
        flex="1"
        flexDirection="column"
        minHeight="100vh"
        gap="2rem"
        {...toggledLayoutStyle}
        maxW="100%">
        <Header
          toggleSideBar={openSideBar}
          sideBarWidth={sideToggled ? 280 : 97}
          sideToggled={sideToggled}
        />
        <Container />
      </Flex>
      <Footer />
    </Flex>
  );
};

export default PrivateLayout;
