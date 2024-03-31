import { Screen } from "src/components/common/Screen";
import { TagsTable } from "src/components/tagsViewer/TagsTable";

export const ViewerScreen = () => (
  <Screen header='Tags Viewer'>
    <TagsTable />
  </Screen>
);
