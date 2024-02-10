/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense } from 'react';
import Spinner from '../Spinner';

// project imports

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

const Loadable =
  (Component: any) =>
  (props: any): JSX.Element => (
    <Suspense fallback={<Spinner />}>
      <Component {...props} />
    </Suspense>
  );

export default Loadable;
