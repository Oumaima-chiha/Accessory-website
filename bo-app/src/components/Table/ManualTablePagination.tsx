import {
  ArrowBackIcon,
  ArrowForwardIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from '@chakra-ui/icons';
import { Flex, IconButton, Input, Text } from '@chakra-ui/react';
import type { Table } from '@tanstack/react-table';
import Select from 'components/Select';
import { useTranslation } from 'react-i18next';

const ManualTablePagination = ({
  table,
}: {
  table: Table<any>;
}): JSX.Element => {
  const { t } = useTranslation('fields');

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
          onClick={(): void => table.nextPage()}
          isDisabled={!table.getCanNextPage()}
          color="secondary.500"
          icon={<ArrowForwardIcon />}
          aria-label={'next-page'}
          w="auto"
        />
        <IconButton
          px={5}
          variant="iconButtonTransparent"
          bg="transparent"
          onClick={(): void => table.setPageIndex(table.getPageCount() - 1)}
          isDisabled={!table.getCanNextPage()}
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
          <Input
            type="number"
            textAlign="center"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e): void => {
              const pageInput = Number(e.target.value);
              if (pageInput > table.getPageCount()) {
                return e.preventDefault();
              }
              const page = pageInput ? pageInput - 1 : 0;
              table.setPageIndex(page);
            }}
            w="50px"
          />
        </Flex>
        <Select
          defaultValue={table.getState().pagination.pageSize}
          onChange={(_page): void => {
            table.setPageSize(+_page?.value);
          }}
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

export default ManualTablePagination;
