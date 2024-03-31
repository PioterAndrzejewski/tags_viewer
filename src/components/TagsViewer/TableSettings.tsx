import { useAtom } from "jotai";

import { Button } from "src/components/common/Button";
import { Select } from "src/components/common/Select";
import { Text } from "src/components/common/Text";
import { ChevronLeftIcon } from "src/components/icons/ChevronLeft";
import { ChevronRightIcon } from "src/components/icons/ChevronRight";
import {
  orderAtom,
  pageAtom,
  pageSizeAtom,
  sortableAtom,
} from "src/store/viewerAtoms";

import type { Order, Sortable } from "src/services/tags";

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
  const [itemsPerPage, setItemsPerPage] = useAtom(pageSizeAtom);
  const [order, setOrder] = useAtom(orderAtom);
  const [sort, setSort] = useAtom(sortableAtom);

  const onPageChange = (change: number) => {
    if (page === 0 && change === -1) return;
    if (nextPageDisabled && change === 1) return;
    setPage((prevPage) => prevPage + change);
  };

  return (
    <div className='flex flex-1 flex-row justify-end align-center p-4 gap-12 flex-wrap'>
      <Select
        label='Sort by'
        options={sortingOptions}
        onChange={(selectedValue) => setSort(selectedValue as Sortable)}
        value={sort}
      />
      <Select
        label='Order'
        options={orderOptions}
        onChange={(selectedValue) => setOrder(selectedValue as Order)}
        value={order}
      />
      <div className='flex flex-row gap-2 items-center'>
        <Text variant='body-m'>Rows per page:</Text>
        <Text variant='body-m'>{JSON.stringify(itemsPerPage)}</Text>
      </div>
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
