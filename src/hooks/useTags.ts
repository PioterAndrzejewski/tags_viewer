import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

import { queryKeys } from "src/services/queryKeys";
import { getTags } from "src/services/tags";
import {
  orderAtom,
  pageAtom,
  pageSizeAtom,
  sortableAtom,
} from "src/store/viewerAtoms";

export const useTags = () => {
  const order = useAtomValue(orderAtom);
  const sort = useAtomValue(sortableAtom);
  const pageSize = useAtomValue(pageSizeAtom);
  const page = useAtomValue(pageAtom);

  const params = { order, sort, page, pageSize };

  return useQuery({
    queryKey: [...queryKeys.tags(params)],
    queryFn: () => getTags(params),
    gcTime: Infinity,
    staleTime: Infinity,
    enabled: false,
  });
};
