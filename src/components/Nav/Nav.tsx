import { forwardRef, PropsWithChildren, useEffect, useRef, useState } from "react";
import logogoatblanco from "../../assets/images/logogoatblanco.png"
import logoBlack from '../../assets/images/logo-black.png';
import { ButtonNavbar } from "./ButtonNavbar";
import { useMobile } from "../../utils";
import { HTMLAttributes } from "react";
import { motion } from 'framer-motion';

export type NavProps = HTMLAttributes<HTMLElement> & {
    variant?: "goatData" | "secondary" | "experiences";
    items: { label: string; href: string; refId: string; }[];
    logo?: string;
    heightLogo?: string;
    widthLogo?: string;
};

export const Nav = forwardRef<HTMLElement, PropsWithChildren<NavProps>>(
    (
        {
            variant = "goatData",
            items = [],
            logo,
            heightLogo = "40px",
            widthLogo = "65px",
            ...props
        }, ref) => {
        const mobile = useMobile();
        const [isOpen, setIsOpen] = useState(false);
        const [position, setPosition] = useState<DOMRect | undefined>(undefined);
        const [currentView] = useState<string>('');
        const refs = items.reduce((acc, item) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            acc[item.refId] = useRef<HTMLDivElement>(null);
            return acc;
        }, {} as Record<string, React.RefObject<HTMLDivElement>>);
        const toggle = () => setIsOpen(!isOpen);

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

        const bgStyles = {
            goatData: "bg-zinc-900",
            secondary: "bg-[#ededed]",
            experiences: "bg-zinc-900",
        }

        const buttonStyle = {
            goatData: "#9a6d79",
            secondary: "#1f2937e7",
            experiences: "#a8dbce"
        }

        const ViewportStyle = {
            goatData: "#ff0145",
            secondary: "#ff0145",
            experiences: "#1f2937e7"
        }

        const colorButtonStyle = {
            goatData: "white",
            secondary: "#1F2937",
            experiences: "white"
        }

        const textStyles = {
            goatData: "text-white",
            secondary: "text-[#1F2937]",
            experiences: "text-white"
        };

        return (
            <nav ref={ref} {...props} style={{ zIndex: 9999, position: "fixed", top: "0px", left: "0px", right: "0px" }} className={`${bgStyles[variant]} bg-opacity-75`}>
                <div style={{ marginLeft: "auto", marginRight: "auto", maxWidth: "80rem", paddingLeft: !mobile ? "1.5rem" : "0.5rem", paddingRight: !mobile ? "1.5rem" : "0.5rem" }}>
                    <motion.div
                        style={{ background: buttonStyle[variant], position: "absolute", opacity: 0.4, borderRadius: "0.25rem" }}
                        className="z-20 pointer-events-none"
                        animate={{
                            top: position?.top || 0,
                            left: position?.left || 0,
                            width: position?.width || 0,
                            height: position?.height || 0,
                        }}
                    />
                    <div style={{ position: "relative", display: "flex", height: "4rem", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ position: "absolute", top: "0px", bottom: "0px", left: "0px", display: !mobile ? "none" : "flex", alignItems: "center" }}>
                            <button className={`menu ${isOpen ? (variant === 'secondary' ? 'openedark' : 'opened') : ''}`} onClick={toggle} aria-label="Main Menu">
                                <svg width="45" height="45" viewBox="0 0 100 100" style={{ fill: "#f9f8f8 !important" }}>
                                    <path className={variant === 'secondary' ? 'linedark linedark1' : "line line1"} d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
                                    <path className={variant === 'secondary' ? 'linedark linedark2' : "line line2"} d="M 20,50 H 80" />
                                    <path className={variant === 'secondary' ? 'linedark linedark3' : "line line3"} d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
                                </svg>
                            </button>
                        </div>
                        <div style={{ display: "flex", flex: "1 1 0%", alignItems: "center", justifyContent: mobile ? "center" : "stretch" }}>
                            <div className="flex flex-shrink-0 items-center">
                                <div className="flex flex-col items-center lg:ml-[120px] ml-0">
                                    <img
                                        className={`${mobile ? "hidden" :"block"}`}
                                        style={{ height: heightLogo && heightLogo.trim() !== '' ? heightLogo : '40px', width: widthLogo && widthLogo.trim() !== '' ? widthLogo : '65px' }}
                                        src={logo && logo.trim() !== '' ? logo : (variant === 'secondary' ? logoBlack : logogoatblanco)}
                                        alt="Logo"
                                    />
                                    <img
                                        className={`${!mobile ? "hidden" :"block"}`}
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
                                        {items.map(({ label, href, refId }) => (
                                            <li key={href}>
                                                <ButtonNavbar href={href} Viewport={ViewportStyle[variant]} colorButton={colorButtonStyle[variant]} setIsOpen={setIsOpen}>
                                                    <div
                                                        id={refId}
                                                        ref={refs[refId]}
                                                        style={{ padding: "6px", color: colorButtonStyle[variant] }}
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
                    <div className="space-y-1 px-2 pt-2 pb-3">
                        {items.map(({ label, href }) => (
                            <ButtonNavbar key={href} href={href} Viewport={ViewportStyle[variant]} colorButton={colorButtonStyle[variant]} setIsOpen={setIsOpen}>
                                {label}
                            </ButtonNavbar>
                        ))}
                    </div>
                )}
            </nav>
        );
    }
);

Nav.displayName = "Nav";