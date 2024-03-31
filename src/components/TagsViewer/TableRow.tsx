import TableCell from "@mui/material/TableCell";
import TableRowBase from "@mui/material/TableRow";

import { TagDataEntry } from "src/services/tags";
import { CrossIcon } from "../icons/Cross";
import { TickIcon } from "../icons/Tick";

type TableRowProps = {
  row: TagDataEntry;
};

export const TableRow = (props: TableRowProps) => {
  const {
    row: { count, name, ...rest },
  } = props;

  const restFields = [rest.has_synonyms, rest.is_moderator_only, rest.is_required];

  const tickCell = (value: boolean) => (
    <TableCell align='center' className='center'>
      <div className='flex flex-1 flex-row justify-center'>
        {value ? <TickIcon /> : <CrossIcon />}
      </div>
    </TableCell>
  );

  return (
    <TableRowBase key={name}>
      <TableCell align='left'>{count}</TableCell>
      <TableCell component='th' scope='row' align='left'>
        {name}
      </TableCell>
      {restFields.map((field) => tickCell(field))}
    </TableRowBase>
  );
};
