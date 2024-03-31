import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "src/components/common/Button";
import { ChevronRightIcon } from "src/components/icons/ChevronRight";

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const RightButtonEnabled: Story = {
  args: {
    children: ChevronRightIcon({}),
    disabled: false,
  },
};

export const LeftButtonDisabled: Story = {
  args: {
    children: ChevronRightIcon({}),
    disabled: true,
  },
};
