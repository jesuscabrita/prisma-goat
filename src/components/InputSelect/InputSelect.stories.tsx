import type { Meta, StoryObj } from "@storybook/react";
import { InputSelect } from "./InputSelect";

const meta: Meta<typeof InputSelect> = {
    title: "Components/InputSelect",
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    component: InputSelect,
    argTypes: {

    },
};

export default meta;

type Story = StoryObj<typeof InputSelect>;

export const DefaultInput: Story = {
    args: {
        placeholder: "Enter text...",
        type: "text",
        options: [{ label: "horla", value: "kdfhk" }, { label: "horla", value: "kdfhk" }]
    },
};
