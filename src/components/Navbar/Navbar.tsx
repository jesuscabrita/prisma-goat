import { forwardRef, PropsWithChildren, useEffect, useRef, useState } from "react";
import logoBlack from '../../assets/images/logo-black.png';
import { HTMLAttributes } from "react";
import clsx from "clsx";


type NavbarProps = HTMLAttributes<HTMLElement> & {
    variant?: "primary" | "secondary" | "vividPink" | "darkMagenta" | "veryDarkViolet" | "danger" | "warning" | "success";
    user?: { name: string; image?: string };
    list?: Array<{ label: string, description: string, link: string, subItems: { label: string }[] }>;
    listMenu?: Array<{ label: string }>;
    logo?: string;
    heightLogo?: string;
    widthLogo?: string;
    activeRoute?: string;
};

export const Navbar = forwardRef<HTMLElement, PropsWithChildren<NavbarProps>>(
    ({ children, variant = "primary", user, list = [], listMenu = [], logo, heightLogo, widthLogo, activeRoute, ...props }, ref) => {
        const [isOpen, setIsOpen] = useState(false);
        const [isMenuOpen, setIsMenuOpen] = useState(false);
        const [openMenu, setOpenMenu] = useState<number | null>(null);
        const menuRef = useRef<HTMLDivElement>(null);


        const toggle = () => setIsOpen(!isOpen);
        const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);
        const handleMenuClose = () => setIsMenuOpen(false);

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

        const variantStyles = {
            primary: "bg-[#1F2937]",
            secondary: "bg-[#ededed]",
            vividPink: "bg-[#ff0145]",
            darkMagenta: "bg-[#770069]",
            veryDarkViolet: "bg-[#350053]",
            danger: "bg-[#b91c1c]",
            warning: "bg-[#f59e0b]",
            success: "bg-[#047857]",
        };

        const focusStyles = {
            primary: "focus:ring-white focus:ring-offset-[#1F2937]",
            secondary: "focus:ring-[#1F2937]",
            vividPink: "focus:ring-white focus:ring-offset-[#ff0145]",
            darkMagenta: "focus:ring-white focus:ring-offset-[#770069]",
            veryDarkViolet: "focus:ring-white focus:ring-offset-[#350053]",
            danger: "focus:ring-white focus:ring-offset-[#b91c1c]",
            warning: "focus:ring-white focus:ring-offset-[#f59e0b]",
            success: "focus:ring-white focus:ring-offset-[#047857]",
        };

        const borderStyles = {
            primary: "border-2 border-white",
            secondary: "border-2 border-[#1F2937]",
            vividPink: "border-2 border-white",
            darkMagenta: "border-2 border-white",
            veryDarkViolet: "border-2 border-white",
            danger: "border-2 border-white",
            warning: "border-2 border-white",
            success: "border-2 border-white",
        };

        const border2Styles = {
            primary: "white",
            secondary: "#1F2937",
            vividPink: "white",
            darkMagenta: "white",
            veryDarkViolet: "white",
            danger: "white",
            warning: "white",
            success: "white",
        };

        const textStyles = {
            primary: "text-white",
            secondary: "text-[#1F2937]",
            vividPink: "text-white",
            darkMagenta: "text-white",
            veryDarkViolet: "text-white",
            danger: "text-white",
            warning: "text-white",
            success: "text-white",
        };

        const hoverStyles = {
            primary: "hover:bg-[#4B5563] font-light",
            secondary: "hover:bg-[#F3F4F6] font-medium",
            vividPink: "hover:bg-[#FF5C6B] font-light",
            darkMagenta: "hover:bg-[#9B007D] font-light",
            veryDarkViolet: "hover:bg-[#6A006E] font-light",
            danger: "hover:bg-[#F87171] font-light",
            warning: "hover:bg-[#FBBF24] font-light",
            success: "hover:bg-[#2D6A4F] font-light",
        };

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
                                                className={`flex items-center justify-center px-4 py-2 text-sm cursor-pointer 
                                                    ${activeRoute === nav.link ?  ((variant === 'vividPink' || variant === 'danger') ? 'text-indigo-950 font-medium' :'text-[#ff0145] font-medium' ) : ''}
                                                    ${textStyles[variant]} ${hoverStyles[variant]} 
                                                    rounded-md transition duration-300 focus:outline-none focus:ring-2 ${focusStyles[variant]} focus:ring-offset-2`}
                                                onClick={() => {
                                                    if (nav.subItems && nav.subItems.length > 0) {
                                                        setOpenMenu(prev => prev === index ? -1 : index);
                                                    }
                                                }}
                                            >
                                                {nav.label}
                                            </button>
                                            {nav.description && nav.description.trim() !== "" && (
                                                <div
                                                    style={{ border: `1px ${border2Styles[variant]} solid` }}
                                                    className={`absolute top-full left-1/2 transform -translate-x-1/2 translate-y-2 opacity-0 mt-2 w-max px-4 py-4 text-xs ${textStyles[variant]} ${variantStyles[variant]} rounded-md transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-4`}
                                                >
                                                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -mt-3 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-800"></div>
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
                                                                textStyles[variant],
                                                                hoverStyles[variant] && `${hoverStyles[variant]}`
                                                            )}
                                                            onClick={() => setOpenMenu(prev => prev === index ? -1 : index)}
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
                                                        textStyles[variant],
                                                        hoverStyles[variant] && `${hoverStyles[variant]}`
                                                    )}
                                                    onClick={() => {
                                                        handleMenuClose();
                                                    }}
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
                                    className={`block w-full px-4 py-2 text-base ${textStyles[variant]} ${hoverStyles[variant]}
                                        rounded-md transition duration-300 focus:outline-none focus:ring-2 ${focusStyles[variant]} focus:ring-offset-2 text-left`}
                                    onClick={() => {
                                        if (item.subItems) {
                                            if (item.subItems && item.subItems.length > 0) {
                                                setOpenMenu(prev => prev === index ? -1 : index);
                                            }
                                        } else {
                                            setIsOpen(false);
                                        }
                                    }}
                                >
                                    {item.label}
                                </button>
                                {item.subItems && item.subItems.length > 0 && openMenu === index && (
                                    <div className="pl-4 py-4">
                                        {item.subItems.map((subItem, subIndex) => (
                                            <button
                                                key={subIndex}
                                                className={`block w-full px-4 py-1 text-sm ${textStyles[variant]} ${hoverStyles[variant]} 
                                                    rounded-md transition duration-300 focus:outline-none focus:ring-2 ${focusStyles[variant]} focus:ring-offset-2 text-left`}
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
                                        className={`block w-full px-4 py-2 text-base ${textStyles[variant]} ${hoverStyles[variant]} 
                                                    rounded-md transition duration-300 focus:outline-none focus:ring-2 ${focusStyles[variant]} focus:ring-offset-2 text-left`}
                                        onClick={() => setIsOpen(false)}
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