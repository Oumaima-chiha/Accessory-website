import {
  Box,
  FormLabel,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { Icon } from 'components/Icon';
import type { resources } from 'config/i18n/i18n';
import type { CSSProperties } from 'react';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface ISelect {
  label: string;
  value: string | number;
}

export interface SelectInputProps {
  defaultValue?: number | string | string[];
  onChange: (data: ISelect) => void;
  options: ISelect[];
  label?: string;
  style?: CSSProperties;
  isDisabled?: boolean;
  readOnly?: boolean;
  isForm?: boolean;
  value?: string | number;
  namespace?: keyof (typeof resources)['en'];
}

const CustomSelect: React.FC<SelectInputProps> = ({
  label,
  onChange,
  options,
  style,
  value,
  defaultValue,
  isDisabled = false,
  readOnly = false,
  isForm = false,
  namespace,
}) => {
  // const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState({} as ISelect);
  const { t } = useTranslation(['fields']);
  const handleOptionClick = (option): void => {
    setSelectedOption(option);
    onChange && onChange(option);
  };

  useEffect(() => {
    if (!value) {
      setSelectedOption({} as ISelect);
    }
  }, [value]);

  const _defaultValue = useMemo(
    () =>
      options
        ? options?.find(
            option =>
              option?.value?.toString()?.toLowerCase() ===
              defaultValue?.toString()?.toLowerCase(),
          )
        : 'Select',
    [defaultValue, options],
  );

  const displayedValue = useMemo(
    () =>
      selectedOption?.value !== 'Select'
        ? selectedOption?.label ||
          (typeof _defaultValue === 'object' && _defaultValue?.label) ||
          'select'
        : _defaultValue?.toString() || 'select',
    [_defaultValue, selectedOption?.label, selectedOption?.value],
  );

  return (
    <Box
      display="flex"
      alignItems={'center'}
      justifyContent="start"
      w={isForm ? '100%' : 'auto'}
      style={style}>
      {label && (
        <FormLabel display={'flex'} fontSize="fs-14">
          {label}
        </FormLabel>
      )}
      <Menu matchWidth>
        <MenuButton
          disabled={isDisabled || readOnly}
          w="100%"
          py={2}
          type="button">
          <HStack
            alignItems={'center'}
            justifyContent="space-between"
            px={isForm ? 2 : 0}>
            <Text
              color={'secondary.500'}
              pt={1}
              opacity={displayedValue === 'select' ? 0.8 : 1}
              fontWeight={isForm ? 'normal' : 'bold'}>
              {t(displayedValue, {
                defaultValue: displayedValue,
                ns:
                  displayedValue === 'select'
                    ? 'fields'
                    : namespace ?? 'fields',
              })}
            </Text>
            {!isDisabled && !readOnly && (
              <Icon fontSize="fs-10" displayName="dropdown-arrow-down" />
            )}
          </HStack>
        </MenuButton>
        <MenuList>
          {options.map(option => (
            <MenuItem
              key={option.value}
              onClick={(): void => handleOptionClick(option)}>
              <Text>
                {t(option.label, {
                  defaultValue: option.label,
                  ns: namespace ?? 'fields',
                })}
              </Text>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default CustomSelect;
