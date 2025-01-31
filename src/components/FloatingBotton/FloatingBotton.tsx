import { ButtonHTMLAttributes, forwardRef, PropsWithChildren } from "react";
import { FaHeadset, FaWhatsapp } from "react-icons/fa6";
import { FaCommentAlt } from "react-icons/fa";
import clsx from "clsx";

export type FloatingBottonProps = {
    variant?: "whatsapp" | "chat" | "soporte";
    disabled?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const FloatingBotton = forwardRef<HTMLButtonElement, PropsWithChildren<FloatingBottonProps>>(
    ({ variant = "whatsapp", disabled = false, className, onClick, ...props }, ref) => {

        const baseStyles = clsx(
            "inline-flex items-center justify-center font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-105 transition-all duration-300 ease-in-out",
            "w-auto max-w-[250px] px-4 py-3 rounded-full",
            {
                "opacity-20 cursor-not-allowed": disabled,
            },
            className
        );

        const variantStyles = {
            whatsapp: "hover:bg-[#128c7e] focus:ring-[#128c7e]",
            chat: "border-2 border-[#1F2937] hover:border-[#374151] focus:ring-[#1F2937]",
            soporte: "hover:bg-[#e6003f] focus:ring-[#ff0145]",
        };

        const bgStyles = {
            whatsapp: "#01ff5e",
            chat: "#1F2937",
            soporte: "#ff0145",
        };

        const iconStyles = {
            whatsapp: <FaWhatsapp size={40} className="text-white" />,
            chat: <FaCommentAlt size={25} className="text-white" />,
            soporte: <FaHeadset size={30} className="text-white" />,
        };

        return (
            <button
                style={{ whiteSpace: "nowrap", position: "fixed", bottom: 16, right: 16, zIndex: 9999, height: 60, width: 60, background: bgStyles[variant] }}
                ref={ref}
                className={clsx(baseStyles, variantStyles[variant])}
                disabled={disabled}
                onClick={onClick}
                {...props}
            >
                <span>{iconStyles[variant]}</span>
            </button>
        );
    }
);

FloatingBotton.displayName = "FloatingBotton";