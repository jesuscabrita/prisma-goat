import { activeRouterBgStyles, border2Styles, borderStyles, bottonArrow, focusStyles, hoverStyles, textStyles, variantStyles } from "../Navbar/utils";
import { forwardRef, HTMLAttributes, useEffect, useRef, useState } from "react";
import { LoadingIndicator } from "../LoadingIndicator/LoadingIndicator";
import { InstallAppButton, ThemeSwitch } from "../Navbar/Icons";
import { FaCircleArrowRight } from "react-icons/fa6";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { CiMenuKebab } from "react-icons/ci";
import { IconType } from "react-icons";
import LogoWhiteSize from "../../assets/images/logogoatblanco.png"
import logoBlackMin from '../../assets/images/LogoBlack.png';
import logoWhite from '../../assets/images/LogosWhite.png';
import logoBlack from '../../assets/images/logo-black.png';
import clsx from "clsx";

export type SidebarProps = HTMLAttributes<HTMLDivElement> & {
    variant?: "primary" | "secondary" | "vividPink" | "darkMagenta" | "veryDarkViolet" | "danger" | "warning" | "success" | "pikaros";
    list?: Array<{ label: string, description: string, link: string, image: string, icon?: IconType, subItems: { label: string, link: string }[] }>;
    className?: string;
    logo?: string;
    heightLogo?: string;
    widthLogo?: string;
    activeRoute?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    router: any;
    user?: { name: string; image?: string };
    listMenu?: Array<{ label: string, link: string }>;
    theme?: boolean;
    InstallApp?: boolean;
    handleLogout?: () => void;
    toggleTheme?: () => void;
    toggeInstallApp?: () => void;
    handleTogge?:()=> void;
    variantIndicator?: "primary" | "secondary" | "vividPink" | "darkMagenta" | "veryDarkViolet" | "danger" | "warning" | "success";
    backgroundIndicator?: "black" | "white";
    logoGoatDataIndicator?: "logoRed" | "logoBlack" | "logo6" | "logoMagenta" | "logoWhite";
    imgLoadingIndicator?: string;
    strokeWidthIndicator?: "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14";
};

export const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
    (
        {
            list = [],
            listMenu = [],
            variant = "primary",
            className,
            logo,
            heightLogo,
            widthLogo,
            activeRoute,
            router,
            user,
            theme,
            InstallApp,
            variantIndicator = "primary",
            backgroundIndicator = "black",
            logoGoatDataIndicator = "logoRed",
            imgLoadingIndicator = "",
            strokeWidthIndicator = "10",
            handleLogout,
            toggleTheme,
            toggeInstallApp,
            handleTogge,
            ...props
        },
        ref) => {
        const [isOpen, setIsOpen] = useState(true);
        const [openMenu, setOpenMenu] = useState<number | null>(null);
        const [isMenuOpen, setIsMenuOpen] = useState(false);
        const [hovered, setHovered] = useState<number | null>(null);
        const [indicator, setIndicator] = useState(false);
        const menuRef = useRef<HTMLDivElement>(null);
        const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);
        const handleMenuClose = () => setIsMenuOpen(false);

        const toggleSidebar = () => {
            if (handleTogge) {
                handleTogge()
            }
            setIsOpen((prevState) => !prevState)
        }

        const handleNavigation = (nav: { label: string; description: string; link: string; subItems: { label: string }[] }, index: number) => {
            if (nav.subItems && nav.subItems.length > 0) {
                setOpenMenu(prev => prev === index ? -1 : index);
            } else if (nav.link && router) {
                router.push(nav.link);
            }
        };

        const handleSubNavigation = (subItem: { label: string; link: string; }, index: number) => {
            setOpenMenu(prev => prev === index ? -1 : index);
            if (subItem.link && router) {
                router.push(subItem.link);
            }
        };

        const handleListMenuNavigation = (item: { label: string; link: string; }) => {
            if (item.link && router) {
                router.push(item.link);
                handleMenuClose();
            }
        };

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

        return (
            <div
                ref={ref}
                {...props}
                style={{ width: isOpen ? "250px" : "70px" }}
                className={clsx(
                    `fixed top-0 left-0 h-full ${variantStyles[variant]} text-white shadow-lg transition-all z-50`,
                    className
                )}
            >
                <div className="flex flex-shrink-0 items-center mt-4" style={{ flexDirection: 'column' }}>
                    <img
                        alt="logo"
                        className="block w-auto lg:hidden"
                        style={{ height: heightLogo && heightLogo.trim() !== '' ? heightLogo : '40px', width: widthLogo && widthLogo.trim() !== '' ? widthLogo : '65px' }}
                        src={logo && logo.trim() !== '' ? logo : (variant === 'secondary' ? logoBlack : LogoWhiteSize)}
                    />
                    <img
                        alt="logo"
                        className="hidden lg:block"
                        style={{ height: heightLogo && heightLogo.trim() !== '' ? heightLogo : (isOpen ? '70px' : ''), width: widthLogo && widthLogo.trim() !== '' ? widthLogo : (isOpen ? '110px' : "40px") }}
                        src={logo && logo.trim() !== '' ? logo : (variant === 'secondary' ? (isOpen ? logoBlack : logoBlackMin) : (isOpen ? LogoWhiteSize : logoWhite))}
                    />
                    {(!logo || logo.trim() === '') && (
                        <div className={`${textStyles[variant]} ${!isOpen ? "lock w-auto lg:hidden" : ""}`} style={{ fontSize: isOpen ? "12px" : '8px', letterSpacing: '4px' }}>
                            DATA
                        </div>
                    )}
                </div>
                {toggleSidebar && (
                    <button
                        onClick={toggleSidebar}
                        className={`absolute -right-3 transform -translate-y-1/2 p-1 rounded-full shadow-md ${bottonArrow[variant]} focus:outline-none`}
                    >
                        {isOpen ? <FaCircleArrowRight size={20} /> : <FaCircleArrowLeft size={20} />}
                    </button>
                )}
                <div style={{ marginLeft: '20px', marginRight: '20px', border: `1px ${border2Styles[variant]} solid`, marginTop: '14px' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', height: '75vh' }}>
                    <div className="flex flex-col items-start p-4 space-y-4 mt-7">
                        {list.map((nav, index) => (
                            <div key={index} className="w-full relative group">
                                <button
                                    type="button"
                                    className={clsx(
                                        `flex items-center justify-start w-full ${isOpen ? "px-4" : ""
                                        } ${isOpen ? "py-2" : ""} text-sm cursor-pointer rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2`,
                                        hoverStyles[variant],
                                        focusStyles[variant],
                                        (activeRoute === nav.link || nav.subItems?.some((subItem) => subItem.link === activeRoute))
                                            ? activeRouterBgStyles[variant]
                                            : "",
                                        activeRoute === nav.link
                                            ? variant === "secondary" ||
                                                variant === "primary" ||
                                                variant === "darkMagenta" ||
                                                variant === "veryDarkViolet" ||
                                                variant === "success"
                                                ? "text-custom-red"
                                                : (variant === "pikaros" ? "text-orange-300" : "text-custom-blue")
                                            : variant === "primary" ||
                                                variant === "vividPink" ||
                                                variant === "darkMagenta" ||
                                                variant === "veryDarkViolet" ||
                                                variant === "danger" ||
                                                variant === "warning" ||
                                                variant === "success" ||
                                                variant === "pikaros"
                                                ? "text-white"
                                                : "text-custom-blue",
                                        activeRoute === nav.link ? "font-semibold" : "font-normal"
                                    )}
                                    onClick={() => {
                                        handleNavigation(nav, index);
                                    }}
                                    onMouseEnter={() => setHovered(index)}
                                    onMouseLeave={() => setHovered(null)}
                                >
                                    {nav?.icon && (
                                        <div
                                            className={`flex ${!isOpen ? "py-2" : ""}`}
                                            style={{
                                                marginRight: isOpen ? "12px" : "0px",
                                                marginLeft: isOpen ? "0px" : "6px",
                                            }}
                                        >
                                            <nav.icon className="w-6 h-6" />
                                        </div>
                                    )}
                                    <span className={`${isOpen ? "block" : "hidden"}`}>{nav.label}</span>
                                </button>
                                {(hovered === index && nav.description && nav.description.trim() !== "" && !isOpen) && (
                                    <div
                                        style={{
                                            border: `1px ${border2Styles[variant]} solid`,
                                            width: "240px",
                                        }}
                                        className={clsx(
                                            `absolute top-1/2 transform -translate-y-1/2 transition-all duration-300 opacity-0 group-hover:opacity-100 rounded-md text-xs px-4 py-2 shadow-lg`,
                                            isOpen
                                                ? "left-full ml-2"
                                                : "left-full ml-2 translate-x-2 group-hover:translate-x-4",
                                            textStyles[variant],
                                            variantStyles[variant]
                                        )}
                                    >
                                        {nav.image && nav.image.trim() !== "" && (
                                            <div className="relative w-full h-24 mb-2">
                                                <img
                                                    src={nav.image}
                                                    alt="Tooltip Image"
                                                    className="object-cover w-full h-full rounded-t-md opacity-75 hover:opacity-100 transition-opacity duration-300"
                                                />
                                                <div className="absolute bottom-0 w-full h-8 bg-gradient-to-t from-white/80 to-transparent"></div>
                                            </div>
                                        )}
                                        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -ml-2 w-0 h-0 border-t-4 border-r-4 border-b-4 border-transparent border-t-gray-800"></div>
                                        {nav.description}
                                    </div>
                                )}
                                {nav.subItems &&
                                    nav.subItems.length > 0 &&
                                    openMenu === index &&
                                    (isOpen ? (
                                        <div className="pl-4 py-4">
                                            {nav.subItems.map((subItem, subIndex) => (
                                                <button
                                                    key={subIndex}
                                                    className={clsx(
                                                        `block w-full px-4 py-1 text-sm ${hoverStyles[variant]} 
                                                        rounded-md transition duration-300 focus:outline-none focus:ring-2 ${focusStyles[variant]} focus:ring-offset-2 text-left`,
                                                        activeRoute === subItem.link ? activeRouterBgStyles[variant] : "",
                                                        activeRoute === subItem.link
                                                            ? variant === "secondary" ||
                                                                variant === "primary" ||
                                                                variant === "darkMagenta" ||
                                                                variant === "veryDarkViolet" ||
                                                                variant === "success"
                                                                ? "text-custom-red"
                                                                : (variant === "pikaros" ? "text-orange-300" : "text-custom-blue")
                                                            : variant === "primary" ||
                                                                variant === "vividPink" ||
                                                                variant === "darkMagenta" ||
                                                                variant === "veryDarkViolet" ||
                                                                variant === "danger" ||
                                                                variant === "warning" ||
                                                                variant === "success" ||
                                                                variant === "pikaros"
                                                                ? "text-white"
                                                                : "text-custom-blue",
                                                        activeRoute === subItem.link ? "font-semibold" : "font-normal"
                                                    )}
                                                    onClick={() => {
                                                        handleSubNavigation(subItem, index)
                                                    }}
                                                >
                                                    {subItem.label}
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div
                                            style={{ zIndex: '999' }}
                                            className={`absolute left-0 mt-2 w-48 ${variantStyles[variant]} ${borderStyles[variant]} rounded-md shadow-lg ring-4 ring-black ring-opacity-5`}
                                            role="menu"
                                        >
                                            {nav.subItems.map((subItem, subIndex) => (
                                                <div
                                                    key={subIndex}
                                                    className={clsx(
                                                        `block px-4 py-2 text-sm cursor-pointer ${variantStyles[variant]}e`,
                                                        hoverStyles[variant] && `${hoverStyles[variant]}`,
                                                        activeRoute === subItem.link ? activeRouterBgStyles[variant] : "",
                                                        activeRoute === subItem.link
                                                            ? variant === "secondary" ||
                                                                variant === "primary" ||
                                                                variant === "darkMagenta" ||
                                                                variant === "veryDarkViolet" ||
                                                                variant === "success"
                                                                ? "text-custom-red"
                                                                : (variant === "pikaros" ? "text-orange-300" : "text-custom-blue")
                                                            : variant === "primary" ||
                                                                variant === "vividPink" ||
                                                                variant === "darkMagenta" ||
                                                                variant === "veryDarkViolet" ||
                                                                variant === "danger" ||
                                                                variant === "warning" ||
                                                                variant === "success" ||
                                                                variant === "pikaros"
                                                                ? "text-white"
                                                                : "text-custom-blue",
                                                        activeRoute === subItem.link ? "font-semibold" : "font-normal"
                                                    )}
                                                    onClick={() => {
                                                        handleSubNavigation(subItem, index)
                                                    }}
                                                >
                                                    {subItem.label}
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                            </div>
                        ))}
                    </div>
                    {(user) && (
                        <div className="relative ml-3">
                            <div id="user-menu-button" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleMenuToggle}>
                                <button
                                    type="button"
                                    className={`flex rounded-full bg-gray-800 text-sm transition duration-300 focus:outline-none focus:ring-2 ${focusStyles[variant]} focus:ring-offset-2 mb-4 ml-3 mt-3`}
                                    aria-haspopup="true"
                                >
                                    <div
                                        className="flex items-center justify-center rounded-full bg-gray-300 text-gray-700 font-bold"
                                        style={{ width: '28px', height: '28px' }}
                                    >
                                        {user.image ? (
                                            <img
                                                src={user.image}
                                                alt="User avatar"
                                                className="rounded-full object-cover w-full h-full"
                                                onError={(e) => {
                                                    e.currentTarget.onerror = null;
                                                    e.currentTarget.src = "";
                                                }}
                                            />
                                        ) : (
                                            user.name?.charAt(0)?.toUpperCase() || "?"
                                        )}
                                    </div>
                                </button>
                                <div className={`block w-full px-4 py-4 ${textStyles[variant]} text-left ${isOpen ? "block" : "hidden"}`}>{user.name}</div>
                                <div className={`mr-2 ${isOpen ? "block" : "hidden"}`}>
                                    <CiMenuKebab size={20} color={border2Styles[variant]} />
                                </div>
                            </div>
                            {isMenuOpen && (
                                <div
                                    ref={menuRef}
                                    className={`absolute right-0 ${isOpen ? "left-56" : "left-14"} bottom-8 mt-2 w-48 ${variantStyles[variant]} ${borderStyles[variant]} rounded-md shadow-lg ring-4 ring-black ring-opacity-5`}
                                    role="menu"
                                >
                                    {listMenu.map((item, index) => (
                                        <div
                                            key={index}
                                            className={clsx(
                                                'block px-4 py-2 text-sm cursor-pointer',
                                                hoverStyles[variant] && `${hoverStyles[variant]}`,
                                                activeRoute === item.link ? activeRouterBgStyles[variant] : "",
                                                activeRoute === item.link
                                                    ? (variant === 'secondary' || variant === 'primary' || variant === 'darkMagenta' || variant === 'veryDarkViolet' || variant === 'success'
                                                        ? 'text-custom-red'
                                                        : (variant === "pikaros" ? "text-orange-300" : "text-custom-blue"))
                                                    : ((variant === 'primary' || variant === 'vividPink' || variant === 'darkMagenta' || variant === 'veryDarkViolet' || variant === 'danger' || variant === 'warning' || variant === 'success' || variant === "pikaros") ? 'text-white' : 'text-custom-blue'),
                                                activeRoute === item.link ? 'font-semibold' : 'font-normal'
                                            )}
                                            onClick={item.label === 'Cerrar sesion' ? handleLogout : () => { handleListMenuNavigation(item) }}
                                        >
                                            {item.label}
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div style={{ display: 'flex', gap: '12px', padding: "0px 20px 0px 10px", flexDirection: isOpen ? "row" : 'column', alignItems: 'center' }}>
                                {InstallApp && <InstallAppButton variant={variant} onClick={toggeInstallApp} />}
                                {theme && <ThemeSwitch variant={variant} toggleTheme={toggleTheme} />}
                            </div>
                        </div>
                    )}
                </div>
                {indicator &&
                    <LoadingIndicator
                        variant={variantIndicator}
                        background={backgroundIndicator}
                        logoGoatData={logoGoatDataIndicator}
                        imgLoading={imgLoadingIndicator}
                        strokeWidth={strokeWidthIndicator}
                    />}
            </div>
        );
    }
);

Sidebar.displayName = "Sidebar";