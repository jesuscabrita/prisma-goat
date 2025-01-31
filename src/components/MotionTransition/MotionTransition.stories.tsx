import { Meta, StoryObj } from '@storybook/react';
import { MotionTransition } from './MotionTransition';

const meta: Meta<typeof MotionTransition> = {
    title: 'Components/MotionTransition',
    tags: ['autodocs'],
    component: MotionTransition,
    argTypes: {
        variant: {
            control: {
                type: 'select',

            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof MotionTransition>;

// Primary story
export const Primary: Story = {
    args: {
        variant: "primary",

    },
};

// Secondary story
export const Secondary: Story = {
    args: {
        variant: "secondary",
    },
};