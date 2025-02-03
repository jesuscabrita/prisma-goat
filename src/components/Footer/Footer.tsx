import { forwardRef, HTMLAttributes, PropsWithChildren, ReactNode, useState } from "react";
import logogoatblanco from "../../assets/images/logogoatblanco.png";
import logoBlack from '../../assets/images/logo-black.png';
import logoWhite from "../../assets/images/goat.png"
import { IconType } from "react-icons";

export type FooterProps = HTMLAttributes<HTMLElement> & {
    variant?: "goatData" | "secondary" | "experiences";
    logo?: string;
    heightLogo?: string;
    widthLogo?: string;
    items?: { label: string; href: string; refId?: string; }[];
    contact?: { label: string; description: string; type: string; descrption2?: string }[];
    dataFiscal?: { href: string; src: string; target: string };
    redes?: { label: string; type: string; icon?: IconType }[];
    company?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    router?: any;
    list?: Array<{ label: string, description: string, link: string, }>;
    extraComponent?: ReactNode;
};

export const Footer = forwardRef<HTMLElement, PropsWithChildren<FooterProps>>(
    (
        {
            variant = "goatData",
            items = [],
            contact = [],
            redes = [],
            list = [],
            dataFiscal = {},
            logo,
            router,
            extraComponent,
            heightLogo = "60px",
            widthLogo = "85px",
            company = "2025 GOAT DATA",
            ...props
        }, ref) => {
        const [mensajeAutomatico] = useState(`Hola, Necesito más información!`);

        const buttonStyles = `
                p-2 rounded-lg text-sm bg-transparent opacity-70
                cursor-pointer tracking-widest
            `;

        const bgStyles = {
            goatData: "bg-zinc-800",
            secondary: "bg-[#acaaaa]",
            experiences: "bg-[#a8dbce]",
        }

        const bgStylesFooter = {
            goatData: "bg-zinc-600",
            secondary: "bg-zinc-800",
            experiences: "bg-zinc-800",
        }

        const handleChatClick = (telf: string) => {
            const numero = telf;
            const mensaje = encodeURIComponent(mensajeAutomatico);
            const whatsappLink = `https://api.whatsapp.com/send?phone=${numero}&text=${mensaje}`;
            window.open(whatsappLink, '_blank');
        };

        const handleCorreoClick = (email: string) => {
            const correoLink = `mailto:${email}?subject=Solicitud&body=${mensajeAutomatico}`;
            window.open(correoLink);
        }

        const handleMapLinkClick = (addres: string) => {
            const address = addres;
            const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
            window.open(mapUrl, '_blank');
        };

        const handleClickLink = (href: string) => {
            const targetElement = document.getElementById(href.slice(1));
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth" });
            }
        };

        const openRedes = (description: string) => {
            window.open(description, '_blank');
        }

        const textStyles = {
            goatData: "text-white",
            secondary: "text-[#1F2937]",
            experiences: "text-[#1F2937]"
        };

        const handleNavigation = (nav: { link: string; }) => {
            if (nav.link && router) {
                router.push(nav.link);
            }
        };

        return (
            <footer ref={ref} {...props} className={`${bgStyles[variant]} ${textStyles[variant]}`} style={{ paddingTop: '40px' }}>
                <div className="container mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                        <div className="flex flex-col items-center">
                            <img
                                style={{ height: heightLogo && heightLogo.trim() !== '' ? heightLogo : '40px', width: widthLogo && widthLogo.trim() !== '' ? widthLogo : '65px' }}
                                src={logo && logo.trim() !== '' ? logo : ((variant === 'secondary' || variant === "experiences") ? logoBlack : logogoatblanco)}
                                alt="logo"
                            />
                            {(!logo || logo.trim() === '') && (<div className={`text-[14x] ${textStyles[variant]} tracking-[4px]`}>DATA</div>)}
                        </div>
                        <div className="flex flex-col items-center">
                            <h2 className="text-lg font-semibold mb-4">Enlaces Rápidos</h2>
                            {items.length > 0 &&
                                <div className="text-center sm:text-left" style={{ display: "flex", flexDirection: "column", justifyContent: "end", }}>
                                    {items.map((data, index) => {
                                        return (
                                            <div key={index}>
                                                <button className={buttonStyles} onClick={() => { handleClickLink(data.href) }}>
                                                    {data.label}
                                                </button>
                                            </div>
                                        )
                                    })}
                                </div>}
                            {list.length > 0 &&
                                <div className="text-center sm:text-left" style={{ display: "flex", flexDirection: "column", justifyContent: "end", }}>
                                    {list.map((data, index) => {
                                        return (
                                            <div key={index}>
                                                <button className={buttonStyles} onClick={() => { handleNavigation(data) }}>
                                                    {data.label}
                                                </button>
                                            </div>
                                        )
                                    })}
                                </div>}
                        </div>
                        <div className="flex flex-col items-center">
                            <h2 className="text-lg font-semibold mb-4">Contacto</h2>
                            <div className="text-center sm:text-left" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                {contact.map((data, index) => {
                                    return (
                                        <div key={index}>
                                            <div className="text-sm opacity-70 cursor-pointer mb-4"
                                                onClick={data.type === "email"
                                                    ? () => handleCorreoClick(data.description)
                                                    : data.type === "chat"
                                                        ? () => handleChatClick(data.description)
                                                        : data.type === "mapa"
                                                            ? () => handleMapLinkClick(data.description)
                                                            : undefined}>
                                                <strong>{data.label}</strong> {data.type === "mapa" ? data.descrption2 : data.description}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        {dataFiscal.href &&
                            (<div className="flex flex-col items-center">
                                <h2 className="text-lg font-semibold mb-4">Data fiscal</h2>
                                <a href={dataFiscal.href} target={dataFiscal.target}>
                                    <img style={{ height: '120px' }} src={dataFiscal.src} />
                                </a>
                            </div>)}
                        {extraComponent &&
                            <div className="flex flex-col items-center">
                                <h2 className="text-lg font-semibold mb-4">Escribenos</h2>
                                {extraComponent}
                            </div>}
                    </div>
                    <div className="flex flex-col items-center mt-8">
                        <h2 className="text-lg font-semibold mb-4">Redes Sociales</h2>
                        <div className="flex space-x-4" style={{ marginBottom: '30px' }}>
                            {redes.map((data, index) => {
                                return (
                                    <div key={index} style={{ cursor: 'pointer' }} onClick={() => { openRedes(data.label) }}>
                                        {data?.icon && (
                                            <data.icon className="w-6 h-6" />
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div style={{ paddingTop: "1rem", paddingBottom: "1rem", display: "flex", flexDirection: "column", alignItems: "center" }} className={`${bgStylesFooter[variant]}`}>
                    <p style={{ fontSize: "10px" }} className={`text-white`}>{`© ${company}. TODOS LOS DERECHOS RESERVADOS.`}</p>
                    <a href="https://goatdata.com.ar/" target="_blank" rel="noopener noreferrer" className="mt-2 flex items-center">
                        <span className={`text-xs text-white underline`}>Diseñado y desarrollado por</span>
                        <img src={logoWhite} alt="Goat Data Logo" className="h-2.5 mx-1" />
                        <span className={`text-xs text-white`}>DATA</span>
                    </a>
                </div>
            </footer>
        );
    }
);

Footer.displayName = "Footer";