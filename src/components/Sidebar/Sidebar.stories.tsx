import imagePrueba from '../../assets/images/prueba.webp';
import type { Meta, StoryObj } from "@storybook/react";
import { AiFillCalculator } from "react-icons/ai";
import { AiOutlineHome } from "react-icons/ai";
import { MdEditSquare } from "react-icons/md";
import { FaPowerOff } from "react-icons/fa";
import { Sidebar } from "./Sidebar";

const meta: Meta<typeof Sidebar> = {
    title: "Components/Sidebar",
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    component: Sidebar,
    argTypes: {

    },
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
    args: {
        variant: 'primary',
        activeRoute: '/perfil',
        theme: true,
        InstallApp: true,
        listMenu: [{ label: 'Settings', link: "/settings" }, { label: 'Log Out', link: "/log" }, { label: 'Config', link: "/config" }],
        user: { name: 'Pepe', image: '' },
        list: [
            { label: "Inicio", icon: AiOutlineHome, description: "pruebs de sdess", image: "", link: "/", subItems: [] },
            { label: "Perfil", icon: MdEditSquare, description: "pruebs de sdess", image: "", link: "/perfil", subItems: [{ label: 'Web Development', link: "/web" }, { label: 'SEO', link: "/seo" }] },
            { label: "Configuración", icon: AiFillCalculator, description: 'Vover al inicio donde puedes encontrar todo en una sola pantalla y examinar todas las necesidades de este proyecto', image: imagePrueba, link: "/confi", subItems: [] },
            { label: "Cerrar sesión", icon: FaPowerOff, description: "pruebs de sdess", image: "", link: "log/", subItems: [] },
        ],
    },
};

export const Closed: Story = {
    args: {
        variant: 'secondary',
        activeRoute: '/perfil',
        listMenu: [{ label: 'Settings', link: "/settings" }, { label: 'Log Out', link: "/log" }, { label: 'Config', link: "/config" }],
        user: { name: 'Pepe', image: '' },
        theme: true,
        InstallApp: true,
        list: [
            { label: "Inicio", icon: AiOutlineHome, description: "pruebs de sdess", image: "", link: "/", subItems: [] },
            { label: "Perfil", icon: MdEditSquare, description: "pruebs de sdess", image: "", link: "/perfil", subItems: [] },
            { label: "Configuración", icon: AiFillCalculator, description: "pruebs de sdess", image: "config", link: "/", subItems: [] },
            { label: "Cerrar sesión", icon: FaPowerOff, description: "pruebs de sdess", image: "", link: "log/", subItems: [] },
        ],
    },
};