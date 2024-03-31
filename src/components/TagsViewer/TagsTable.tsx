import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow as TableRowBase,
} from "@mui/material";

import { Text } from "src/components/common/Text";

import { TagDataEntry } from "src/services/tags";
import { TableRow } from "./TableRow";

type TagsTableProps = {
  rows?: TagDataEntry[];
};

const headCells = [
  "Count",
  "Tag name",
  "Has synonyms",
  "For Moderators",
  "Is required",
];

export const TagsTable = (props: TagsTableProps) => {
  const { rows } = props;
  return (
    <TableContainer component={Paper}>
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
          {rows ? (
            rows.map((row) => <TableRow row={row} />)
          ) : (
            <Text variant='body-m'>No data</Text>
          )}
        </TableBody>
      </Table>
      <TablePagination />
    </TableContainer>
  );
};
