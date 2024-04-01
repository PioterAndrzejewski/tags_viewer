import { useAtom } from "jotai";

import { filtersAtom } from "src/store/viewerAtoms";

export const useFilters = () => {
  const [filters, setFilters] = useAtom(filtersAtom);
  const pageNumber = filters.searchParams?.get("page") || "1";
  const itemsPerPage = filters.searchParams?.get("perPage") || "10";
  const sort = filters.searchParams?.get("sort") || "popular";
  const order = filters.searchParams?.get("order") || "desc";

  return { setFilters, pageNumber, itemsPerPage, sort, order };
};
