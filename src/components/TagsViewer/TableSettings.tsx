import { TextField } from "@mui/material";
import { useAtom } from "jotai";
import { useState } from "react";

import { Button } from "src/components/common/Button";
import { Select } from "src/components/common/Select";
import { Text } from "src/components/common/Text";
import { ChevronLeftIcon } from "src/components/icons/ChevronLeft";
import { ChevronRightIcon } from "src/components/icons/ChevronRight";

import { useDebounce } from "src/hooks/useDebounce";
import type { Order, Sortable } from "src/services/tags";
import {
  filtersAtom,
  orderAtom,
  pageAtom,
  pageSizeAtom,
  sortableAtom,
} from "src/store/viewerAtoms";

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

  const [page, setPage] = useAtom(pageAtom);
  const [order, setOrder] = useAtom(orderAtom);
  const [sort, setSort] = useAtom(sortableAtom);
  const [itemsPerPage, setItemsPerPage] = useAtom(pageSizeAtom);
  const [filters, setFilters] = useAtom(filtersAtom);
  const pageNumber = filters.searchParams?.get('page') || '1';

  const [rowsPerPage, setRowsPerPage] = useState(itemsPerPage);


  useDebounce(
    () => {
      setItemsPerPage(rowsPerPage);
      setPage(1);
    },
    1000,
    [rowsPerPage],
  );

  const onPageChange = (change: number) => {
    setFilters((prev) => {
      if (pageNumber === '0' && change === -1) return prev;
      if (nextPageDisabled && change === 1) return prev;

      const newPage = Number(pageNumber) + change
      const newPageStr = JSON.stringify(newPage)

      let searchParams = prev.searchParams;
      if (searchParams) {
        searchParams.set('page', newPageStr)
      } else {
        searchParams = new URLSearchParams({page: newPageStr})
      }

      return {
        ...prev,
        searchParams,
      }
    })
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
          setPage(1);
          setSort(selectedValue as Sortable);
        }}
        value={sort}
        disabled={restDisabled}
      />
      <Select
        label='Order'
        options={orderOptions}
        onChange={(selectedValue) => {
          setPage(1);
          setOrder(selectedValue as Order);
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
        <Text variant='body-m'>{filters.searchParams?.get('page') || '1'}</Text>
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
