import {
  Button,
  HStack,
  IconButton,
  ScaleFade,
  SimpleGrid,
  Tooltip,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import type { IPaginationResponse } from 'common';
import FormControlInput from 'components/Form/components/FormControlInput';
import FormControlSelect from 'components/Form/components/FormControlSelect';
import { Icon } from 'components/Icon';
import config from 'config/app_config';
import { useFormik } from 'formik';
import { useAppDispatch } from 'hooks';
import type { LazyGetTriggerType, MutationTriggerType } from 'interfaces';
import type { FilterFields } from 'interfaces/filterInputs';
import _ from 'lodash';
import React, { memo, useCallback, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-router-dom';
import { hexToRGB } from 'theme/colors';
import {
  borderRadius,
  disabledButtonStyle,
  tertiaryBgGradient,
} from 'utils/constant';
import { isObjEmpty } from 'utils/functions';
import type * as Yup from 'yup';

interface FilterProps {
  fields: FilterFields<unknown>[];
  actionToDispatch: ActionCreatorWithPayload<any>;
  filterTrigger: LazyGetTriggerType;
  // filterTrigger: LazyQueryTrigger<any>;
  validationSchema?: Yup.ObjectSchema<any>;
  activeFilters?: Record<string, any>;
  setPageCount: React.Dispatch<React.SetStateAction<number | null>>;
  exportTrigger?: {
    isLoading: boolean;
    trigger: MutationTriggerType;
  };
  elementsPerRow?: number;
}

const fieldComponents = {
  text: FormControlInput,
  date: FormControlInput,
  select: FormControlSelect,
};

const Filter = ({
  fields,
  filterTrigger,
  actionToDispatch,
  validationSchema,
  setPageCount,
  exportTrigger,
  elementsPerRow,
}: FilterProps): React.ReactElement => {
  const { isOpen, onToggle } = useDisclosure();
  const { t } = useTranslation(['shared']);
  const dispatch = useAppDispatch();
  const [triggerApi] = filterTrigger();
  const isFilterApplied = useRef(false);

  const initialValues = useMemo(() => {
    return fields.reduce((acc, field) => {
      return {
        ...acc,
        [field.name]: '',
      };
    }, {});
  }, [fields]);

  const filterHandler = useCallback(
    async (filterInputs: Record<string, any>): Promise<void> => {
      try {
        const data = (await triggerApi({
          page: 1,
          size: config.defaultPaginationSize,
          ...filterInputs,
        })?.unwrap()) as IPaginationResponse<unknown>;
        setPageCount(data?.totalPages);
      } catch (err) {
        console.error(err);
      }
    },
    [setPageCount, triggerApi],
  );

  const onFormReset = async (): Promise<void> => {
    if (!isFilterApplied.current && _.values(formik?.values).every(_.isEmpty)) {
      return;
    }

    formik.resetForm();
    await filterHandler({});
    dispatch(actionToDispatch(initialValues));
    isFilterApplied.current = false;
  };
  const formik = useFormik({
    initialValues,
    ...(validationSchema && { validationSchema }),
    onSubmit: async filterInputs => {
      const filterParams = _.pickBy(filterInputs, _.identity);
      if (isObjEmpty(filterParams)) return;
      try {
        await filterHandler(filterParams);
        dispatch(actionToDispatch({ ...filterInputs }));
        isFilterApplied.current = true;
      } catch (error) {
        console.error(error);
      }
    },
  });

  const exportDataHandler = async (): Promise<void> => {
    if (exportTrigger) {
      await exportTrigger.trigger().unwrap();
    }
  };

  return (
    <VStack w="100%">
      <HStack alignSelf="flex-end">
        {exportTrigger && (
          <Tooltip
            label={t('export', { context: 'excel' })}
            textTransform="unset">
            <IconButton
              variant="goldenGradientIconBtn"
              alignSelf="flex-end"
              aria-label="filter"
              isLoading={exportTrigger.isLoading}
              onClick={exportDataHandler}
              _loading={{
                _hover: {
                  opacity: 0.4,
                  bgGradient: tertiaryBgGradient,
                  cursor: 'not-allowed',
                },
              }}
              icon={<Icon color="white" displayName="export" />}
            />
          </Tooltip>
        )}
        <Tooltip label={t('filter')}>
          <IconButton
            variant="gradientIconBtn"
            alignSelf="flex-end"
            aria-label="filter"
            onClick={onToggle}
            icon={<Icon color="white" displayName="filter" />}
          />
        </Tooltip>
      </HStack>
      <ScaleFade
        in={isOpen}
        style={{
          width: '100%',
          borderWidth: '1px',
          borderColor: 'gray.200',
          background: hexToRGB('secondary', 0.03),
          padding: isOpen ? 10 : 0,
          height: isOpen ? 'auto' : 0,
          borderRadius: borderRadius,
        }}>
        {isOpen && (
          <Form onSubmit={formik.handleSubmit}>
            <HStack justifyContent="space-between" alignItems="flex-end">
              <SimpleGrid
                columns={{
                  base: 1,
                  sm: 2,
                  md: 3,
                  lg: 3,
                  xl: elementsPerRow ?? 4,
                }}
                flex={1}
                spacing={5}>
                {fields?.map((field, index) => {
                  const FieldComponent = fieldComponents[field?.type];
                  if (FieldComponent) {
                    return (
                      <FieldComponent
                        key={index}
                        formik={formik}
                        label={field?.label}
                        name={field?.name}
                        type={field?.type}
                        dir={field?.dir}
                        namespace={field?.namespace}
                        options={field?.options ?? []}
                        onChange={(change): void => {
                          if (field?.type === 'select') {
                            formik.setFieldValue(field?.name, change?.value);
                          } else {
                            formik.handleChange(change);
                          }
                        }}
                      />
                    );
                  }
                  return null;
                })}
              </SimpleGrid>
              <HStack>
                <Button
                  w="98px"
                  h="42px"
                  isDisabled={isObjEmpty(_.pickBy(formik?.values, _.identity))}
                  _disabled={disabledButtonStyle}
                  type="submit">
                  {t('apply', { ns: 'common' })}
                </Button>
                <Button
                  h="42px"
                  onClick={onFormReset}
                  variant="outline"
                  w="98px">
                  {t('reset', { ns: 'common' })}
                </Button>
              </HStack>
            </HStack>
          </Form>
        )}
      </ScaleFade>
    </VStack>
  );
};

export default memo(Filter);
