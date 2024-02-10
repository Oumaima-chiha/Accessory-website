import { Box, Flex, HStack, Text, Tooltip } from '@chakra-ui/react';
import { Icon } from 'components/Icon';
import { motion } from 'framer-motion';
import type { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { hexToRGB } from 'theme/colors';
import { borderRadius } from 'utils/constant';

const variants = {
  open: {
    x: [-100, 0],
    opacity: [0, 1],
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    x: [50, 0],
    opacity: [0, 1],
    transition: {
      y: { stiffness: 1000 },
    },
  },
};
interface SideBarLinkProps {
  label: string;
  path: string;
  icon: string;
  sideToggled: boolean;
}
const SideBarkLink: FunctionComponent<SideBarLinkProps> = ({
  sideToggled,
  icon,
  path,
  label,
  ...props
}) => {
  const { t } = useTranslation(['modules']);

  return (
    <NavLink to={path}>
      {({ isActive }): JSX.Element => (
        <Flex
          gap="1rem"
          p=".5rem"
          pl="1.2rem"
          cursor="pointer"
          position="relative"
          alignItems="center"
          overflow="hidden"
          // _hover={{
          //   fill: 'white',
          //   background:
          //     'linear-gradient(80deg, rgb(255 255 255 / 28%) 0%, rgb(255 255 255 / 2%) 100%)',
          // }}
          role="group"
          background={
            isActive
              ? 'linear-gradient(80deg, rgb(255 255 255 / 28%) 0%, rgb(255 255 255 / 2%) 100%)'
              : ''
          }
          justifyContent={sideToggled ? 'flex-start' : 'center'}
          {...props}
          as={motion.li}
          variants={variants}
          whileTap={{ scale: 0.95 }}>
          <Box
            borderRadius="0 3px 3px 0"
            height="100%"
            position="absolute"
            left="0"
            bg="primary.500"
            transition="all .2s"
            top="0"
            _groupHover={{
              width: '4px',
            }}
            w={isActive ? '4px' : '0'}
          />
          <Tooltip
            label={sideToggled ? '' : t(label, { defaultValue: label })}
            placement="right"
            hasArrow
            padding={3}>
            <HStack
              bg={isActive ? hexToRGB('tertiary', 0.08) : 'white'}
              borderRadius={borderRadius}
              w={sideToggled ? '100%' : '80%'}
              p={sideToggled ? 5 : 3}>
              <Icon
                displayName={icon}
                color={isActive ? 'primary.500' : 'secondary.500'}
                w="2.5rem"
                h="1.5rem"
              />
              <Text
                maxW={sideToggled ? '13rem' : '0'}
                overflow="hidden"
                _groupHover={{
                  fontWeight: 'bold',
                }}
                whiteSpace="nowrap"
                color={isActive ? 'primary.500' : 'secondary.500'}
                fontWeight={isActive ? 'bold' : 'normal'}
                fontSize="16px">
                {t(label, { defaultValue: label })}
              </Text>
            </HStack>
          </Tooltip>
        </Flex>
      )}
    </NavLink>
  );
};

export default SideBarkLink;
