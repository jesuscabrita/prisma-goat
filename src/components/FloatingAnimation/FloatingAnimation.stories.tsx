import { FloatingAnimation } from './FloatingAnimation';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof FloatingAnimation> = {
    title: 'Components/FloatingAnimation',
    tags: ['autodocs'],
    component: FloatingAnimation,
    argTypes: {

    },
};

export default meta;

type Story = StoryObj<typeof FloatingAnimation>;

// Primary story
export const Primary: Story = {
    args: {

    },
};

// Secondary story
export const Secondary: Story = {
    args: {
    },
};