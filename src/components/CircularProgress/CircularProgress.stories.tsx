import type { Meta, StoryObj } from "@storybook/react";
import { CircularProgress } from "./CircularProgress";

const meta: Meta<typeof CircularProgress> = {
    title: "Components/CircularProgress",
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    component: CircularProgress,
    argTypes: {
        variant: {
            control: {
                type: 'select',
                options: [
                    'primary',
                    'secondary',
                    'vividPink',
                    'darkMagenta',
                    'veryDarkViolet',
                    'danger',
                    'warning',
                    'success',
                ],
            },
        },
        logoGoatData: {
            control: {
                type: "select",
                option: [
                    "logoRed",
                    "logoBlack",
                    "logo6",
                    "logoMagenta",
                    "logoWhite"
                ],
            }
        },
        strokeWidth: {
            control: {
                type: "select",
                option: [
                    "10", "11", "12", "13", "14",
                ],
            }
        },
    },
};

export default meta;

type Story = StoryObj<typeof CircularProgress>;

export const Default: Story = {
    args: {
        variant: "primary",
        logoGoatData: "logoRed",
        imgLoading: "",
        strokeWidth: "10"
    },
};

export const WithCustomIcon: Story = {
    args: {
        variant: "secondary",
        logoGoatData: "logo6",
        imgLoading: "",
        strokeWidth: "10",
    },
};