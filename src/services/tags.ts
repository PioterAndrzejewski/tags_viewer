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

type ExternalLink = {
  link: string;
  type: string;
};

type Collective = {
  description: string;
  external_links?: ExternalLink[];
  link: string;
  name: string;
  slug: string;
  tags: string[];
};

type TagDataEntry = {
  count: number;
  has_synonyms: boolean;
  is_moderator_only: boolean;
  is_required: boolean;
  name: string;
  collectives?: Collective[];
};

type TagsDataResponse = {
  has_more: boolean;
  quota_max: number;
  quota_remaining: number;
  items?: TagDataEntry[];
};

export const getTags = async (params: TagsDataRequestParams) => {
  const queryParams = {
    ...params,
    site: "stackoverflow",
  };
  const { data } = await axios.get<TagsDataResponse>(apiConfig.get.tags, {
    params: queryParams,
  });
  return data;
};
