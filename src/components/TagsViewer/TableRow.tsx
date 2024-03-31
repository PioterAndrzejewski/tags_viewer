import TableCell from "@mui/material/TableCell";
import TableRowBase from "@mui/material/TableRow";

import { CrossIcon } from "src/components/icons/Cross";
import { PlaceholderIcon } from "src/components/icons/PlaceholderIcon";
import { TickIcon } from "src/components/icons/Tick";

import { TagDataEntry } from "src/services/tags";

type TableRowProps = {
  row: TagDataEntry;
  isPlaceholder?: boolean;
};

export const TableRow = (props: TableRowProps) => {
  const {
    isPlaceholder,
    row: { count, name, ...rest },
  } = props;

  const restFields = [
    rest.has_synonyms,
    rest.is_moderator_only,
    rest.is_required,
  ];

  const renderIcon = (value: boolean) => (value ? <TickIcon /> : <CrossIcon />);

  const tickCell = (value: boolean) => (
    <TableCell align='center' className='center'>
      <div className='flex flex-1 flex-row justify-center'>
        {!!isPlaceholder ? <PlaceholderIcon /> : renderIcon(value)}
      </div>
    </TableCell>
  );

  return (
    <TableRowBase>
      <TableCell align='left'>{!isPlaceholder && count}</TableCell>
      <TableCell component='th' scope='row' align='left'>
        {!isPlaceholder && name}
      </TableCell>
      {restFields.map((field) => tickCell(field))}
    </TableRowBase>
  );
};
