type Location = {
  pathname?: string;
  searchParams?: URLSearchParams;
};

export type Filter = "page" | "perPage" | "sort" | "order";
type Action = Filter | "setPage";

type NewValue<T extends Action> = T extends "page" | "perPage" | "setPage"
  ? number
  : string;

export const filtersReducer = <T extends Action>(
  prev: Location,
  field: T,
  newValue: NewValue<T>,
) => {
  const searchParams = prev.searchParams || new URLSearchParams();

  switch (field) {
    case "page": {
      const prevPageStr = searchParams.get("page") || "1";
      const prevPage = Number(prevPageStr);
      const change = newValue as number;
      const newPage = prevPage + change;
      searchParams.set("page", JSON.stringify(newPage));
      break;
    }
    case "setPage": {
      searchParams.set("page", JSON.stringify(newValue));
      break;
    }
    case "perPage": {
      searchParams.set("perPage", JSON.stringify(newValue));
      searchParams.set("page", "1");
      break;
    }
    default: {
      const newValueStr = newValue as string;
      searchParams.set(field, newValueStr);
      searchParams.set("page", "1");
      break;
    }
  }

  return {
    ...prev,
    searchParams,
  };
};
