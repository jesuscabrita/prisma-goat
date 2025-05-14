import { IconEmail, IconInstagram, IconLinkedin, IconoFacebook, IconTickTok, IconWhatsapp } from "../../Icons/Index";
import { forwardRef, PropsWithChildren, useEffect, useRef, useState } from "react";
import { LoadingIndicator } from "../LoadingIndicator/LoadingIndicator";
import logogoatblanco from "../../assets/images/logogoatblanco.png"
import logoBlack from '../../assets/images/logo-black.png';
import { ButtonNavbar } from "./ButtonNavbar";
import { useMobile } from "../../utils";
import { HTMLAttributes } from "react";
import { motion } from 'framer-motion';

export type NavProps = HTMLAttributes<HTMLElement> & {
    variant?: "goatData" | "secondary" | "experiences";
    items: { label: string; href: string; refId: string; routerApp?: boolean; open?: boolean; link?: string; }[];
    logo?: string;
    heightLogo?: string;
    widthLogo?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    router?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleOpenItem?: (e?: any) => void;
    variantIndicator?: "primary" | "secondary" | "vividPink" | "darkMagenta" | "veryDarkViolet" | "danger" | "warning" | "success";
    backgroundIndicator?: "black" | "white";
    logoGoatDataIndicator?: "logoRed" | "logoBlack" | "logo6" | "logoMagenta" | "logoWhite";
    imgLoadingIndicator?: string;
    strokeWidthIndicator?: "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14";
};

export const Nav = forwardRef<HTMLElement, PropsWithChildren<NavProps>>(
    (
        {
            variant = "goatData",
            items = [],
            logo,
            heightLogo = "40px",
            widthLogo = "65px",
            router,
            variantIndicator = "primary",
            backgroundIndicator = "black",
            logoGoatDataIndicator = "logoRed",
            imgLoadingIndicator = "",
            strokeWidthIndicator = "10",
            handleOpenItem,
            ...props
        }, ref) => {
        const mobile = useMobile();
        const [isOpen, setIsOpen] = useState(false);
        const [indicator, setIndicator] = useState(false);
        const [position, setPosition] = useState<DOMRect | undefined>(undefined);
        const [currentView] = useState<string>('');
        const refs = items.reduce((acc, item) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            acc[item.refId] = useRef<HTMLDivElement>(null);
            return acc;
        }, {} as Record<string, React.RefObject<HTMLDivElement>>);
        const toggle = () => setIsOpen(!isOpen);
        const [showContactInfo, setShowContactInfo] = useState(true);

        useEffect(() => {
            const handleScroll = () => {
                setShowContactInfo(window.scrollY < 50);
            };

            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
        }, []);

        useEffect(() => {
            items.forEach((item) => {
                const targetRef = refs[item.refId];
                if (targetRef?.current) {
                    const handleMouseEnter = (e: MouseEvent) => {
                        const target = e.target as HTMLElement;
                        setPosition(target.getBoundingClientRect());
                    };
                    targetRef.current.addEventListener("mouseenter", handleMouseEnter);
                }
            });
            const targetRef = refs[currentView];
            if (targetRef?.current) {
                setPosition(targetRef.current.getBoundingClientRect());
            }
            return () => {
                items.forEach((item) => {
                    const targetRef = refs[item.refId];
                    if (targetRef?.current) {
                        targetRef.current.removeEventListener("mouseenter", () => { });
                    }
                });
            };
        }, [currentView, items, refs]);

        useEffect(() => {
            const mediaQuery = window.matchMedia("(min-width: 640px)");
            const closeMenuOnLargeScreen = () => {
                if (mediaQuery.matches && isOpen) {
                    setIsOpen(false);
                }
            };
            mediaQuery.addEventListener("change", closeMenuOnLargeScreen);
            return () => {
                mediaQuery.removeEventListener("change", closeMenuOnLargeScreen);
            };
        }, [isOpen]);

        useEffect(() => {
            if (typeof window !== "undefined" && router?.events) {
                const handleStartLoading = () => {
                    setIndicator(true);
                };
                const handleStopLoading = () => {
                    setIndicator(false);
                };
                router.events.on('routeChangeStart', handleStartLoading);
                router.events.on('routeChangeComplete', handleStopLoading);
                router.events.on('routeChangeError', handleStopLoading);
                return () => {
                    router.events.off('routeChangeStart', handleStartLoading);
                    router.events.off('routeChangeComplete', handleStopLoading);
                    router.events.off('routeChangeError', handleStopLoading);
                };
            }
        }, [router]);

        const bgStyles = {
            goatData: "bg-zinc-900",
            secondary: "bg-[#ededed]",
            experiences: "bg-[#FFFFFF]",
        }

        const buttonStyle = {
            goatData: "#9a6d79",
            secondary: "#1f2937e7",
            experiences: "#6BC1E4"
        }

        const ViewportStyle = {
            goatData: "#ff0145",
            secondary: "#ff0145",
            experiences: "#1f2937e7"
        }

        const colorButtonStyle = {
            goatData: "white",
            secondary: "#1F2937",
            experiences: "#000000"
        }

        const textStyles = {
            goatData: "text-white",
            secondary: "text-[#1F2937]",
            experiences: "text-white"
        };

        const handleChatClick = (telf: string) => {
            const numero = telf;
            const mensaje = encodeURIComponent('Hola, me gustaría obtener más información sobre las experiencias personalizadas que ofrecen en Experiencias Viajes. Estoy interesado en conocer más sobre sus servicios exclusivos a bordo de embarcaciones de lujo.');
            const whatsappLink = `https://api.whatsapp.com/send?phone=${numero}&text=${mensaje}`;
            window.open(whatsappLink, '_blank');
        };

        const handleCorreoClick = (email: string) => {
            const correoLink = `mailto:${email}?subject=Solicitud&body=Hola, Necesito más información!`;
            window.open(correoLink);
        }

        const openRedes = (description: string) => {
            window.open(description, '_blank');
        }

        return (
            <nav ref={ref} {...props} style={{ zIndex: 9999, position: "fixed", top: "0px", left: "0px", right: "0px" }} className={`${bgStyles[variant]} ${variant === "experiences" ? "" : "bg-opacity-75"} `}>
                {variant === "experiences" && showContactInfo && (
                    <div className="bg-[#F2AE87] text-white transition-all duration-300">
                        <div className={`flex ${mobile ? "flex-col items-end" : "flex-row items-center"} justify-around gap-4 px-4 py-2 text-sm`}>
                            {!mobile && (
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleChatClick("+5491140999887")}  >
                                        <IconWhatsapp />
                                        <span>+54 114099-9887</span>
                                    </div>
                                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleCorreoClick("experiencias.viajes.arg@gmail.com")} >
                                        <IconEmail />
                                        <span>experiencias.viajes.arg@gmail.com</span>
                                    </div>
                                </div>
                            )}
                            <div style={{ paddingRight: mobile ? "40px" : "" }} className="flex gap-2 mt-2 sm:mt-0" >
                                <div onClick={() => { openRedes("https://www.instagram.com/experienciasviajes.arg/") }}>
                                    <IconInstagram />
                                </div>
                                <div onClick={() => { openRedes("https://www.facebook.com/experienciasviajes.arg/") }}>
                                    <IconoFacebook />
                                </div>
                                <div onClick={() => { openRedes("https://www.tiktok.com/@mariacianexperiencias") }}>
                                    <IconTickTok />
                                </div>
                                <div onClick={() => { openRedes("https://www.linkedin.com/in/experienciasviajes-arg-by-maria-cian-0b075014/") }}>
                                    <IconLinkedin />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div style={{ marginLeft: "auto", marginRight: "auto", maxWidth: "80rem", paddingLeft: !mobile ? "1.5rem" : "0.5rem", paddingRight: !mobile ? "1.5rem" : "0.5rem" }}>
                    {(variant === "goatData" || variant === "secondary") &&
                        <motion.div
                            style={{ background: buttonStyle[variant], position: "absolute", opacity: 0.4, borderRadius: "0.25rem" }}
                            className="z-20 pointer-events-none"
                            animate={{
                                top: position?.top || 0,
                                left: position?.left || 0,
                                width: position?.width || 0,
                                height: position?.height || 0,
                            }}
                        />}
                    <div style={{ position: "relative", display: "flex", height: "4rem", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ position: "absolute", top: "0px", bottom: "0px", left: variant === "experiences" ? "auto" : "0px", right: variant === "experiences" ? "0px" : "auto", display: !mobile ? "none" : "flex", alignItems: "center" }}>
                            <button className={`menu ${isOpen ? ((variant === 'secondary') ? 'openedark' : variant === "experiences" ? "openeExperiences" : 'opened') : ''}`} onClick={toggle} aria-label="Main Menu">
                                <svg width="45" height="45" viewBox="0 0 100 100" style={{ fill: "#f9f8f8 !important" }}>
                                    <path className={(variant === 'secondary') ? 'linedark linedark1' : variant === "experiences" ? "lineExperiences lineExperiences1" : "line line1"} d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
                                    <path className={(variant === 'secondary') ? 'linedark linedark2' : variant === "experiences" ? "lineExperiences lineExperiences2" : "line line2"} d="M 20,50 H 80" />
                                    <path className={(variant === 'secondary') ? 'linedark linedark3' : variant === "experiences" ? "lineExperiences lineExperiences3" : "line line3"} d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
                                </svg>
                            </button>
                        </div>
                        <div style={{ display: "flex", flex: (variant === "experiences" && mobile) ? "" : "1 1 0%", alignItems: "center", justifyContent: mobile ? "center" : variant === "experiences" ? "flex-end" : "stretch" }}>
                            <div className="flex flex-shrink-0 items-center" style={{ paddingLeft: variant === "experiences" ? "20px" : "" }}>
                                <div className="flex flex-col items-center lg:ml-[120px] ml-0">
                                    <img
                                        className={`${mobile ? "hidden" : "block"}`}
                                        style={{ height: heightLogo && heightLogo.trim() !== '' ? heightLogo : '40px', width: widthLogo && widthLogo.trim() !== '' ? widthLogo : '65px' }}
                                        src={logo && logo.trim() !== '' ? logo : (variant === 'secondary' ? logoBlack : logogoatblanco)}
                                        alt="Logo"
                                    />
                                    <img
                                        className={`${!mobile ? "hidden" : "block"}`}
                                        style={{ height: heightLogo && heightLogo.trim() !== '' ? heightLogo : '40px', width: widthLogo && widthLogo.trim() !== '' ? widthLogo : '65px' }}
                                        src={logo && logo.trim() !== '' ? logo : (variant === 'secondary' ? logoBlack : logogoatblanco)}
                                        alt="Logo"
                                    />
                                    {(!logo || logo.trim() === '') && (<div className={`text-[10px] ${textStyles[variant]} tracking-[4px]`}>DATA</div>)}
                                </div>
                            </div>
                            <div style={{ display: mobile ? "none" : "block", flexGrow: 1, marginLeft: "1.5rem" }}>
                                <nav style={{ display: "flex", justifyContent: "flex-end" }}>
                                    <ul className="flex space-x-4">
                                        {items.map(({ label, href, refId, open, routerApp, link }) => (
                                            <li key={href}>
                                                <ButtonNavbar
                                                    href={href}
                                                    Viewport={ViewportStyle[variant]}
                                                    colorButton={colorButtonStyle[variant]}
                                                    setIsOpen={setIsOpen}
                                                    open={open}
                                                    routerApp={routerApp}
                                                    handleOpen={() => { handleOpenItem?.({ label }); setIsOpen(false); }}
                                                    handleRouter={() => { router.push(link); setIsOpen(false); }}
                                                >
                                                    <div
                                                        id={refId}
                                                        ref={refs[refId]}
                                                        className={`
                                                            relative inline-block px-2 py-2
                                                            text-[${colorButtonStyle[variant]}]
                                                            after:content-['']
                                                            after:absolute
                                                            after:left-0
                                                            after:bottom-0
                                                            after:h-[3px]
                                                            after:w-0
                                                            ${variant === "experiences" ? "after:bg-[#6BC1E4]" : "after:bg-transparent"}
                                                            after:transition-all
                                                            after:duration-300
                                                            group-hover:after:w-full
                                                        `}
                                                    >
                                                        {label}
                                                    </div>
                                                </ButtonNavbar>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                {isOpen && (
                    <div style={{ display: (variant === "experiences" && mobile) ? "flex" : "", flexDirection: "column", alignItems: "end" }} className={variant === "experiences" ? "absolute top-full right-0 mt-2 py-4 px-6 bg-white border border-gray-200 shadow-lg rounded-md w-56 z-50" : "space-y-1 px-2 pt-2 pb-3"}>
                        {items.map(({ label, href, open, routerApp, link }) => (
                            <ButtonNavbar
                                key={href}
                                href={href}
                                Viewport={ViewportStyle[variant]}
                                colorButton={colorButtonStyle[variant]}
                                setIsOpen={setIsOpen}
                                open={open}
                                routerApp={routerApp}
                                handleOpen={() => { handleOpenItem?.({ label }); setIsOpen(false); }}
                                handleRouter={() => { router.push(link); setIsOpen(false); }}
                            >
                                <div
                                    style={{ whiteSpace: "nowrap" }}
                                    className={`
                                        relative inline-block px-2 py-1
                                        text-[${colorButtonStyle[variant]}]
                                        after:content-['']
                                        after:absolute
                                        after:left-0
                                        after:bottom-0
                                        after:h-[3px]
                                        after:w-0
                                        ${variant === "experiences" ? "after:bg-[#6BC1E4]" : "after:bg-transparent"}
                                        after:transition-all
                                        after:duration-300
                                        group-hover:after:w-full
                                    `}
                                >
                                    {label}
                                </div>
                            </ButtonNavbar>
                        ))}
                    </div>
                )}
                {indicator &&
                    <LoadingIndicator
                        variant={variantIndicator}
                        background={backgroundIndicator}
                        logoGoatData={logoGoatDataIndicator}
                        imgLoading={imgLoadingIndicator}
                        strokeWidth={strokeWidthIndicator}
                    />}
            </nav>
        );
    }
);

Nav.displayName = "Nav";