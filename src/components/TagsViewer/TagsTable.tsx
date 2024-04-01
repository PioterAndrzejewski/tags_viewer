import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow as TableRowBase,
} from "@mui/material";
import { AxiosError } from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import classNames from "classnames";

import { Text } from "src/components/common/Text";
import { useFilters } from "src/hooks/useFilters";
import { useFiltersGuard } from "src/hooks/useFiltersGuard";
import { useTags } from "src/hooks/useTags";
import { InfoIcon } from "src/components/icons/Info";
import { TableRow } from "src/components/TagsViewer/TableRow";
import { TableSettings } from "src/components/TagsViewer/TableSettings";

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
  const { data, isLoading, isError, error } = useTags();
  const { itemsPerPage } = useFilters();
  useFiltersGuard();

  useEffect(() => {
    if (isError && error) {
      let errorMessage: string = "";

      if (error instanceof AxiosError) {
        errorMessage = error?.response?.data.error_message;
      }

      toast.error(
        `There was an error: ${
          errorMessage.length > 0 ? errorMessage : error.message
        }`,
      );
    }
  }, [isError, error]);

  const renderBody = () => {
    if (isLoading) {
      return Array.from({ length: Number(itemsPerPage) }, (_) => null).map(
        (_, i) => (
          <TableRow
            row={placeholderRow}
            isPlaceholder
            isOdd={i % 2 !== 0}
            key={i}
          />
        ),
      );
    }

    if (data?.items && data.items.length > 0) {
      return data?.items.map((row, i) => (
        <TableRow row={row} key={row.name} isOdd={i % 2 !== 0} />
      ));
    }

    return (
      <TableRowBase>
        <TableCell colSpan={5}>
          <div className='p-4 justify-center align-center flex flex-row gap-4'>
            <InfoIcon color='#cf5402' />
            <Text>
              {`Looks like there's no data to show${
                isError ? " due to an error - please try again later" : ""
              }`}
            </Text>
          </div>
        </TableCell>
      </TableRowBase>
    );
  };

  return (
    <>
      <TableSettings
        nextPageDisabled={!data?.has_more || !data || isLoading}
        prevPageDisabled={!data || isLoading}
        restDisabled={isError}
      />
      <TableContainer component={"div"} className='rounded-t-none'>
        <Table>
          <TableHead>
            <TableRowBase className='bg-gray-100 flex flex-col'>
              {headCells.map((cell, index) => (
                <TableCell
                  key={cell}
                  align={index > 1 ? "center" : "left"}
                  className={classNames({
                    "w-40": index === 0,
                    "w-max": index === 1,
                    "min-w-24": index > 1,
                  })}
                >
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
    </>
  );
};
