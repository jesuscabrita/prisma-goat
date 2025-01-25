import { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';
import imagePrueba from '../../assets/images/prueba.webp';
import imagePrueba2 from '../../assets/images/wallpaper-758922_1280.webp';
import imagePrueba3 from '../../assets/images/pruebass.jpg';

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
        //overlap: { text1:"Tu aventura comienza aquí", text2: "Explora lugares increíbles y descubre experiencias únicas.", text3: "Descubre más", text4: "Contáctanos"}
        //explore: { content: "#contenido"},
        //hero: { text1:"Bienvenido a", text2:"Nuestra Página" , text3: "Explora, descubre y vive experiencias únicas.", text4:"¡Empieza Ahora!"}
    },
};

// Secondary story
export const Secondary: Story = {
    args: {
        images: [
            { src: "https://via.placeholder.com/600x300", alt: "Secondary Image 1" },
        ],
        autoPlaySpeed: 5000,
        height: "300px",
    },
};