import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow as TableRowBase,
} from "@mui/material";
import { useAtom } from "jotai";

import { Text } from "src/components/common/Text";

import { useTags } from "src/hooks/useTags";
import { pageAtom, pageSizeAtom } from "src/store/viewerAtoms";
import { TablePages } from "./TablePages";
import { TableRow } from "./TableRow";

const headCells = [
  "Count",
  "Tag name",
  "Has synonyms",
  "For Moderators",
  "Is required",
];

export const TagsTable = () => {
  const { data } = useTags();

  const [page, setPage] = useAtom(pageAtom);
  const [itemsPerPage, setItemsPerPage] = useAtom(pageSizeAtom);

  const onPageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const onItemsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItemsPerPage(parseInt(event.target.value, 1));
    setPage(1);
  };

  return (
    <TableContainer component={Paper}>
      <TablePages
        nextPageDisabled={!data?.has_more || !data}
        prevPageDisabled={!data}
      />
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRowBase>
            {headCells.map((cell, index) => (
              <TableCell key={cell} align={index > 1 ? "center" : "left"}>
                {cell}
              </TableCell>
            ))}
          </TableRowBase>
        </TableHead>
        <TableBody>
          {data?.items ? (
            data?.items.map((row) => <TableRow row={row} />)
          ) : (
            <Text variant='body-m'>No data</Text>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
