import type { Meta } from '@storybook/react';
import NotFound from '../NotFound';
import AccessDenied from './AccessDenied';
export default {
  title: 'Components/RoutingError',
  parameters: {},
} as Meta;
const Template = (): JSX.Element => <AccessDenied />;
const Template1 = (): JSX.Element => <NotFound />;

export const _AccessDenied: any = Template.bind({});
export const _NotFound: any = Template1.bind({});
