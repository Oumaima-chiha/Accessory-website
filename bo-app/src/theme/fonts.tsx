import { Global } from '@emotion/react';
import LusailBold from 'assets/fonts/Lusail-Bold.otf';
import LusailLight from 'assets/fonts/Lusail-Light.otf';
import LusailMedium from 'assets/fonts/Lusail-Medium.otf';
import LusailRegular from 'assets/fonts/Lusail-Regular.otf';

export const customFonts = {
  heading: 'lusail-bold',
  body: 'lusail-regular',
};

export const Fonts = (): JSX.Element => (
  <Global
    styles={`
      @font-face {
        font-family: 'lusail-regular';
        font-style: normal;
        font-weight: 500;
        font-display: swap;
        src: local('lusail-regular'), url(${LusailRegular}) format('truetype');
      }
      @font-face {
        font-family: 'lusail-bold';
        font-style: normal;
        font-weight: 500;
        font-display: swap;
        src: local('lusail-bold'),  url(${LusailBold}) format('truetype');
      }
      @font-face {
        font-family: 'lusail-medium';
        font-style: normal;
        font-weight: 500;
        font-display: swap;
        src: local('lusail-medium'),  url(${LusailMedium}) format('truetype');
      }
      @font-face {
        font-family: 'lusail-light';
        font-style: normal;
        font-weight: 500;
        font-display: swap;
        src: local('lusail-light'),  url(${LusailLight}) format('truetype');
      }
      `}
  />
);
