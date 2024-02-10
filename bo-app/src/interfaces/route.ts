/* eslint-disable @typescript-eslint/no-explicit-any */
import { type JSXElementConstructor, type ReactElement } from 'react';

export enum RouteEnum {
  PUBLIC = 'public',
  PRIVATE = 'private',
}
export interface IRoute {
  path: string;
  element:
    | ReactElement<any, string | JSXElementConstructor<any>>
    | null
    | undefined
    | any;
  name: string;
  permissions: string[] | null;
  private?: boolean;
}
