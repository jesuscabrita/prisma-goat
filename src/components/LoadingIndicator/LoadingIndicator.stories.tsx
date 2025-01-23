import type { Meta, StoryObj } from "@storybook/react";
import { LoadingIndicator } from "./LoadingIndicator";

const meta: Meta<typeof LoadingIndicator> = {
    title: "Components/LoadingIndicator",
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    component: LoadingIndicator,
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
        background:{
            control:{
                type:"select",
                option: [
                    "bg-black",
                    "bg-white",
                ],
            }
        },
        logoGoatData:{
            control:{
                type:"select",
                option:[
                    "logoRed" , 
                    "logoBlack" , 
                    "logo6" , 
                    "logoMagenta" , 
                    "logoWhite"
                ],
            }
        },
        strokeWidth:{
            control:{
                type:"select",
                option:[
                    "10","11","12","13","14",
                ],
            }
        },
    },
};

export default meta;

type Story = StoryObj<typeof LoadingIndicator>;

export const Default: Story = {
    args: {
        variant: "primary",
        background:"white",
        logoGoatData: "logoRed",
        imgLoading: "",
        strokeWidth:"10"
    },
};

export const WithCustomIcon: Story = {
    args: {
        variant: "secondary",
        background:"black",
        logoGoatData:"logo6",
        imgLoading: "",
        strokeWidth:"10",
    },
};