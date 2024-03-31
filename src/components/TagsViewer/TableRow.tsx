import TableCell from "@mui/material/TableCell";
import TableRowBase from "@mui/material/TableRow";

import { TagDataEntry } from "src/services/tags";

type TableRowProps = {
  row: TagDataEntry;
};

export const TableRow = (props: TableRowProps) => (
  <TableRowBase
    key={props.row.name}
    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
  >
    <TableCell align='left'>{props.row.count}</TableCell>
    <TableCell component='th' scope='row' align='center'>
      {props.row.name}
    </TableCell>
    <TableCell align='center'>{props.row.has_synonyms}</TableCell>
    <TableCell align='center'>{props.row.is_moderator_only}</TableCell>
    <TableCell align='center'>{props.row.is_required}</TableCell>
  </TableRowBase>
);
