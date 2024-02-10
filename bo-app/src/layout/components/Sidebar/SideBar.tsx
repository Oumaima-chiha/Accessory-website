import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import SideBarkLink from './SideBarkLink';
// import Logo from 'assets/images/logo.png';
import { ReactComponent as Logo } from 'assets/images/svg/symptoms_checker_logo.svg';
import { motion } from 'framer-motion';
import usePermissions from 'hooks/usePermissions';
import useSideBarStyle from 'hooks/useSideBarStyle';
import { useTranslation } from 'react-i18next';
import { scrollbarStyle } from 'utils/constant';
import CloseIcon from './CloseIcon';
import { useSidebarRoutes } from './sidebarRoutes';
const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};
interface SideBarProps {
  sideToggled: boolean;
  toggleSideBar: () => void;
}

const SideBar: React.FunctionComponent<SideBarProps> = ({
  sideToggled,
  toggleSideBar,
}) => {
  const { toggledSideBarStyle } = useSideBarStyle({
    sideToggled,
  });
  const routes = useSidebarRoutes();
  const { isSuperAdmin } = usePermissions({});
  const { i18n } = useTranslation();

  return (
    <Box
      as={motion.div}
      initial={false}
      animate={sideToggled ? 'open' : 'closed'}
      {...toggledSideBarStyle}>
      <Flex justifyContent="center" w="full" alignItems="center" gap="2rem">
        {sideToggled && (
          <Logo
            height="7rem"
            style={{
              flex: 0.7,
            }}
          />
        )}
        <CloseIcon sideToggled={sideToggled} toggleSideBar={toggleSideBar} />
      </Flex>
      <Flex
        as={motion.div}
        variants={variants}
        direction="column"
        mt={!sideToggled ? '3rem' : '0'}
        py="1rem"
        color="secondary.50"
        fill="secondary.50"
        overflowY="auto"
        overflowX="hidden"
        maxH="90%"
        dir={i18n.dir()}
        sx={scrollbarStyle}>
        {routes.map(
          (route, index: number) =>
            (isSuperAdmin || route?.hasPermissions) && (
              <SideBarkLink
                key={'route' + index}
                {...route}
                sideToggled={sideToggled}
              />
            ),
        )}
      </Flex>
    </Box>
  );
};

export default SideBar;
