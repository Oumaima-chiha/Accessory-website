import type { IconProps, ComponentWithAs } from '@chakra-ui/react';
import { Icon as ChakraIcon } from '@chakra-ui/react';
import { useMemo } from 'react';

import iconsList from '../../assets/icons/icons.json';
export interface IconsBaseProps extends IconProps {
  displayName?: string;
  isMultiColor?: boolean;
  multiColors?: string[];
}

const Icon: ComponentWithAs<'svg', IconsBaseProps> = ({
  displayName = '',
  multiColors,
  isMultiColor,
  ...rest
}) => {
  const icon: any = useMemo(() => {
    const currentIcon = iconsList.icons.find(
      iconItem =>
        iconItem.properties.name.toLowerCase() === displayName?.toLowerCase(),
    );
    return {
      viewBox: '0 0 1024 1024',
      d: currentIcon?.icon?.paths?.join(' '),
      multi: {
        paths: currentIcon?.icon?.paths,
      },
    };
  }, [displayName]);

  return (
    <ChakraIcon viewBox={icon?.viewBox} fontSize={'fs-25'} {...rest}>
      {isMultiColor ? (
        icon?.multi?.paths?.map((path: string, index: number) => (
          <path key={index} fill={multiColors?.[index]} d={path} />
        ))
      ) : (
        <path fill="currentColor" d={icon.d} />
      )}
    </ChakraIcon>
  );
};

export { Icon };
