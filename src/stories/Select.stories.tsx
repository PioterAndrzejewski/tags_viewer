import { useArgs } from "@storybook/preview-api";
import { Meta, StoryObj } from "@storybook/react";
import { Select } from "src/components/common/Select";
import {
  orderOptions,
  sortingOptions,
} from "src/components/tagsViewer/TableSettings";

const meta: Meta<typeof Select> = {
  title: "Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Sortable: Story = {
  args: {
    onChange: () => undefined,
    value: "popular",
    options: sortingOptions,
    label: "Sort by",
    disabled: false,
  },
  render: function Render(args) {
    const [_, updateArgs] = useArgs();

    function onChange(newValue: string) {
      updateArgs({ value: newValue });
    }

    return <Select {...args} onChange={onChange} />;
  },
};

export const OrderDisabled: Story = {
  args: {
    onChange: () => undefined,
    value: orderOptions[0].value,
    options: orderOptions,
    label: "Order by",
    disabled: true,
  },
};
