import TableCell from "@mui/material/TableCell";
import TableRowBase from "@mui/material/TableRow";
import classNames from "classnames";

import { CrossIcon } from "src/components/icons/Cross";
import { PlaceholderIcon } from "src/components/icons/PlaceholderIcon";
import { TickIcon } from "src/components/icons/Tick";

import { TagDataEntry } from "src/services/tags";

type TableRowProps = {
  row: TagDataEntry;
  isPlaceholder?: boolean;
  isOdd: boolean;
};

export const TableRow = (props: TableRowProps) => {
  const {
    isPlaceholder,
    isOdd,
    row: { count, name, ...rest },
  } = props;

  const restFields = [
    rest.has_synonyms,
    rest.is_moderator_only,
    rest.is_required,
  ];

  const renderIcon = (value: boolean) => (value ? <TickIcon /> : <CrossIcon />);

  const tickCell = (value: boolean, index: number) => (
    <TableCell align='center' className='center min-w-24' key={index}>
      <div className='flex flex-1 flex-row justify-center'>
        {!!isPlaceholder ? <PlaceholderIcon /> : renderIcon(value)}
      </div>
    </TableCell>
  );

  return (
    <TableRowBase
      className={classNames("hover:bg-slate-100", { "bg-slate-50": !!isOdd })}
    >
      <TableCell align='left' className='w-40'>
        {!isPlaceholder && count}
      </TableCell>
      <TableCell component='th' scope='row' align='left' className='w-max'>
        {!isPlaceholder && name}
      </TableCell>
      {restFields.map((field, index) => tickCell(field, index))}
    </TableRowBase>
  );
};
