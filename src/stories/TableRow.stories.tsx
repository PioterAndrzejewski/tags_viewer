import { Meta, StoryObj } from "@storybook/react";
import { TableRow } from "src/components/TagsViewer/TableRow";

const meta: Meta<typeof TableRow> = {
  title: "Table row",
  component: TableRow,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Even: Story = {
  args: {
    row: {
      count: 21331,
      name: "Javascript",
      has_synonyms: true,
      is_moderator_only: false,
      is_required: true,
    },
    isOdd: false,
  },
};

export const Odd: Story = {
  args: {
    row: {
      count: 1331,
      name: "php",
      has_synonyms: false,
      is_moderator_only: false,
      is_required: true,
    },
    isOdd: true,
  },
};
