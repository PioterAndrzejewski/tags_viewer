import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow as TableRowBase,
} from "@mui/material";

import { Text } from "src/components/common/Text";

import { useTags } from "src/hooks/useTags";
import { TableSettings } from "./TableSettings";
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

  return (
    <TableContainer component={Paper}>
      <TableSettings
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
