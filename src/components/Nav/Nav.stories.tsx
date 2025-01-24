import { Meta, StoryObj } from '@storybook/react';
import { Nav } from './Nav';

const meta: Meta<typeof Nav> = {
    title: 'Components/Nav',
    tags: ['autodocs'],
    component: Nav,
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

type Story = StoryObj<typeof Nav>;

// Primary story
export const Primary: Story = {
    args: {
        variant: "goatData",
        items: [
            { label: "¿Quiénes Somos?", href: "#about", refId: "A" },
            { label: "Servicios", href: "#servicios", refId: "B" },
            { label: "Nuestro Equipo", href: "#equipo", refId: "C" },
            { label: "Contactos", href: "#contactos", refId: "D" },
        ],
    },
};

// Secondary story
export const Secondary: Story = {
    args: {
        variant: "secondary",
        items: [
            { label: "¿Quiénes Somos?", href: "#about", refId: "A" },
            { label: "Servicios", href: "#servicios", refId: "B" },
            { label: "Nuestro Equipo", href: "#equipo", refId: "C" },
            { label: "Contactos", href: "#contactos", refId: "D" },
        ],
    },
};