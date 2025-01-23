import imagePrueba from '../../assets/images/prueba.webp';
import { Meta, StoryObj } from '@storybook/react';
import { Navbar } from './Navbar';

const meta: Meta<typeof Navbar> = {
    title: 'Components/Navbar',
    tags: ['autodocs'],
    component: Navbar,
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
        list: {
            control: {
                type: 'object',
                defaultValue: [
                    { label: 'Home', description: 'Información requerida de este producto', link: 'home', subItems: [] },
                    { label: 'About', description: 'Información requerida de este producto', link: 'about', subItems: [] },
                    { label: 'Services', description: '', link: 'services', subItems: [{ label: 'Web Development' }, { label: 'SEO' }] },
                ],
            },
        },
        listMenu: {
            control: {
                type: 'object',
                defaultValue: [
                    { label: 'Settings' },
                    { label: 'Logout' },
                    { label: 'Config' },
                ],
            },
        },
        user: {
            control: {
                type: 'object',
                defaultValue: { name: 'Pepe', image: '' },
            },
        },
        logo: {
            control: {
                type: 'text',
                defaultValue: 'https://goatdata.com.ar/images/logodatagoat.png',
            },
        },
        widthLogo: {
            control: {
                type: 'text',
                defaultValue: '40px',
            },
        },
        heightLogo: {
            control: {
                type: 'text',
                defaultValue: '65px',
            },
        },
        activeRoute: {
            control: {
                type: 'text',
                defaultValue: 'about',
            },
        },
        theme:{
            control: {
                type: 'boolean',
                defaultValue: true,
            },
        }
    },
};

export default meta;

type Story = StoryObj<typeof Navbar>;

export const Primary: Story = {
    args: {
        variant: 'primary',
        list: [
            { label: 'Home', description: 'Vover al inicio donde puedes encontrar todo en una sola pantalla y examinar todas las necesidades de este proyecto', link: '/home', image: imagePrueba, subItems: [] },
            { label: 'About', description: 'Información requerida de este producto', link: '/about',image: "", subItems: [] },
            { label: 'Services', description: 'info pendiente', link: 'services',image: "", subItems: [{ label: 'Web Development',link:"/web" }, { label: 'SEO', link:"/seo" }] },
        ],
        listMenu: [{ label: 'Settings', link:"/settings" }, { label: 'Log Out', link:"/log" }, { label: 'Config', link:"/config" }],
        user: { name: 'Pepe', image: '' },
        logo: 'https://goatdata.com.ar/images/logodatagoat.png',
        widthLogo: '40px',
        heightLogo: '65px',
        activeRoute: '/about',
        theme: true,
        login: true,
    },
};

export const Secondary: Story = {
    args: {
        variant: 'secondary',
        list: [
            { label: 'Home', description: 'Información requerida de este producto', link: 'home',image: "", subItems: [] },
            { label: 'About', description: 'Información requerida de este producto', link: 'about',image: "", subItems: [] },
            { label: 'Services', description: '', link: 'services',image: "", subItems: [{ label: 'Web Development',link:"/web" }, { label: 'SEO', link:"/seo" }] },
        ],
        listMenu: [{ label: 'Settings', link:"/settings" }, { label: 'Log Out', link:"/log" }, { label: 'Config', link:"/config" }],
        user: { name: 'Andres', image: '' },
        activeRoute: '/seo',
        login: false,
    },
};