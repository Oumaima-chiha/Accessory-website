import type { Meta } from '@storybook/react';
import AppLoader from './AppLoader';
import Spinner from './Spinner';
export default {
  title: 'Components/Loaders',
  parameters: {},
} as Meta;

const Loader1 = (): JSX.Element => <AppLoader />;
const Loader2 = (): JSX.Element => <Spinner fullScreen={true} />;

export const _AppLoader: any = Loader1.bind({});
export const _RoutingLoader: any = Loader2.bind({});
