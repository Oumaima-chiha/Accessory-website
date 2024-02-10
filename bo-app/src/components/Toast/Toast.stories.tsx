import type { Meta } from '@storybook/react';
import { Button } from '@chakra-ui/react';
import CreateOutsideToast from './Toast';

export default {
  title: 'components/toast',
  argTypes: {
    title: {
      defaultValue: 'test',
      control: { type: 'text' },
      description: 'string (default Error)',
    },
    description: {
      defaultValue: 'test',
      control: { type: 'text' },
      description: 'string ',
    },
    status: {
      options: ['success', 'info', 'error', 'warning'],
      defaultValue: 'success',
      control: { type: 'select' },
      description: 'string (default error',
    },
  },
} as Meta;

const Template = (props: any): JSX.Element => {
  const openModal = (): void => CreateOutsideToast({ ...props });
  return <Button onClick={openModal}>Open Toast</Button>;
};

export const toast = Template.bind({});
