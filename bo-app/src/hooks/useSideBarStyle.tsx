/* eslint-disable react-hooks/exhaustive-deps */
import type { BoxProps } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
interface useSideBarStyleProps {
  sideToggled: boolean;
}
const useSideBarStyle = ({
  sideToggled,
}: useSideBarStyleProps): Record<string, BoxProps> => {
  const { i18n } = useTranslation();
  const sideBarStyle: BoxProps = useMemo(
    () => ({
      w: '280px',
      maxW: '100%',
      h: '100%',
      bg: 'white',
      position: 'fixed',
      height: { base: '100vh', lg: '100%' },
      insetStart: 0,
      padding: '20px 0',
      transition: 'all 400ms cubic-bezier(0.25, 0.1, 0.25, 1)',
      fontSize: 'fs-13',
      overflow: 'hidden',
      zIndex: '999',
    }),
    [],
  );
  const toggledSideBarStyle = useMemo(
    () =>
      sideToggled
        ? sideBarStyle
        : {
            ...sideBarStyle,
            w: { base: '0', md: '0', lg: '97px' },
            zIndex: { base: '20', md: '20' },
          },
    [sideToggled, sideBarStyle],
  );
  const layoutStyle: BoxProps = useMemo(
    () => ({
      bg: 'white',
      transition: 'all 400ms cubic-bezier(0.25, 0.1, 0.25, 1)',
      ...(i18n?.dir() === 'ltr'
        ? { ms: { base: 0, lg: '280px' } }
        : { me: { base: 0, lg: '280px' } }),
      w: { base: '100vw', lg: 'calc(100vw - 280px)' },
      position: 'relative',
      height: 'calc(100vh - 40px)',
    }),
    [i18n?.language],
  );
  const toggledLayoutStyle = useMemo(
    () =>
      sideToggled
        ? layoutStyle
        : {
            ...layoutStyle,
            ...(i18n?.dir() === 'ltr'
              ? { ms: { base: 0, lg: '90px' } }
              : { me: { base: 0, lg: '90px' } }),
            w: { base: '', lg: 'calc(100vw - 97px)' },
            h: 'calc(100vh - 35px)',
          },
    [i18n?.language, layoutStyle, sideToggled],
  );
  return { toggledSideBarStyle, sideBarStyle, toggledLayoutStyle };
};

export default useSideBarStyle;
