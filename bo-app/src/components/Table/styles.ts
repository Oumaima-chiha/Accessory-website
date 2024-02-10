import { styled, Table, Td, Th } from '@chakra-ui/react';

export const StyledTable = styled(Table, {
  baseStyle: {
    borderCollapse: 'separate',
    borderSpacing: '0 15px',
    '.chakra-table > tbody > tr:first-of-type, td:first-of-type': {
      borderTopLeftRadius: '7px',
      borderBottomLeftRadius: '7px',
    },
    '.chakra-table > tbody > tr:last-of-type, td:last-of-type': {
      borderTopRightRadius: '7px',
      borderBottomRightRadius: '7px',
    },
    '.chakra-stack > button': {
      color: '#fff',
    },
  },
});

export const StyledTh = styled(Th, {
  baseStyle: {
    color: 'black',
    fontSize: '16px',
    textTransform: 'capitalize',
    letterSpacing: 'inherit',
    borderColor: 'rgba(199, 199, 210, 0.15)',
    minWidth: '116px',
  },
});

export const StyledTd = styled(Td, {
  baseStyle: {
    color: 'black',
    fontSize: '16px',
    letterSpacing: 'inherit',
    background: 'rgba(199, 199, 210, 0.15)',
    border: 'none',
    // maxW: '120px',
  },
});
