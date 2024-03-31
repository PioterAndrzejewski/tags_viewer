import { useEffect } from "react";

import { useTags } from "src/hooks/useTags";
import { TagsTable } from "./TagsTable";

export const TagsViewer = () => {
  const { data } = useTags();

  useEffect(() => {
    console.log("refresh");
    console.log(data);
    if (!data) return;
    console.log(data);
  }, [data]);

  return <TagsTable rows={data?.items} />;
};
