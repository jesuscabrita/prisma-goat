import type { Meta, StoryObj } from "@storybook/react";
import { Navbar } from "./Navbar";

const meta: Meta<typeof Navbar> = {
    title: "Components/Navbar",
    tags: ["autodocs"],
    component: Navbar,
    argTypes: {
        variant: {
            control: {
                type: "select",
                options: [
                    "primary",
                    "secondary",
                    "vividPink",
                    "darkMagenta",
                    "veryDarkViolet",
                    "danger",
                    "warning",
                    "success",
                ],
            },
        },
        list: {
            control: {
                
                options: [{ label: "Home" }, { label: "About" }, { label: "Contact" }],
            },
        },
        listMenu: {
            control: {
                
                options: [{ label: "Settings" }, { label: "Logout" }],
            },
        },
        user: {
            control: {
                type: "object",
                option: { name: 'Pepe', image: '' }
            },
        },
        logo: {
            control:{
                type: "text",
                option:{ logo: "https://goatdata.com.ar/images/logodatagoat.png"},
            }
        },
        widthLogo:{
            control:{
                type: "text",
                option:{ width: "40px"},
            }
        },
        heightLogo:{
            control:{
                type: "text",
                option:{ height: "65px"},
            }
        }
    },
};

export default meta;

type Story = StoryObj<typeof Navbar>;

export const Primary: Story = {
    args: {
        variant: "primary",
        list: [
            { label: "Home", description: "Información requerida de este producto", link:"home", subItems: [] },
            { label: "About", description: "Información requerida de este producto",link:"about", subItems: [] },
            { label: "Services", description: "info pendiente",link:"services", subItems: [{ label: "Web Development" }, { label: "SEO" }] }, 
        ],
        listMenu: [{ label: "Profile" }, { label: "Logout" }, { label: "Config" }],
        user: { name: 'Pepe', image: '' },
        logo:'https://goatdata.com.ar/images/logodatagoat.png',
        widthLogo:'40px',
        heightLogo:'65px',
        activeRoute:'about'
    },
};

export const Secondary: Story = {
    args: {
        variant: "secondary",
        list: [
            { label: "Home", description: "Información requerida de este producto",link:"home", subItems: [] },
            { label: "About", description: "Información requerida de este producto",link:"about", subItems: [] },
            { label: "Services", description: "",link:"services", subItems: [{ label: "Web Development" }, { label: "SEO" }] }, 
        ],
        listMenu: [{ label: "Settings" }, { label: "Log Out" }, { label: "Config" }],
        user: { name: 'Andres', image: '' },
    },
};