import { useQuery } from "@tanstack/react-query";

import { apiKey } from "src/services/apiConfig";
import { queryKeys } from "src/services/queryKeys";
import { getTags } from "src/services/tags";
import { useFilters } from "./useFilters";

export const useTags = () => {
  const { order, sort, itemsPerPage, pageNumber } = useFilters();

  const params = {
    order,
    sort,
    page: pageNumber,
    pageSize: itemsPerPage,
    key: apiKey,
  };

  return useQuery({
    queryKey: [...queryKeys.tags(params)],
    queryFn: () => getTags(params),
    gcTime: Infinity,
    staleTime: Infinity,
  });
};
