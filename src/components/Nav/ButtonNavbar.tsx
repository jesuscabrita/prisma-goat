import { ReactNode, useEffect, useRef, useState } from "react";

export const ButtonNavbar = ({ children, href, Viewport, colorButton, setIsOpen }: { children: ReactNode, href: string, Viewport: string; colorButton: string; setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [currentColor, setCurrentColor] = useState<string>(colorButton);

    useEffect(() => {
        const handleScroll = () => {
            const targetElement = document.getElementById(href.slice(1));
            if (targetElement) {
                const rect = targetElement.getBoundingClientRect();
                const isInViewport = rect.top >= 0 && rect.bottom <= window.innerHeight;
                setCurrentColor(isInViewport ? Viewport : colorButton);
            }
        };
        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [href, Viewport, colorButton]);

    const handleClick = () => {
        const targetElement = document.getElementById(href.slice(1));
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
            setTimeout(() => {
                const rect = targetElement.getBoundingClientRect();
                const isInViewport = rect.top >= 0 && rect.bottom <= window.innerHeight;
                setCurrentColor(isInViewport ? Viewport : colorButton);
                setIsOpen(false);
            }, 300);
        }
    };

    return (
        <button
            onClick={handleClick}
            ref={buttonRef}
            style={{
                display: "block",
                padding: "8px 12px",
                borderRadius: "6px",
                fontSize: '14px',
                color: currentColor,
                background: "transparent",
                opacity: 0.7,
                textDecoration: "none",
                cursor: "pointer",
                letterSpacing: "3px",
                fontWeight: '800'
            }}
            aria-current="page"
            title={`Enlace a ${href}`}
            rel="noopener noreferrer"
        >
            {children}
        </button>
    );
};