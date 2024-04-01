import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

import { useFilters } from "src/hooks/useFilters";
import { filtersReducer } from "src/utils/filtersReducer";

const getToastMessage = (field: string, value: string | number) =>
  `${field} has been reset to ${value}`;

export const useFiltersGuard = () => {
  const initialized = useRef(false);
  const { setFilters, pageNumber, itemsPerPage, sort, order } = useFilters();

  const fireToast = (message: string) => {
    setTimeout(() => {
      toast(message);
    }, 500);
  };

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    if (Number(pageNumber) < 1) {
      setFilters((prev) => filtersReducer(prev, "setPage", 1));
      fireToast(getToastMessage("Page number", 1));
    }

    if (Number(itemsPerPage) < 1) {
      setFilters((prev) => filtersReducer(prev, "perPage", 1));
      fireToast(getToastMessage("Rows per page", 1));
    }

    if (Number(itemsPerPage) > 100) {
      setFilters((prev) => filtersReducer(prev, "perPage", 1));
      fireToast(getToastMessage("Rows per page", 100));
    }

    if (!["desc", "asc"].includes(order)) {
      setFilters((prev) => filtersReducer(prev, "order", "desc"));
      fireToast(getToastMessage("Ordering", "descending"));
    }

    if (!["popular", "activity", "name"].includes(sort)) {
      setFilters((prev) => filtersReducer(prev, "sort", "popular"));
      fireToast(getToastMessage("Sorting", "popular"));
    }
  }, [pageNumber, itemsPerPage, sort, order]);
};
