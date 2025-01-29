import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { FaBeer } from "react-icons/fa";

const meta: Meta<typeof Button> = {
    title: "Components/Button",
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    component: Button,
    argTypes: {
        label: {
            description: "The button label (alternative to children)",
            control: "text",
        },
        children: {
            description: "The button label (alternative to label)",
            control: "text",
        },
        variant: {
            type: "string",
            control: "select",
            options: ["primary", "secondary", "vividPink", "darkMagenta", "veryDarkViolet", "danger", "warning", "success", "tertiary", "experiences"],
            description: "Color variants",
        },
        size: {
            type: "string",
            control: "select",
            options: ["small", "medium", "large"],
            description: "Size of the button",
        },
        isLoading: {
            type: "boolean",
            control: "boolean",
            description: "Whether the button shows a loading indicator",
        },
        loadingPosition: {
            type: "string",
            control: "select",
            options: ["left", "right"],
            description: "Position of the loading indicator",
        },
        disabled: {
            type: "boolean",
            control: "boolean",
            description: "Disables the button",
        },
        isSubmit: {
            type: "boolean",
            control: "boolean",
            description: "If true, button will behave as a submit button",
        },
        icon: {
            description: "Icon to display inside the button",
            control: "select",
            options: [<FaBeer />],
        },
        iconPosition: {
            type: "string",
            control: "select",
            options: ["left", "right"],
            description: "Position of the icon inside the button",
        },
        iconType: {
            type: "string",
            control: "select",
            options: ["home", "Left", "save", "more", "right", "update", "attach", "send", "delete", "edit", "reset", "add", "exit", "off", "calculator", "list", "futbol"],
            description: "Select a predefined icon",
        },
        onClick: {
            type: "function",
            action: "clicked",
        },
    },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
    args: {
        children: "Primary Button",
        variant: "primary",
        size: "medium",
    },
};

export const ButtonWithIconLeft: Story = {
    args: {
        children: "Button with IconType Left",
        variant: "primary",
        iconType: "home",
        iconPosition: "left",
    },
};

export const ButtonWithIconRight: Story = {
    args: {
        children: "Button with IconType Right",
        variant: "secondary",
        size: "medium",
        iconType: "Left",
        iconPosition: "right",
    },
};

export const ButtonWithLabel: Story = {
    args: {
        label: "Button with Label Prop",
        variant: "primary",
        size: "medium",
    },
};

export const PrimaryOnclick: Story = {
    args: {
        children: "Primary Button",
        variant: "primary",
        size: "medium",
        isSubmit: true,
        onClick: () => alert("Button clicked!"),
    },
};