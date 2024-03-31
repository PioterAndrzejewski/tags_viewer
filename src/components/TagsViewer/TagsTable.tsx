import {
  Card,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow as TableRowBase,
} from "@mui/material";
import { useAtomValue } from "jotai";

import { Text } from "src/components/common/Text";
import { TableRow } from "src/components/tagsViewer/TableRow";
import { TableSettings } from "src/components/tagsViewer/TableSettings";
import { useTags } from "src/hooks/useTags";
import { pageSizeAtom } from "src/store/viewerAtoms";

const headCells = [
  "Count",
  "Tag name",
  "Has synonyms",
  "For Moderators",
  "Is required",
];

const placeholderRow = {
  count: 0,
  has_synonyms: true,
  is_moderator_only: true,
  is_required: true,
  name: "",
};

export const TagsTable = () => {
  const { data, isLoading } = useTags();
  const rowsPerPage = useAtomValue(pageSizeAtom);

  const renderBody = () => {
    if (isLoading) {
      return Array.from({ length: rowsPerPage }, () => null).map((_) => (
        <TableRow row={placeholderRow} isPlaceholder />
      ));
    }

    if (data?.items && data.items.length > 0) {
      return data?.items.map((row) => <TableRow row={row} key={row.name} />);
    }

    return (
      <TableRowBase>
        <TableCell colSpan={5}>
          <div className='p-4 justify-center align-center flex'>
            <Text variant='body-m'>Looks like there's no data to show</Text>
          </div>
        </TableCell>
      </TableRowBase>
    );
  };

  return (
    <TableContainer component={Card}>
      <TableSettings
        nextPageDisabled={!data?.has_more || !data || isLoading}
        prevPageDisabled={!data || isLoading}
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
        <TableBody>{renderBody()}</TableBody>
      </Table>
      {isLoading && (
        <div className='absolute inset-0 flex justify-center items-center'>
          <CircularProgress />
        </div>
      )}
    </TableContainer>
  );
};
