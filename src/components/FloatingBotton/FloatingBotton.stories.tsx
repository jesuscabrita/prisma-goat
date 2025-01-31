import type { Meta, StoryObj } from "@storybook/react";
import { FloatingBotton } from "./FloatingBotton";

const meta: Meta<typeof FloatingBotton> = {
    title: "Components/FloatingBotton",
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    component: FloatingBotton,
    argTypes: {
        
    },
};

export default meta;

type Story = StoryObj<typeof FloatingBotton>;

export const Primary: Story = {
    args: {
        children: "Primary Button",
        variant: "whatsapp",
    },
};