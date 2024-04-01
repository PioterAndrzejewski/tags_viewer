import { useAtom } from "jotai";
import { Order, Sortable } from "src/services/tags";

import { filtersAtom } from "src/store/viewerAtoms";

export const useFilters = () => {
  const [filters, setFilters] = useAtom(filtersAtom);

  const pageNumber = filters.searchParams?.get("page") || "1";
  const itemsPerPage = filters.searchParams?.get("perPage") || "10";
  const sort = (filters.searchParams?.get("sort") || "popular") as Sortable;
  const order = (filters.searchParams?.get("order") || "desc") as Order;

  return { setFilters, pageNumber, itemsPerPage, sort, order };
};
