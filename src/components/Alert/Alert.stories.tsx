import { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
    title: 'Components/Alert',
    tags: ['autodocs'],
    component: Alert,
    argTypes: {

    },
};

export default meta;

type Story = StoryObj<typeof Alert>;

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