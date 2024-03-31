import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { Text } from "src/components/common/Text";

import { TagDataEntry } from "src/services/tags";

type TagsTableProps = {
  rows?: TagDataEntry[];
};

export const TagsTable = (props: TagsTableProps) => {
  const { rows } = props;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Count</TableCell>
            <TableCell align='right'>Tag name</TableCell>
            <TableCell align='right'>Has synonyms</TableCell>
            <TableCell align='right'>For moderators</TableCell>
            <TableCell align='right'>Is required</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows ? (
            rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align='left'>{row.count}</TableCell>
                <TableCell component='th' scope='row'>
                  {row.name}
                </TableCell>
                <TableCell align='right'>{row.has_synonyms}</TableCell>
                <TableCell align='right'>{row.is_moderator_only}</TableCell>
                <TableCell align='right'>{row.is_required}</TableCell>
              </TableRow>
            ))
          ) : (
            <Text variant='body-m'>There is no data to show</Text>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
