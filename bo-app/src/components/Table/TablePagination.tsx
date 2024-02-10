import {
  ArrowBackIcon,
  ArrowForwardIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from '@chakra-ui/icons';
import {
  Flex,
  IconButton,
  NumberInput,
  NumberInputField,
  Text,
} from '@chakra-ui/react';
import type { PaginationState, Table } from '@tanstack/react-table';
import Select from 'components/Select';
import type { ISelect } from 'components/Select/Select';
import type { IPaginationResponse, LazyGetTriggerType } from 'interfaces';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getColor } from 'theme/colors';

const TablePagination = ({
  table,
  loadMoreTrigger,
  setPagination,
  setPageCount,
  activeFilters,
}: {
  table: Table<any>;
  loadMoreTrigger: LazyGetTriggerType;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
  setPageCount: React.Dispatch<React.SetStateAction<number | null>>;
  activeFilters?: Record<string, any>;
}): JSX.Element => {
  const { t } = useTranslation('fields');
  const [triggerApi] = loadMoreTrigger();
  const [isPageInputInvalid, setPageInputInvalid] = useState(false);
  const [pageLoading, setPageLoading] = useState({
    nextPage: false,
    lastPage: false,
  });

  const onNextPage = (isLastPage: boolean) => async () => {
    try {
      setPageLoading({
        nextPage: !isLastPage,
        lastPage: isLastPage,
      });
      const data = (await triggerApi(
        {
          page: isLastPage
            ? table?.getPageCount()
            : table?.getState()?.pagination?.pageIndex + 2,
          size: table?.getState()?.pagination?.pageSize,
          ...activeFilters,
        },
        true,
      )?.unwrap()) as IPaginationResponse<unknown>;
      setPagination({
        pageIndex: data?.currentPage - 1,
        pageSize: data?.pageSize,
      });
      setPageLoading({
        nextPage: false,
        lastPage: false,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const showMoreHandler = async (page: ISelect): Promise<void> => {
    try {
      const data = (await triggerApi(
        {
          page: table?.getState()?.pagination?.pageIndex + 1,
          size: page?.value,
          ...activeFilters,
        },
        true,
      )?.unwrap()) as IPaginationResponse<unknown>;
      setPageCount(data?.totalPages);
      setPagination({
        pageIndex: data?.currentPage - 1,
        pageSize: data?.pageSize,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const goToPageHandler = async (pageNumber: string): Promise<void> => {
    const pageInput = Number(pageNumber);
    if (pageInput > table.getPageCount() || pageInput < 1) {
      setPageInputInvalid(true);
      return;
    }
    isPageInputInvalid && setPageInputInvalid(false);

    try {
      const data = (await triggerApi({
        page: pageInput,
        size: table?.getState()?.pagination?.pageSize,
        ...activeFilters,
      })?.unwrap()) as IPaginationResponse<unknown>;
      if (data?.content?.length) {
        setPagination({
          pageIndex: data?.currentPage - 1,
          pageSize: data?.pageSize,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Flex alignItems="center">
      <Flex alignItems="center" margin="auto">
        <IconButton
          px={5}
          variant="iconButtonTransparent"
          bg="transparent"
          onClick={(): void => table.setPageIndex(0)}
          isDisabled={!table.getCanPreviousPage()}
          color="secondary.500"
          icon={<ArrowLeftIcon />}
          aria-label={'first-page'}
          w="auto"
        />
        <IconButton
          px={5}
          variant="iconButtonTransparent"
          bg="transparent"
          onClick={(): void => table.previousPage()}
          isDisabled={!table.getCanPreviousPage()}
          color="secondary.500"
          icon={<ArrowBackIcon />}
          aria-label={'previous-page'}
          w="auto"
        />
        <IconButton
          px={5}
          variant="iconButtonTransparent"
          bg="transparent"
          isLoading={pageLoading?.nextPage}
          onClick={onNextPage(false)}
          isDisabled={!table.getCanNextPage() || pageLoading?.lastPage}
          color="secondary.500"
          icon={<ArrowForwardIcon />}
          aria-label={'next-page'}
          w="auto"
        />
        <IconButton
          px={5}
          variant="iconButtonTransparent"
          bg="transparent"
          onClick={onNextPage(true)}
          isLoading={pageLoading?.lastPage}
          isDisabled={!table.getCanNextPage() || pageLoading?.nextPage}
          color="secondary.500"
          icon={<ArrowRightIcon />}
          aria-label={'last-page'}
          w="auto"
        />

        <Flex gap={1}>
          <Text color="secondary.500">{t('table_pagination.page')} </Text>
          <Text color="secondary.500" fontWeight="bold">
            {table.getState().pagination.pageIndex + 1}{' '}
            {t('table_pagination.of')} {table.getPageCount()}
          </Text>
        </Flex>
      </Flex>
      <Flex alignItems="center" gap={5}>
        <Flex alignItems="center" gap={2}>
          <Text>{t('table_pagination.go_to_page')}:</Text>
          <NumberInput
            textAlign="center"
            defaultValue={1}
            min={1}
            isValidCharacter={(char): boolean => {
              if (/^[0-9]$/.test(char)) {
                isPageInputInvalid && setPageInputInvalid(false);
                return true;
              }
              setPageInputInvalid(true);
              return false;
            }}
            max={table.getPageCount()}
            isInvalid={isPageInputInvalid}
            keepWithinRange={false}
            clampValueOnBlur={false}
            onChange={goToPageHandler}
            w="50px">
            <NumberInputField
              _focus={{
                borderColor: isPageInputInvalid
                  ? 'red !important'
                  : 'secondary.500',
                boxShadow: `0 0 0 1px ${
                  isPageInputInvalid ? 'red' : getColor('secondary')
                } `,
              }}
            />
          </NumberInput>
        </Flex>
        <Select
          defaultValue={table.getState().pagination.pageSize}
          onChange={showMoreHandler}
          options={[
            {
              label: `${t('table_pagination.show')} 5`,
              value: '5',
            },
            {
              label: `${t('table_pagination.show')} 10`,
              value: '10',
            },
            {
              label: `${t('table_pagination.show')} 20`,
              value: '20',
            },
          ]}
        />
      </Flex>
    </Flex>
  );
};

export default TablePagination;
