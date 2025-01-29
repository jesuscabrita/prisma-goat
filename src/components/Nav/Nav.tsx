import { forwardRef, PropsWithChildren, useEffect, useRef, useState } from "react";
import logogoatblanco from "../../assets/images/logogoatblanco.png"
import logoBlack from '../../assets/images/logo-black.png';
import { ButtonNavbar } from "./ButtonNavbar";
import { HTMLAttributes } from "react";
import { motion } from 'framer-motion';

export type NavProps = HTMLAttributes<HTMLElement> & {
    variant?: "goatData" | "secondary" | "experiences";
    items: { label: string; href: string; refId?: string; }[];
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
        const [isOpen, setIsOpen] = useState(false);
        const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map());
        const toggle = () => setIsOpen(!isOpen);
        const [position, setPosition] = useState<DOMRect>({
            top: 0,
            left: 0,
            width: 0,
            height: 0,
            bottom: 0,
            right: 0,
            x: 0,
            y: 0,
            toJSON: () => null,
        });

        useEffect(() => {
            items.forEach((item) => {
                const targetRef = itemRefs.current.get(item.refId || "");
                if (targetRef) {
                    targetRef.addEventListener("mouseenter", (e: MouseEvent) => {
                        const target = e.target as HTMLElement;
                        setPosition(target.getBoundingClientRect());
                    });
                }
            });
        }, [items]);

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
            experiences: "bg-[#a8dbce]",
        }

        const buttonStyle = {
            goatData: "#9a6d79",
            secondary: "#1f2937e7",
            experiences: "#f8b7cbd7"
        }

        const ViewportStyle = {
            goatData: "#ff0145",
            secondary: "#ff0145",
            experiences: "white"
        }

        const colorButtonStyle = {
            goatData: "white",
            secondary: "#1F2937",
            experiences: "#1F2937"
        }

        const textStyles = {
            goatData: "text-white",
            secondary: "text-[#1F2937]",
            experiences: "text-[#1F2937]"
        };

        return (
            <nav style={{ zIndex: 9999 }} ref={ref} {...props} className={`fixed top-0 left-0 right-0 z-10 ${bgStyles[variant]} bg-opacity-75`}>
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <motion.div
                        style={{ background: buttonStyle[variant] }}
                        className="absolute opacity-40 rounded z-20 pointer-events-none"
                        animate={{
                            top: position?.top || 0,
                            left: position?.left || 0,
                            width: position?.width || 0,
                            height: position?.height || 0,
                        }}
                    />
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            <button className={`menu ${isOpen ? (variant === 'secondary' || variant === "experiences" ? 'openedark' : 'opened') : ''}`} onClick={toggle} aria-label="Main Menu">
                                <svg width="45" height="45" viewBox="0 0 100 100" style={{ fill: "#f9f8f8 !important" }}>
                                    <path className={variant === 'secondary' || variant === "experiences" ? 'linedark linedark1' : "line line1"} d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
                                    <path className={variant === 'secondary' || variant === "experiences" ? 'linedark linedark2' : "line line2"} d="M 20,50 H 80" />
                                    <path className={variant === 'secondary' || variant === "experiences" ? 'linedark linedark3' : "line line3"} d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex flex-shrink-0 items-center">
                                <div className="flex flex-col items-center lg:ml-[120px] ml-0">
                                    <img
                                        className="block lg:hidden"
                                        style={{ height: heightLogo && heightLogo.trim() !== '' ? heightLogo : '40px', width: widthLogo && widthLogo.trim() !== '' ? widthLogo : '65px' }}
                                        src={logo && logo.trim() !== '' ? logo : (variant === 'secondary' || variant === "experiences" ? logoBlack : logogoatblanco)}
                                        alt="Logo"
                                    />
                                    <img
                                        className="hidden lg:block"
                                        style={{ height: heightLogo && heightLogo.trim() !== '' ? heightLogo : '40px', width: widthLogo && widthLogo.trim() !== '' ? widthLogo : '65px' }}
                                        src={logo && logo.trim() !== '' ? logo : (variant === 'secondary' || variant === "experiences" ? logoBlack : logogoatblanco)}
                                        alt="Logo"
                                    />
                                    {(!logo || logo.trim() === '') && (<div className={`text-[10px] ${textStyles[variant]} tracking-[4px]`}>DATA</div>)}
                                </div>
                            </div>
                            <div className="hidden sm:ml-6 sm:block flex-grow">
                                <nav className="flex justify-end">
                                    <ul className="flex space-x-4">
                                        {items.map(({ label, href, refId }) => (
                                            <li key={href}>
                                                <ButtonNavbar href={href} Viewport={ViewportStyle[variant]} colorButton={colorButtonStyle[variant]}>
                                                    <div
                                                        ref={(el) => el && refId && itemRefs.current.set(refId, el)}
                                                        id={refId}
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
                            <ButtonNavbar key={href} href={href} Viewport={ViewportStyle[variant]} colorButton={colorButtonStyle[variant]}>
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