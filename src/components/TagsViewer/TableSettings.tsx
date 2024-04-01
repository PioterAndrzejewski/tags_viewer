import { TextField } from "@mui/material";
import { useState } from "react";

import { Button } from "src/components/common/Button";
import { Select } from "src/components/common/Select";
import { Text } from "src/components/common/Text";
import { ChevronLeftIcon } from "src/components/icons/ChevronLeft";
import { ChevronRightIcon } from "src/components/icons/ChevronRight";

import { useDebounce } from "src/hooks/useDebounce";
import { useFilters } from 'src/hooks/useFilters';
import { filtersReducer } from 'src/utils/filtersReducer';

type TablePagesProps = {
  nextPageDisabled: boolean;
  prevPageDisabled: boolean;
  restDisabled: boolean;
};

const orderOptions = [
  {
    value: "asc",
    label: "ascending",
  },
  {
    value: "desc",
    label: "descending",
  },
];

const sortingOptions = [
  {
    value: "popular",
    label: "popular",
  },
  {
    value: "activity",
    label: "activity",
  },
  {
    value: "name",
    label: "name",
  },
];

export const TableSettings = (props: TablePagesProps) => {
  const { nextPageDisabled, prevPageDisabled, restDisabled } = props;

  const {setFilters, pageNumber, itemsPerPage, sort, order} = useFilters();

  const [rowsPerPage, setRowsPerPage] = useState(Number(itemsPerPage));


  useDebounce(
    () => {
      setFilters((prev) => filtersReducer(prev, 'perPage', rowsPerPage))
    },
    1000,
    [rowsPerPage],
  );

  const onPageChange = (change: number) => {
    setFilters((prev) => filtersReducer(prev, 'page', change))
  }

  const onRowsPerNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue = Number(event.target.value);
    if (newValue < 0) return setRowsPerPage(0);
    if (newValue > 100) return setRowsPerPage(100);
    setRowsPerPage(newValue);
  };

  return (
    <div className='flex flex-1 flex-row justify-end align-center p-4 gap-12 flex-wrap bg-gray-100 border-b border-gray-200 rounded-t-sm'>
      <Select
        label='Sort by'
        options={sortingOptions}
        onChange={(selectedValue) => {
          setFilters(prev => filtersReducer(prev, 'sort', selectedValue))
        }}
        value={sort}
        disabled={restDisabled}
      />
      <Select
        label='Order'
        options={orderOptions}
        onChange={(selectedValue) => {
          setFilters(prev => filtersReducer(prev, 'order', selectedValue))
        }}
        value={order}
        disabled={restDisabled}
      />
      <TextField
        id='Rows per field'
        label='Rows per field'
        type='number'
        InputLabelProps={{
          shrink: true,
        }}
        onChange={onRowsPerNumberChange}
        value={rowsPerPage}
        disabled={restDisabled}
      />
      <div className='flex flex-row gap-2 items-center'>
        <Text variant='body-m'>Page: </Text>
        <Text variant='body-m'>{pageNumber}</Text>
      </div>
      <div className='flex flex-row gap-4 items-center'>
        <Button
          onClick={() => onPageChange(-1)}
          disabled={prevPageDisabled || Number(pageNumber) < 2 }
        >
          <ChevronLeftIcon color='' />
        </Button>
        <Button onClick={() => onPageChange(1)} disabled={nextPageDisabled}>
          <ChevronRightIcon />
        </Button>
      </div>
    </div>
  );
};
