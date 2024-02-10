/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  HStack,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { memo, useEffect, useLayoutEffect, useMemo, useState } from 'react';

import { Icon } from 'components/Icon';
import type { ICategory, IPermission } from 'models';
import { borderRadius } from 'utils/constant';
import type { IRoleComponentProps } from '../interfaces/roleItemProps';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'hooks';

const PermissionsContainer = ({
  retrievedRole,
  setCheckedItems,
  checkedItems,
  readyOnly,
  errorMessage,
  showErrorMessage,
}: IRoleComponentProps): JSX.Element => {
  const categoriesList = useAppSelector(state => state.roles.categories);
  const { t } = useTranslation(['role']);
  const [principleModules, setPrincipleModules] = useState<ICategory[]>([]);

  useEffect(() => {
    if (retrievedRole && retrievedRole?.permissions?.length) {
      setCheckedItems(retrievedRole?.permissions);
    }
  }, [retrievedRole?.permissions?.length]);

  useLayoutEffect(() => {
    if (categoriesList.length) {
      const objectKeyMapper = {};
      const principleModulesKeeper = categoriesList
        ?.map(item => {
          if (Object.keys(objectKeyMapper).includes(item.id.toString())) return;
          objectKeyMapper[item.id] = true;
          const { id, name, permissions } = item;
          return {
            id,
            name,
            permissions: permissions?.filter(
              childrenItem => childrenItem?.categoryId === id,
            ),
          };
        })
        ?.filter(item => item !== undefined) as ICategory[];
      if (principleModulesKeeper) {
        setPrincipleModules(principleModulesKeeper);
      }
    }
  }, [categoriesList]);

  const isItemChecked = (itemId: number): boolean => {
    return checkedItems.find(item => item.id === itemId) ? true : false;
  };

  const allItemPrincipleModuleItemsChecked = (item: ICategory): boolean => {
    const ids = item.permissions?.map(childrenItem => childrenItem.id);
    return ids?.every(id =>
      checkedItems.find(checkedItem => checkedItem.id === id),
    );
  };

  const allPrincipleModuleItemsChecked = useMemo(() => {
    const items = principleModules?.map(item => item?.permissions?.length);
    const total = items?.reduce((prev, current) => prev + current, 0);
    return total === checkedItems?.length;
  }, [checkedItems, principleModules?.length]);

  const deleteItemsChecked = (categoryId: number): void => {
    setCheckedItems(previousItems => {
      return previousItems.filter(
        currItem => currItem.categoryId !== categoryId,
      );
    });
  };

  const addItem = (items: ICategory): IPermission[] => {
    const itemsToBeAdded: IPermission[] = [];
    items.permissions.forEach(item => {
      if (!isItemChecked(item.id)) {
        itemsToBeAdded.push(item);
      }
    });
    return itemsToBeAdded;
  };

  return (
    <FormControl isInvalid={errorMessage}>
      <Flex flexDirection={'column'} gap={25} w="100%">
        {!readyOnly && (
          <Stack w="fit-content">
            <HStack w="100%">
              <Box me={'5px'}>
                <Button
                  type="submit"
                  bg="secondary.500"
                  w="100px"
                  isDisabled={allPrincipleModuleItemsChecked}
                  _disabled={{
                    opacity: '0.4',
                    _hover: {
                      bg: 'secondary.500',
                      cursor: 'not-allowed',
                    },
                  }}
                  onClick={(): void => {
                    principleModules?.forEach(item =>
                      setCheckedItems(previousItems => [
                        ...previousItems,
                        ...addItem(item),
                      ]),
                    );
                  }}>
                  {t('check_all')}
                </Button>
              </Box>
              <Box ms={'5px'}>
                <Button
                  type="reset"
                  variant="outline"
                  onClick={(): void => setCheckedItems([])}>
                  {t('uncheck_all')}
                </Button>
              </Box>
            </HStack>
          </Stack>
        )}

        <SimpleGrid
          columns={4}
          minChildWidth="260px"
          spacing="40px"
          borderWidth={2}
          borderColor="gray.200"
          borderRadius={borderRadius}
          p={10}>
          {principleModules?.map(item => {
            return (
              <Stack key={item?.id}>
                <Flex position="relative">
                  <Icon
                    position="absolute"
                    left="-5"
                    displayName={'arrow-right-2'}
                  />
                  <Checkbox
                    isChecked={allItemPrincipleModuleItemsChecked(item)}
                    readOnly={readyOnly}
                    isInvalid={errorMessage}
                    onChange={(e): void => {
                      if (e.target.checked) {
                        errorMessage && showErrorMessage(false);
                        setCheckedItems(previousItems => [
                          ...previousItems,
                          ...addItem(item),
                        ]);
                      } else {
                        deleteItemsChecked(item.id);
                      }
                    }}>
                    <Text color={'secondary.500'} fontWeight="bold">
                      {item.name}
                    </Text>
                  </Checkbox>
                </Flex>
                <Stack pl={6} mt={1} spacing={1}>
                  {item.permissions?.map(childrenItem => {
                    if (item.id === childrenItem.categoryId)
                      return (
                        <Checkbox
                          key={childrenItem.id}
                          readOnly={readyOnly}
                          isInvalid={errorMessage}
                          isChecked={isItemChecked(childrenItem.id)}
                          onChange={(e): void => {
                            errorMessage && showErrorMessage(false);
                            if (e.target.checked) {
                              setCheckedItems(previousItems => [
                                ...previousItems,
                                childrenItem,
                              ]);
                            } else {
                              setCheckedItems(previousItems =>
                                previousItems.filter(
                                  prev => prev.id !== childrenItem.id,
                                ),
                              );
                            }
                          }}>
                          {childrenItem?.name}
                        </Checkbox>
                      );
                  })}
                </Stack>
              </Stack>
            );
          })}
        </SimpleGrid>
        <FormErrorMessage m={0}>
          {t('at_least_one_permission', { ns: 'errors' })}
        </FormErrorMessage>
      </Flex>
    </FormControl>
  );
};

export default memo(PermissionsContainer);
