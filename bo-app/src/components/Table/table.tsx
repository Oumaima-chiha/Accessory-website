/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  AddIcon,
  RepeatIcon,
  TriangleDownIcon,
  TriangleUpIcon,
} from '@chakra-ui/icons';
import {
  Box,
  chakra,
  Divider,
  Flex,
  Heading,
  HStack,
  IconButton,
  Tbody,
  Thead,
  Tooltip,
  Tr,
  VStack,
} from '@chakra-ui/react';
import type { PaginationState } from '@tanstack/react-table';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import EmptyData from 'components/EmptyData';
import Filter from 'components/Filter';
import Loader from 'components/Loaders/Spinner/Spinner';
import config from 'config/app_config';
import { useAppDispatch } from 'hooks';
import usePermissions from 'hooks/usePermissions';
import type { ActionsType, DataTableProps } from 'interfaces';
import _ from 'lodash';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  primaryBgGradient,
  scrollbarStyle,
  secondaryBgGradient,
} from 'utils/constant';
import {
  capitalizeWords,
  isDate,
  isObjEmpty,
  stringToDate,
} from 'utils/functions';
import ActionButtons from './ActionButtons';
import { StyledTable, StyledTd, StyledTh } from './styles';
import TablePagination from './TablePagination';

const DataTable = ({
  data,
  columns,
  title,
  hasBorder = true,
  minH,
  canRefetch,
  addOptions,
  queryTrigger,
  filter = null,
  exportTrigger,
}: DataTableProps<any>): JSX.Element => {
  const { t } = useTranslation();
  const columnHelper = createColumnHelper<typeof data>();
  const { isSuperAdmin } = usePermissions({});
  const dispatch = useAppDispatch();
  const _actions: any = columns?.filter(
    (_col: any) => _col?.actions?.length,
  )[0];
  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: config.defaultPaginationSize,
    });
  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  );
  const [pageCount, setPageCount] = React.useState<number | null>(null);
  const displayedColumns =
    _actions &&
    _actions?.actions?.filter(
      (act: ActionsType) => act?.isShown || isSuperAdmin,
    )?.length === 0
      ? columns?.filter(col => col?.accessor !== 'action')
      : columns;

  const _columns: any = displayedColumns?.map((column: any) =>
    columnHelper.accessor(column?.accessor.toString(), {
      cell: info =>
        column?.getRowData
          ? column?.cell(info?.row?.original)
          : column?.cell
          ? column?.cell(info.getValue())
          : (isObjEmpty(info?.getValue() as Record<string, any>) ||
              !info?.getValue()) &&
            column?.accessor !== 'action'
          ? '-'
          : typeof info?.getValue() === 'string' &&
            isDate(info?.getValue() as string)
          ? stringToDate(info?.getValue() as string)
          : column?.capitalizeField
          ? capitalizeWords(info?.getValue() as string)
          : info?.getValue(),
      header: column?.header,

      size: column?.size,
    }),
  );
  const [triggerApi, { data: apiData, isFetching }] = queryTrigger();

  const table = useReactTable({
    columns: _columns,
    data: data ?? [],
    enableSorting: false,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination,
    },
    pageCount: pageCount ?? apiData?.totalPages,
    autoResetPageIndex: false,
  });

  React.useEffect(() => {
    triggerApi({ page: 1, size: config.defaultPaginationSize }, true);

    return () => {
      if (
        filter?.activeFilters &&
        !isObjEmpty(filter?.activeFilters) &&
        filter?.resetApiState
      ) {
        dispatch(filter?.resetApiState());
        filter?.destroyFilterAction && dispatch(filter?.destroyFilterAction());
      }
    };
  }, []);

  React.useEffect(() => {
    if (
      table?.getRowModel()?.rows?.length === 0 &&
      table.getCanPreviousPage()
    ) {
      table?.previousPage();
    }
  }, [table.getRowModel().rows]);

  const refetchApi = (): void => {
    const filterParams = _.pickBy(filter?.activeFilters, _.identity);
    try {
      triggerApi({
        page: table?.getState()?.pagination?.pageIndex + 1,
        size: table?.getState()?.pagination?.pageSize,
        ...filterParams,
      }).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <VStack alignItems="start" pt="2rem" w="100%">
      {title && (
        <Box>
          <Heading
            fontSize={20}
            bgGradient={secondaryBgGradient}
            bgClip="text"
            css={{
              WebkitBackgroundClip: 'text',
            }}>
            {title}
          </Heading>
          <Divider borderColor="secondary.50" w={70} />
        </Box>
      )}
      <HStack alignItems="flex-start" justifyContent="flex-end" w="100%">
        {filter && (
          <Filter
            filterTrigger={queryTrigger}
            setPageCount={setPageCount}
            exportTrigger={exportTrigger}
            {...filter}
          />
        )}
      </HStack>
      <Box
        w="100%"
        display="flex"
        flexDir="column"
        justifyContent="space-between"
        {...(hasBorder && {
          borderRadius: 8,
          border: '1px',
          borderColor: 'gray.200',
          padding: 5,
        })}
        overflow="auto"
        sx={scrollbarStyle}>
        <Flex flexDir="column">
          <Flex justifyContent="flex-end" gap={5}>
            {canRefetch && (
              <Tooltip label={t('shared:refetch')}>
                <IconButton
                  alignSelf={'flex-end'}
                  size="xs"
                  aria-label="Refresh"
                  icon={<RepeatIcon boxSize={5} />}
                  onClick={refetchApi}
                />
              </Tooltip>
            )}
            {addOptions?.addFunction && (
              <Tooltip
                label={
                  addOptions?.fullLabel
                    ? addOptions?.fullLabel
                    : `${t('add', { ns: 'shared' })} ${addOptions?.label}`
                }>
                <IconButton
                  alignSelf={'flex-end'}
                  size="xs"
                  bgGradient={primaryBgGradient}
                  aria-label="Create"
                  icon={<AddIcon boxSize={5} />}
                  onClick={addOptions?.addFunction}
                />
              </Tooltip>
            )}
          </Flex>
          {isFetching ? (
            <Box
              minH={minH ?? '38rem'}
              w="100%"
              display="flex"
              alignItems={'center'}
              justifyContent="center">
              <Loader boxSize="2rem" />
            </Box>
          ) : (
            <Flex
              flexDir="column"
              justifyContent="space-between"
              minH={
                data?.length === 0 && table.getRowModel()?.rows?.length === 0
                  ? '10rem'
                  : table.getRowModel().rows?.length < 5 && pageIndex === 0
                  ? 'auto'
                  : '38rem'
              }>
              <StyledTable>
                <Thead>
                  {table.getHeaderGroups().map(headerGroup => (
                    <Tr key={headerGroup.id}>
                      {headerGroup.headers.map(header => {
                        const meta: any = header.column.columnDef.meta;
                        return (
                          <StyledTh
                            key={header.id}
                            onClick={header.column.getToggleSortingHandler()}
                            isNumeric={meta?.isNumeric}
                            color="secondary.500">
                            {flexRender(
                              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                              // @ts-ignore
                              t(header.column.columnDef.header),
                              header.getContext(),
                            )}
                            <chakra.span pl="4">
                              {header.column.getIsSorted() ? (
                                header.column.getIsSorted() === 'desc' ? (
                                  <TriangleDownIcon aria-label="sorted descending" />
                                ) : (
                                  <TriangleUpIcon aria-label="sorted ascending" />
                                )
                              ) : null}
                            </chakra.span>
                          </StyledTh>
                        );
                      })}
                    </Tr>
                  ))}
                </Thead>
                <Tbody minH={minH ?? '35rem'}>
                  {table.getRowModel()?.rows?.map(row => {
                    return (
                      <Tr key={row.id}>
                        {row.getVisibleCells().map(cell => {
                          const meta: any = cell.column.columnDef.meta;
                          return (
                            <StyledTd
                              key={cell.id}
                              isNumeric={meta?.isNumeric}
                              isTruncated
                              style={
                                cell.id?.includes('_action')
                                  ? {
                                      maxWidth: 300,
                                      minWidth: 100,
                                      width: 80,
                                      fontSize: 16,
                                    }
                                  : {
                                      minWidth: cell?.column?.getSize(),
                                      maxWidth: 200,
                                      fontSize: 16,
                                    }
                              }>
                              {!cell.id?.includes('customComponent') &&
                                flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext(),
                                )}
                              {cell.id?.includes('_action') && (
                                <ActionButtons
                                  key={cell.id + Math.random() * Math.random()}
                                  actions={_actions?.actions}
                                  data={{ ...row?.original }}
                                />
                              )}
                            </StyledTd>
                          );
                        })}
                      </Tr>
                    );
                  })}
                </Tbody>
              </StyledTable>
              {(!data ||
                (data?.length === 0 &&
                  table.getRowModel().rows?.length === 0)) && (
                // <Text alignSelf="center">No Data Found</Text>
                <EmptyData />
              )}
              {table.getRowModel().rows?.length ? (
                <TablePagination
                  table={table}
                  loadMoreTrigger={queryTrigger}
                  setPagination={setPagination}
                  setPageCount={setPageCount}
                  activeFilters={filter?.activeFilters}
                />
              ) : (
                <></>
              )}
            </Flex>
          )}
        </Flex>
      </Box>
    </VStack>
  );
};
export default React.memo(DataTable);
