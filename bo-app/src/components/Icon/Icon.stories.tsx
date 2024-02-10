import type { Meta } from '@storybook/react';
import type { ComponentWithAs } from '@chakra-ui/react';
import { VStack, Text, Flex, Box } from '@chakra-ui/react';
import iconList from 'assets/icons/icons.json';
import { Icon } from '.';
import type { IconsBaseProps } from './Icon';
import { getColor } from 'theme/colors';

export default {
  component: Icon,
  title: 'Components/Icons',
  argTypes: {
    color: {
      options: {
        Primary: getColor('primary'),
        Secondary: getColor('secondary'),
        Tertiary: getColor('tertiary'),
        Quaternary: getColor('quaternary'),
      },
      control: { type: 'select' },
    },
    boxSize: {
      control: {
        type: 'range',
        min: 5,
        max: 20,
      },
    },
    multiColors: {
      control: {
        type: 'multi-select',
      },
      options: {
        Primary: getColor('primary'),
        Secondary: getColor('secondary'),
        Tertiary: getColor('tertiary'),
        Quaternary: getColor('quaternary'),
      },
    },
  },
} as Meta;

const Template = (
  props: ComponentWithAs<'svg', IconsBaseProps>,
): JSX.Element => (
  <Flex flexWrap="wrap">
    {iconList.icons.map(icon => (
      <VStack key={icon.properties.name} me={6} m="3" width="5rem">
        <Box boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px;" p=".8rem">
          <Icon color="blue" displayName={icon.properties.name} {...props} />
        </Box>
        <Text textAlign="center" as="span">
          {icon.properties.name}
        </Text>
      </VStack>
    ))}
  </Flex>
);

export const Icons: any = Template.bind({});

Icons.args = {
  color: getColor('primary'),
  boxSize: 15,
  isMultiColor: false,
  multiColors: [
    getColor('primary'),
    getColor('secondary'),
    getColor('tertiary'),
    getColor('quaternary'),
  ],
};
