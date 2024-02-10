import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { Button, Flex } from '@chakra-ui/react';
import type { FC } from 'react';
import { memo, useEffect, useState, useCallback } from 'react';

interface PaginationProps {
  lastPage?: number;
  firstPage?: number;
  apiCall?: (page: number) => void;
  page: number;
}

const Pagination: FC<PaginationProps> = props => {
  const { firstPage = 1, lastPage = 1, apiCall, page } = props;
  const [paginationList, setPaginationList] = useState<(string | number)[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(page);

  const formatPagination = useCallback(
    (page: number): void => {
      if (lastPage < 5) {
        setPaginationList(Array.from({ length: lastPage }, (_, i) => i + 1));
      } else if (firstPage === page) {
        setPaginationList([1, 2, 'spreader', lastPage - 1, lastPage]);
      } else if (lastPage === page) {
        setPaginationList([1, 2, 'spreader', lastPage - 1, lastPage]);
      } else if (lastPage - 1 === page) {
        setPaginationList([1, 2, 'spreader', page - 1, page, lastPage]);
      } else {
        const list = Array.from(
          new Set([
            page - 1,
            page,
            page + 1,
            'spreader',
            lastPage - 1,
            lastPage,
          ]),
        );
        if (list.indexOf('spreader') + 1 === lastPage) {
          list.splice(list.indexOf('spreader'), 1);
        }
        const element1 = list.lastIndexOf('spreader') - 1;
        const element2 = list.lastIndexOf('spreader') + 1;
        if (element1 + 1 === element2) {
          list.splice(list.lastIndexOf('spreader'), 1);
        }
        if (page - 1 > 2) {
          list.unshift(1, 'spreader');
        } else if (page - 1 === 2) {
          list.unshift(1);
        }

        setPaginationList(list);
      }
    },
    [firstPage, lastPage],
  );

  useEffect(() => {
    if (lastPage < 5) {
      setPaginationList(Array.from({ length: lastPage }, (_, i) => i + 1));
    } else {
      setPaginationList([1, 2, 'spreader', lastPage - 1, lastPage]);
    }
  }, [lastPage]);

  useEffect(() => {
    if (page) {
      setCurrentPage(page);
      formatPagination(page);
    }
  }, [page, formatPagination]);

  const handleClick = (page: number): void => {
    if (page === currentPage) return;
    setCurrentPage(page);
    if (apiCall) apiCall(page - 1);
    formatPagination(page);
  };

  return (
    <Flex alignItems="center" justifyContent="center" w="100%">
      <Flex w="20%">
        <Button
          size="xs"
          bg="primary.100"
          onClick={(): void => handleClick(firstPage)}
          roundedEnd={0}>
          <ArrowLeftIcon />
        </Button>
        {paginationList.map((item, index) => (
          <Button
            size="xs"
            bg={currentPage === item ? 'primary.300' : 'primary.100'}
            rounded="0"
            key={index}
            onClick={(e): void => {
              item === 'spreader'
                ? e.preventDefault()
                : handleClick(typeof item === 'string' ? parseInt(item) : item);
            }}>
            {item === 'spreader' ? '...' : item}
          </Button>
        ))}
        <Button
          size="xs"
          onClick={(): void => handleClick(lastPage)}
          bg="primary.100"
          roundedStart={0}>
          <ArrowRightIcon />
        </Button>
      </Flex>
    </Flex>
  );
};

export default memo(Pagination);
