import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRowBase from "@mui/material/TableRow";

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
            {headCells.map((cell) => (
              <TableCell key={cell}>{cell}</TableCell>
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
    </TableContainer>
  );
};
