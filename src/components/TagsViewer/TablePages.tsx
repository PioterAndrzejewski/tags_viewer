import { useAtom } from "jotai";

import { Button } from "src/components/common/Button";
import { Text } from "src/components/common/Text";
import { ChevronLeftIcon } from "src/components/icons/ChevronLeft";
import { ChevronRightIcon } from "src/components/icons/ChevronRight";
import { pageAtom, pageSizeAtom } from "src/store/viewerAtoms";

type TablePagesProps = {
  nextPageDisabled: boolean;
  prevPageDisabled: boolean;
};

export const TablePages = (props: TablePagesProps) => {
  const { nextPageDisabled, prevPageDisabled } = props;

  const [page, setPage] = useAtom(pageAtom);
  const [itemsPerPage, setItemsPerPage] = useAtom(pageSizeAtom);

  const onPageChange = (change: number) => {
    if (page === 0 && change === -1) return;
    if (nextPageDisabled && change === 1) return;
    setPage((prevPage) => prevPage + change);
  };

  const onItemsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItemsPerPage(parseInt(event.target.value, 1));
    setPage(1);
  };

  return (
    <div className='flex flex-1 flex-row justify-end px-4 gap-12 flex-wrap'>
      <div className='flex flex-row gap-2'>
        <Text variant='body-m'>Rows per page: </Text>
        <Text variant='body-m'>{JSON.stringify(itemsPerPage)}</Text>
      </div>
      <div className='flex flex-row gap-2'>
        <Text variant='body-m'>Page: </Text>
        <Text variant='body-m'>{JSON.stringify(page)}</Text>
      </div>
      <div className='flex flex-row gap-4'>
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
