import { RiTwitterXFill as Twitter } from 'react-icons/ri';
import { BsInstagram as Instagram } from 'react-icons/bs';
import { BsLinkedin as Linkedin } from 'react-icons/bs';
import { BsFacebook as Facebook } from 'react-icons/bs';
import { Meta, StoryObj } from '@storybook/react';
import { Footer } from './Footer';

const meta: Meta<typeof Footer> = {
    title: 'Components/Footer',
    tags: ['autodocs'],
    component: Footer,
    argTypes: {
        variant: {
            control: {
                type: 'select',
                options: [
                    "goatData",
                    "secondary",
                    "experiences",
                ],
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof Footer>;

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
        contact: [
            { label: "Email:", description: "genesisdcabritar@gmail.com", type: "email" },
            { label: "Teléfono:", description: "+584124953318", type: "chat" },
            { label: "Dirección:", description: "10.17841, -67.47145", type: "mapa", descrption2: "Lote XVI - C, C-09-15 - La ciudadela , Cagua" },
        ],
        dataFiscal: { href: "http://qr.afip.gob.ar/?qr=rropX4nnV5DmL3zmVJVdKw,,", src: "http://www.afip.gob.ar/images/f960/DATAWEB.jpg", target: "_F960AFIPInfo" },
        redes: [
            { label: "facebook", icon: Facebook, type: "facebook" },
            { label: "twitter", icon: Twitter, type: "twitter" },
            { label: "linkedin", icon: Linkedin, type: "linkedin" },
            { label: "https://www.instagram.com/goatdata.tech", icon: Instagram, type: "instagram" },
        ],
    },
};