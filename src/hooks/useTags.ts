import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "src/services/queryKeys";
import { Order, Sortable, getTags } from "src/services/tags";

export const useTags = () => {
  const order: Order = "desc";
  const sort: Sortable = "popular";
  const page = 1;
  const pageSize = 10;

  const params = { order, sort, page, pageSize };

  return useQuery({
    queryKey: [...queryKeys.tags(params)],
    queryFn: () => getTags({ order, sort, page, pageSize }),
    gcTime: Infinity,
    staleTime: Infinity,
  });
};
