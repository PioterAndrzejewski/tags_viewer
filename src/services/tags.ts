import axios from "axios";

import { apiConfig } from "./apiConfig";

export type Sortable = "popular" | "activity" | "name";
export type Order = "asc" | "desc";

export type TagsDataRequestParams = {
  order: Order;
  sort: Sortable;
  page: number;
  pageSize: number;
};

export const getTags = async (params: TagsDataRequestParams) => {
  const queryParams = {
    ...params,
    site: "stackoverflow",
  };
  const { data } = await axios.get(apiConfig.get.tags, { params: queryParams });
  return data;
};
