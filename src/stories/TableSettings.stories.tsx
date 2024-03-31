import { Meta, StoryObj } from "@storybook/react";
import { TableSettings } from "src/components/tagsViewer/TableSettings";

const meta: Meta<typeof TableSettings> = {
  title: "Table Settings",
  component: TableSettings,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Compound: Story = {
  args: {
    nextPageDisabled: false,
    prevPageDisabled: true,
    restDisabled: false,
  },
};
