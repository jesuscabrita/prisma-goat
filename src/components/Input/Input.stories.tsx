import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input"; 

const meta: Meta<typeof Input> = {
    title: "Components/Input",
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    component: Input,
    argTypes: {
        placeholder: {
            description: "Placeholder text for the input",
            control: "text",
        },
        value: {
            description: "The current value of the input",
            control: "text",
        },
        type: {
            description: "The type of the input field",
            control: "select",
            options: ["text", "password", "email", "number", "date", "search"],
        },
        size: {
            description: "Size of the input field",
            control: "select",
            options: ["small", "medium", "large"],
        },
        disabled: {
            description: "Disables the input field",
            control: "boolean",
        },
        onChange: {
            type: "function",
            action: "changed",
            description: "Function called when the input value changes",
        },
        onFocus: {
            type: "function",
            action: "focused",
            description: "Function called when the input gains focus",
        },
        onBlur: {
            type: "function",
            action: "blurred",
            description: "Function called when the input loses focus",
        },
    },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const DefaultInput: Story = {
    args: {
        placeholder: "Enter text...",
        type: "text",
    },
};

export const PasswordInput: Story = {
    args: {
        placeholder: "Enter your password",
        type: "password",
    },
};

export const InputWithError: Story = {
    args: {
        placeholder: "Enter your email",
        type: "email",
    },
};

export const DisabledInput: Story = {
    args: {
        placeholder: "This input is disabled",
        type: "text",
        disabled: true,
    },
};

export const InputWithOnChange: Story = {
    args: {
        placeholder: "Type something...",
        type: "text",
        onChange: () => alert("Input value changed!"),
    },
};