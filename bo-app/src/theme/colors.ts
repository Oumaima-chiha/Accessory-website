// ! IMPORTANT: default color must be 500.
// ! IMPORTANT: 600 is hover color

import { theme } from '@chakra-ui/react';
import {SharedColors} from 'common';

const sharedColors: Record<SharedColors, Record<number, string>> = {
  [SharedColors.PRIMARY]: {
    50: '#c58a9c',
    100: '#b97388',
    200: '#ad5b74',
    300: '#a14460',
    400: '#962c4c',
    500: '#8A1538',
    600: '#7c1332',
    700: '#6e112d',
    800: '#610f27',
    900: '#530d22',
  },
  [SharedColors.SECONDARY]: {
    50: '#6e8ea0',
    100: '#6e8ea0',
    200: '#567b90',
    300: '#3d6881',
    400: '#255571',
    500: '#0D4261',
    600: '#0c3b57',
    700: '#0a354e',
    800: '#092e44',
    900: '#08283a',
  },
  [SharedColors.TERTIARY]: {
    5: '#dad4c8',
    10: '#d1caba',
    50: '#c7bfac',
    100: '#beb49e',
    200: '#beb49e',
    300: '#b5a991',
    400: '#ab9f83',
    500: '#a29475',
    600: '#928569',
    700: '#82765e',
    800: '#716852',
    900: '#615946',
  },
  [SharedColors.QUATERNARY]: {
    50: '#f9e4ef',
    100: '#f7dfec',
    200: '#fef7bb',
    300: '#fdf5b1',
    400: '#fdf4a8',
    500: '#FDF39E',
    600: '#e4db8e',
    700: '#cac27e',
    800: '#a98d9c',
    900: '#917986',
  },
  [SharedColors.QUINARY]: {
    50: '#80ccec',
    100: '#66c2e8',
    200: '#4db8e4',
    300: '#67a9c2',
    400: '#549fbb',
    500: '#4194B3',
    600: '#3b85a1',
    700: '#34768f',
    800: '#2e687d',
    900: '#27596b',
  },
  [SharedColors.SENARY]: {
    50: '#80cec0',
    100: '#66c4b3',
    200: '#4dbaa6',
    300: '#33b099',
    400: '#1aa68d',
    500: '#009C80',
    600: '#008c73',
    700: '#007d66',
    800: '#006d5a',
    900: '#005e4d',
  },
  [SharedColors.ORANGE]: {
    100: '#ffe0b2',
    200: '#ffcc80',
    300: '#ffcc80',
    400: '#ffa726',
    500: '#ff9800',
    600: '#fb8c00',
    700: '#f57c00',
    800: '#ef6c00',
    900: '#e65100',
  },
  [SharedColors.BLACK]: {
    500: '#000000',
  },
  [SharedColors.WHITE]: {
    500: '#ffffff',
  },
};


const colors: Record<string, Record<number, string>> = {
  ...theme.colors,
  ...sharedColors,
};

export const hexToRGB = (
  color: string,
  alpha?: number,
  op?: number,
): string => {
  const hex = getColor(color, op);
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const a = alpha ? `, ${alpha}` : '';

  return `rgba(${r},${g},${b}${a})`;
};

export const getColor = (color = 'primary', opacity = 500): string =>
  colors[color][opacity];

export default colors;
