import imagePrueba2 from '../../assets/images/wallpaper-758922_1280.webp';
import imagePrueba3 from '../../assets/images/pruebass.jpg';
import imagePrueba from '../../assets/images/prueba.webp';
import { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';

const meta: Meta<typeof Header> = {
    title: 'Components/Header',
    tags: ['autodocs'],
    component: Header,
    argTypes: {

    },
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Primary: Story = {
    args: {
        images: [
            { src: imagePrueba, alt: "Image 1" },
            { src: imagePrueba2, alt: "Image 2" },
            { src: imagePrueba3, alt: "Image 3" },
        ],
        autoPlaySpeed: 3000,
        height: "400px",
        // nameImages: true,
        // nameImagesBotton:true,
        overlap: { text1: "Bienvenido a", text2: "Nuestra Página", text3: "Explora, descubre y vive experiencias únicas.", text4: "Descubre mas", text5: "Contactanos" },
        explore: { content: "#contenido" },
    },
};

export const Secondary: Story = {
    args: {
        images: [
            { src: imagePrueba, alt: "Image 1" },
            { src: imagePrueba2, alt: "Image 2" },
            { src: imagePrueba3, alt: "Image 3" },
        ],
        autoPlaySpeed: 5000,
        height: "300px",
        nameImagesBotton:true,
        //nameImages: true
    },
};