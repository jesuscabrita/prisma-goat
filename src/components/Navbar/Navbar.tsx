import { border2Styles, borderStyles, focusStyles, hoverStyles, textStyles, variantStyles } from "./utils";
import { forwardRef, PropsWithChildren, useEffect, useRef, useState } from "react";
import logoBlack from '../../assets/images/logo-black.png';
import { HTMLAttributes } from "react";
import clsx from "clsx";
import { ThemeSwitch } from "./Icons";

export type NavbarProps = HTMLAttributes<HTMLElement> & {
    variant?: "primary" | "secondary" | "vividPink" | "darkMagenta" | "veryDarkViolet" | "danger" | "warning" | "success";
    user?: { name: string; image?: string };
    list?: Array<{ label: string, description: string, link: string, image: string, subItems: { label: string, link: string }[] }>;
    listMenu?: Array<{ label: string, link: string }>;
    router: { push: (path: string) => void };
    logo?: string;
    heightLogo?: string;
    widthLogo?: string;
    activeRoute?: string;
    toggleTheme?: () => void;
    theme?:boolean;
};

export const Navbar = forwardRef<HTMLElement, PropsWithChildren<NavbarProps>>(
    ({ children, variant = "primary", user, list = [], listMenu = [], logo, heightLogo, widthLogo, activeRoute, router, toggleTheme,theme, ...props }, ref) => {
        const [isOpen, setIsOpen] = useState(false);
        const [isMenuOpen, setIsMenuOpen] = useState(false);
        const [openMenu, setOpenMenu] = useState<number | null>(null);
        const menuRef = useRef<HTMLDivElement>(null);
        const toggle = () => setIsOpen(!isOpen);
        const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);
        const handleMenuClose = () => setIsMenuOpen(false);

        const handleNavigation = (nav: { label: string; description: string; link: string; subItems: { label: string }[] }, index: number) => {
            if (nav.subItems && nav.subItems.length > 0) {
                setOpenMenu(prev => prev === index ? -1 : index);
            } else if (nav.link && router) {
                router.push(nav.link);
            }
        };

        const handleNavigationMobile = (item: { label: string; description: string; link: string; subItems: { label: string }[] }, index: number) => {
            if (item.subItems && item.subItems.length > 0) {
                setOpenMenu(prev => prev === index ? -1 : index);
            } else if (item.link && router) {
                router.push(item.link);
                setIsOpen(false);
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

        const handleListMenuNavigationMobile = (item: { label: string; link: string; }) => {
            if (item.link && router) {
                router.push(item.link);
                setIsOpen(false);
            }
        };

        useEffect(() => {
            const handleOutsideClick = (event: MouseEvent) => {
                if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                    handleMenuClose();
                }
            };
            if (isMenuOpen) {
                document.addEventListener("mousedown", handleOutsideClick);
            }
            return () => {
                document.removeEventListener("mousedown", handleOutsideClick);
            };
        }, [isMenuOpen]);

        return (
            <nav ref={ref} {...props} className={`fixed top-0 left-0 right-0 z-10 ${variantStyles[variant]}`}>
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            <button className={`menu ${isOpen ? (variant === 'secondary' ? 'openedark' : 'opened') : ''}`} onClick={toggle} aria-label="Main Menu">
                                <svg width="45" height="45" viewBox="0 0 100 100" style={{ fill: "#f9f8f8 !important" }}>
                                    <path className={variant === 'secondary' ? 'linedark linedark1' : "line line1"} d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
                                    <path className={variant === 'secondary' ? 'linedark linedark2' : "line line2"} d="M 20,50 H 80" />
                                    <path className={variant === 'secondary' ? 'linedark linedark3' : "line line3"} d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:items-start sm:justify-start">
                            <div className="flex flex-shrink-0 items-center" style={{ flexDirection: 'column' }}>
                                <img
                                    alt="logo"
                                    className="block w-auto lg:hidden"
                                    style={{ height: heightLogo && heightLogo.trim() !== '' ? heightLogo : '40px', width: widthLogo && widthLogo.trim() !== '' ? widthLogo : '65px' }}
                                    src={logo && logo.trim() !== '' ? logo : (variant === 'secondary' ? logoBlack : 'https://goatdata.com.ar/images/logogoatblanco.png')}
                                />
                                <img
                                    alt="logo"
                                    className="hidden lg:block"
                                    style={{ height: heightLogo && heightLogo.trim() !== '' ? heightLogo : '40px', width: widthLogo && widthLogo.trim() !== '' ? widthLogo : '65px' }}
                                    src={logo && logo.trim() !== '' ? logo : (variant === 'secondary' ? logoBlack : 'https://goatdata.com.ar/images/logogoatblanco.png')}
                                />
                                {(!logo || logo.trim() === '') && (
                                    <div className={`${textStyles[variant]}`} style={{ fontSize: '10px', letterSpacing: '4px' }}>
                                        DATA
                                    </div>
                                )}
                            </div>
                            <div className="hidden sm:ml-6 sm:block">
                                <div className={`flex space-x-4 ${logo && logo.trim() !== '' ? 'mt-0' : 'mt-2'}`}>
                                    {list.map((nav, index) => (
                                        <div key={index} className="relative group">
                                            <button
                                                type="button"
                                                className={clsx(
                                                    'flex items-center justify-center px-4 py-2 text-sm cursor-pointer rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2',
                                                    hoverStyles[variant],
                                                    focusStyles[variant],
                                                    activeRoute === nav.link
                                                        ? (variant === 'secondary' || variant === 'primary' || variant === 'darkMagenta' || variant === 'veryDarkViolet' || variant === 'success'
                                                            ? 'text-custom-red'
                                                            : 'text-custom-blue')
                                                        : ((variant === 'primary' || variant === 'vividPink' || variant === 'darkMagenta' || variant === 'veryDarkViolet' || variant === 'danger' || variant === 'warning' || variant === 'success') ? 'text-white' : 'text-custom-blue'),
                                                    activeRoute === nav.link ? 'font-semibold' : 'font-normal'
                                                )}
                                                onClick={() => handleNavigation(nav, index)}
                                            >
                                                {nav.label}
                                            </button>
                                            {nav.description && nav.description.trim() !== "" && (
                                                <div
                                                    style={{ border: `1px ${border2Styles[variant]} solid` }}
                                                    className={`absolute top-full left-1/2 transform -translate-x-1/2 translate-y-2 opacity-0 mt-2 w-max px-4 py-4 text-xs ${textStyles[variant]} ${variantStyles[variant]} rounded-md transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-4`}
                                                >
                                                    {nav.image && nav.image.trim() !== "" &&
                                                        <div className="relative w-full h-24 mb-2">
                                                            <img
                                                                src={nav.image}
                                                                alt="Tooltip Image"
                                                                className="object-cover w-full h-full rounded-t-md opacity-75 hover:opacity-100 transition-opacity duration-300"
                                                            />
                                                            <div className="absolute bottom-0 w-full h-8 bg-gradient-to-t from-white/80 to-transparent"></div>
                                                        </div>}
                                                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -mt-2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-800"></div>
                                                    {nav.description}
                                                </div>
                                            )}
                                            {nav.subItems && nav.subItems.length > 0 && openMenu === index && (
                                                <div
                                                    className={`absolute left-0 mt-2 w-48 ${variantStyles[variant]} ${borderStyles[variant]} rounded-md shadow-lg ring-4 ring-black ring-opacity-5`}
                                                    role="menu"
                                                >
                                                    {nav.subItems.map((subItem, subIndex) => (
                                                        <div
                                                            key={subIndex}
                                                            className={clsx(
                                                                `block px-4 py-2 text-sm cursor-pointer ${variantStyles[variant]}e`,
                                                                hoverStyles[variant] && `${hoverStyles[variant]}`,
                                                                activeRoute === subItem.link
                                                                    ? (variant === 'secondary' || variant === 'primary' || variant === 'darkMagenta' || variant === 'veryDarkViolet' || variant === 'success'
                                                                        ? 'text-custom-red'
                                                                        : 'text-custom-blue')
                                                                    : ((variant === 'primary' || variant === 'vividPink' || variant === 'darkMagenta' || variant === 'veryDarkViolet' || variant === 'danger' || variant === 'warning' || variant === 'success') ? 'text-white' : 'text-custom-blue'),
                                                                activeRoute === subItem.link ? 'font-semibold' : 'font-normal'
                                                            )}
                                                            onClick={() => handleSubNavigation(subItem, index)}
                                                        >
                                                            {subItem.label}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                {children && (
                                    <div className="mt-2 text-sm text-gray-500">
                                        {children}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 hidden sm:flex">
                        {theme && <ThemeSwitch variant={variant} toggleTheme={toggleTheme} />}
                            {user ? (
                                <div className="relative ml-3">
                                    <div>
                                        <button
                                            type="button"
                                            className={`flex rounded-full bg-gray-800 text-sm transition duration-300 focus:outline-none focus:ring-2 ${focusStyles[variant]} focus:ring-offset-2`}
                                            id="user-menu-button"
                                            aria-expanded={isMenuOpen}
                                            aria-haspopup="true"
                                            onClick={handleMenuToggle}
                                        >
                                            <div
                                                className="flex items-center justify-center rounded-full bg-gray-300 text-gray-700 font-bold"
                                                style={{ width: `35px`, height: `35px` }}
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
                                    </div>
                                    {isMenuOpen && (
                                        <div
                                            ref={menuRef}
                                            className={`absolute right-0 mt-2 w-48 ${variantStyles[variant]} ${borderStyles[variant]} rounded-md shadow-lg ring-4 ring-black ring-opacity-5`}
                                            role="menu"
                                        >
                                            {listMenu.map((item, index) => (
                                                <div
                                                    key={index}
                                                    className={clsx(
                                                        'block px-4 py-2 text-sm cursor-pointer',
                                                        hoverStyles[variant] && `${hoverStyles[variant]}`,
                                                        activeRoute === item.link
                                                            ? (variant === 'secondary' || variant === 'primary' || variant === 'darkMagenta' || variant === 'veryDarkViolet' || variant === 'success'
                                                                ? 'text-custom-red'
                                                                : 'text-custom-blue')
                                                            : ((variant === 'primary' || variant === 'vividPink' || variant === 'darkMagenta' || variant === 'veryDarkViolet' || variant === 'danger' || variant === 'warning' || variant === 'success') ? 'text-white' : 'text-custom-blue'),
                                                        activeRoute === item.link ? 'font-semibold' : 'font-normal'
                                                    )}
                                                    onClick={() => { handleListMenuNavigation(item) }}
                                                >
                                                    {item.label}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    className={`flex items-center justify-center px-4 py-2 text-sm cursor-pointer 
                                            ${textStyles[variant]} ${hoverStyles[variant]} 
                                            rounded-md transition duration-300 focus:outline-none focus:ring-2 ${focusStyles[variant]} focus:ring-offset-2`}
                                    onClick={() => { }}
                                >
                                    Login
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                {isOpen && (
                    <div className="sm:hidden px-2 pt-2 pb-3 space-y-1">
                        {list.map((item, index) => (
                            <div key={index}>
                                <button
                                    className={clsx(
                                        `block w-full px-4 py-2 text-base ${hoverStyles[variant]}
                                        rounded-md transition duration-300 focus:outline-none focus:ring-2 ${focusStyles[variant]} focus:ring-offset-2 text-left`,
                                        activeRoute === item.link
                                            ? (variant === 'secondary' || variant === 'primary' || variant === 'darkMagenta' || variant === 'veryDarkViolet' || variant === 'success'
                                                ? 'text-custom-red'
                                                : 'text-custom-blue')
                                            : ((variant === 'primary' || variant === 'vividPink' || variant === 'darkMagenta' || variant === 'veryDarkViolet' || variant === 'danger' || variant === 'warning' || variant === 'success') ? 'text-white' : 'text-custom-blue'),
                                        activeRoute === item.link ? 'font-semibold' : 'font-normal'
                                    )}
                                    onClick={() => { handleNavigationMobile(item, index) }}
                                >
                                    {item.label}
                                </button>
                                {item.subItems && item.subItems.length > 0 && openMenu === index && (
                                    <div className="pl-4 py-4">
                                        {item.subItems.map((subItem, subIndex) => (
                                            <button
                                                key={subIndex}
                                                className={clsx(`block w-full px-4 py-1 text-sm ${hoverStyles[variant]} 
                                                    rounded-md transition duration-300 focus:outline-none focus:ring-2 ${focusStyles[variant]} focus:ring-offset-2 text-left`,
                                                    activeRoute === subItem.link
                                                        ? (variant === 'secondary' || variant === 'primary' || variant === 'darkMagenta' || variant === 'veryDarkViolet' || variant === 'success'
                                                            ? 'text-custom-red'
                                                            : 'text-custom-blue')
                                                        : ((variant === 'primary' || variant === 'vividPink' || variant === 'darkMagenta' || variant === 'veryDarkViolet' || variant === 'danger' || variant === 'warning' || variant === 'success') ? 'text-white' : 'text-custom-blue'),
                                                    activeRoute === subItem.link ? 'font-semibold' : 'font-normal'
                                                )}
                                                onClick={() => {
                                                    setIsOpen(false);
                                                }}
                                            >
                                                {subItem.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        {user ? (
                            <div className="relative mt-3">
                                <div className={`ml-3 mt-4`} style={{ borderBottom: `1px ${border2Styles[variant]} solid` }} />
                                <div style={{ display: 'flex' }}>
                                    <button
                                        type="button"
                                        className={`flex rounded-full bg-gray-800 text-sm transition duration-300 focus:outline-none focus:ring-2 ${focusStyles[variant]} focus:ring-offset-2 mb-4 ml-3 mt-3`}
                                        id="user-menu-button"
                                        aria-haspopup="true"
                                        onClick={handleMenuToggle}
                                    >
                                        <div
                                            className="flex items-center justify-center rounded-full bg-gray-300 text-gray-700 font-bold"
                                            style={{ width: '35px', height: '35px' }}
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
                                    <div className={`block w-full px-4 py-4 ${textStyles[variant]} text-left`}>{user.name}</div>
                                </div>
                                {listMenu.map((item, index) => (
                                    <button
                                        key={index}
                                        className={clsx(`block w-full px-4 py-2 text-base ${hoverStyles[variant]} 
                                                    rounded-md transition duration-300 focus:outline-none focus:ring-2 ${focusStyles[variant]} focus:ring-offset-2 text-left`,
                                            activeRoute === item.link
                                                ? (variant === 'secondary' || variant === 'primary' || variant === 'darkMagenta' || variant === 'veryDarkViolet' || variant === 'success'
                                                    ? 'text-custom-red'
                                                    : 'text-custom-blue')
                                                : ((variant === 'primary' || variant === 'vividPink' || variant === 'darkMagenta' || variant === 'veryDarkViolet' || variant === 'danger' || variant === 'warning' || variant === 'success') ? 'text-white' : 'text-custom-blue'),
                                            activeRoute === item.link ? 'font-semibold' : 'font-normal'
                                        )}
                                        onClick={() => handleListMenuNavigationMobile(item)}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <button
                                type="button"
                                className={`block w-full px-4 py-2 text-base ${textStyles[variant]} ${hoverStyles[variant]} 
                                    rounded-md transition duration-300 focus:outline-none focus:ring-2 ${focusStyles[variant]} focus:ring-offset-2 text-left`}
                                onClick={() => setIsOpen(false)}
                            >
                                Login
                            </button>
                        )}
                    </div>
                )}
            </nav>
        );
    }
);

Navbar.displayName = "Navbar";