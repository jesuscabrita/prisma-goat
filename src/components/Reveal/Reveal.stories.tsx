import { Meta, StoryObj } from '@storybook/react';
import { Reveal } from './Reveal';

const meta: Meta<typeof Reveal> = {
    title: 'Components/Reveal',
    tags: ['autodocs'],
    component: Reveal,
    argTypes: {
        variant: {
            control: {
                type: 'select',
                options: [
                    "goatData",
                    "secondary",
                ],
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof Reveal>;

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