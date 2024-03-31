import { TagsDataRequestParams } from "./tags";

export const queryKeys = {
  tags: (params: TagsDataRequestParams) => [
    "tags",
    params.order,
    params.page,
    params.pageSize,
    params.sort,
  ],
} as const;
