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
  orderAtom,
  pageAtom,
  pageSizeAtom,
  sortableAtom,
} from "src/store/viewerAtoms";

type TablePagesProps = {
  nextPageDisabled: boolean;
  prevPageDisabled: boolean;
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
  const { nextPageDisabled, prevPageDisabled } = props;

  const [page, setPage] = useAtom(pageAtom);
  const [order, setOrder] = useAtom(orderAtom);
  const [sort, setSort] = useAtom(sortableAtom);
  const [itemsPerPage, setItemsPerPage] = useAtom(pageSizeAtom);

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
    if (page === 0 && change === -1) return;
    if (nextPageDisabled && change === 1) return;
    setPage((prevPage) => prevPage + change);
  };

  const onRowsPerNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue = Number(event.target.value);
    if (newValue < 0) return setRowsPerPage(0);
    if (newValue > 100) return setRowsPerPage(100);
    setRowsPerPage(newValue);
  };

  return (
    <div className='flex flex-1 flex-row justify-end align-center p-4 gap-12 flex-wrap'>
      <Select
        label='Sort by'
        options={sortingOptions}
        onChange={(selectedValue) => {
          setPage(1);
          setSort(selectedValue as Sortable);
        }}
        value={sort}
      />
      <Select
        label='Order'
        options={orderOptions}
        onChange={(selectedValue) => {
          setPage(1);
          setOrder(selectedValue as Order);
        }}
        value={order}
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
      />
      <div className='flex flex-row gap-2 items-center'>
        <Text variant='body-m'>Page: </Text>
        <Text variant='body-m'>{JSON.stringify(page)}</Text>
      </div>
      <div className='flex flex-row gap-4 items-center'>
        <Button
          onClick={() => onPageChange(-1)}
          disabled={prevPageDisabled || page === 1}
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
