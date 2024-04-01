import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { Button } from "src/components/common/Button";
import { Select } from "src/components/common/Select";
import { Text } from "src/components/common/Text";
import { ChevronLeftIcon } from "src/components/icons/ChevronLeft";
import { ChevronRightIcon } from "src/components/icons/ChevronRight";

import { useDebounce } from "src/hooks/useDebounce";
import { useFilters } from "src/hooks/useFilters";
import { filtersReducer } from "src/utils/filtersReducer";

type TablePagesProps = {
  nextPageDisabled: boolean;
  prevPageDisabled: boolean;
  restDisabled: boolean;
};

export const orderOptions = [
  {
    value: "asc",
    label: "ascending",
  },
  {
    value: "desc",
    label: "descending",
  },
];

export const sortingOptions = [
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

  const { setFilters, pageNumber, itemsPerPage, sort, order } = useFilters();

  const [rowsPerPage, setRowsPerPage] = useState(Number(itemsPerPage));

  useDebounce(
    () => {
      let newValue = rowsPerPage;
      if (newValue < 1) {
        newValue = 1;
        toast("Min rows per page is 1");
      }
      if (newValue > 100) {
        toast("Max rows per page is 100");
        newValue = 100;
      }
      setFilters((prev) => filtersReducer(prev, "perPage", newValue));
    },
    1000,
    [rowsPerPage],
  );

  useEffect(() => {
    if (itemsPerPage || itemsPerPage === "0") {
      setRowsPerPage(Number(itemsPerPage));
    }
  }, [itemsPerPage]);

  const onPageChange = (change: number) => {
    setFilters((prev) => filtersReducer(prev, "page", change));
  };

  const onRowsPerNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue = Number(event.target.value.replace(/\D/g, ""));
    setRowsPerPage(newValue);
  };

  return (
    <div className='flex flex-1 flex-row justify-end align-center p-4 gap-12 flex-wrap bg-gray-100 border-b border-gray-200 rounded-t-sm'>
      <Select
        label='Sort by'
        options={sortingOptions}
        onChange={(selectedValue) => {
          setFilters((prev) => filtersReducer(prev, "sort", selectedValue));
        }}
        value={sort}
        disabled={restDisabled}
      />
      <Select
        label='Order'
        options={orderOptions}
        onChange={(selectedValue) => {
          setFilters((prev) => filtersReducer(prev, "order", selectedValue));
        }}
        value={order}
        disabled={restDisabled}
      />
      <TextField
        id='Rows per page'
        label='Rows per page'
        type='number'
        onChange={onRowsPerNumberChange}
        value={rowsPerPage}
        disabled={restDisabled}
      />
      <div className='flex flex-row gap-2 items-center min-w-20'>
        <Text>Page: </Text>
        <Text>{pageNumber}</Text>
      </div>
      <div className='flex flex-row gap-4 items-center'>
        <Button
          onClick={() => onPageChange(-1)}
          disabled={prevPageDisabled || Number(pageNumber) < 2}
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
