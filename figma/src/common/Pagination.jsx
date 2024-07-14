// components/Pagination.js
import React from 'react';
import { Pagination as MuiPagination } from '@mui/material';

const Pagination = ({ page, count, onPageChange }) => {
  return (
    <MuiPagination
      page={page}
      count={count}
      onChange={(event, value) => onPageChange(value)}
    />
  );
};

export default Pagination;
