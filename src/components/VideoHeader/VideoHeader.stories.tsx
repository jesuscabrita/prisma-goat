import video from '../../assets/images/DISCONIGHT_CARRUSEL_2.mp4';
import { Meta, StoryObj } from '@storybook/react';
import { VideoHeader } from './VideoHeader';

const meta: Meta<typeof VideoHeader> = {
    title: 'Components/VideoHeader',
    tags: ['autodocs'],
    component: VideoHeader,
    argTypes: {

    },
};

export default meta;

type Story = StoryObj<typeof VideoHeader>;

export const Primary: Story = {
    args: {
        videoSrc: video,
        height: "400px",
        // nameImages: true,
        // nameImagesBotton:true,
        overlap: { text1: "Bienvenido a", text2: "Nuestra Página", text3: "Explora, descubre y vive experiencias únicas.", text4: "Descubre mas", text5: "Contactanos" },
        explore: { content: "#contenido" },
    },
};
