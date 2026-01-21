import { Meta, StoryObj } from '@storybook/react';
import { Reveal } from './Reveal';

const meta: Meta<typeof Reveal> = {
    title: 'Components/Reveal',
    tags: ['autodocs'],
    component: Reveal,
    argTypes: {

    },
};

export default meta;

type Story = StoryObj<typeof Reveal>;

// Primary story
export const Primary: Story = {
    args: {
        background: "blue",
    },
};

// Secondary story
export const Secondary: Story = {
    args: {
        background: "red",
    },
};