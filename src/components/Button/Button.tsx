import { forwardRef, PropsWithChildren, ButtonHTMLAttributes, ComponentType, useEffect } from "react";
import { TbArrowBigRightLinesFilled } from "react-icons/tb";
import { TbArrowBigLeftLinesFilled } from "react-icons/tb";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa6";
import { AiFillCalculator } from "react-icons/ai";
import { MdOutlineUpdate } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { MdEditSquare } from "react-icons/md";
import { MdLockReset } from "react-icons/md";
import { MdMoreTime } from "react-icons/md";
import { IoMdAttach } from "react-icons/io";
import { FaPowerOff } from "react-icons/fa";
import { FaFutbol } from "react-icons/fa";
import { IoExit } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";
import { GrSend } from "react-icons/gr";
import { FaSave } from "react-icons/fa";
import React from "react";
import clsx from "clsx";

type ButtonProps = {
    variant?: "primary" | "secondary" | "vividPink" | "darkMagenta" | "veryDarkViolet" | "danger" | "warning" | "success";
    size?: "small" | "medium" | "large";
    isLoading?: boolean;
    loadingPosition?: "left" | "right";
    disabled?: boolean;
    isSubmit?: boolean;
    icon?: ComponentType<{ className?: string }> | React.ReactNode;
    iconPosition?: "left" | "right";
    iconType?: "home" | "Left" | "save" | "more" | "right" | "update" | "attach" | "send" | "delete" | "edit" | "login" | "reset" | "add" | "exit" | "off" | "calculator" | "list" | "futbol";
    label?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, PropsWithChildren<ButtonProps>>(
    (
        {
            children,
            variant = "primary",
            size = "medium",
            isLoading = false,
            loadingPosition = "left",
            disabled = false,
            isSubmit = false,
            icon: Icon,
            iconPosition = "left",
            iconType,
            label,
            className,
            onClick,
            ...props
        },
        ref
    ) => {
        const baseStyles = clsx(
            "inline-flex items-center justify-center rounded-lg font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 w-full",
            {
                "text-white": variant !== "secondary",
                "text-[#1F2937]": variant === "secondary",
            }
        );

        const variantStyles = {
            primary: "bg-[#1F2937] hover:bg-[#374151] focus:ring-[#1F2937] focus:border-[#1F2937]",
            secondary: "bg-transparent border-2 border-[#1F2937] hover:border-[#374151] focus:ring-[#1F2937] focus:border-[#1F2937]",
            vividPink: "bg-[#ff0145] hover:bg-[#e6003f] focus:ring-[#ff0145] focus:border-[#ff0145]",
            darkMagenta: "bg-[#770069] hover:bg-[#66005c] focus:ring-[#770069] focus:border-[#770069]",
            veryDarkViolet: "bg-[#350053] hover:bg-[#2c003f] focus:ring-[#350053] focus:border-[#350053]",
            danger: "bg-[#b91c1c] hover:bg-[#9b1c1c] focus:ring-[#b91c1c] focus:border-[#b91c1c]",
            warning: "bg-[#f59e0b] hover:bg-[#d97706] focus:ring-[#f59e0b] focus:border-[#f59e0b]",
            success: "bg-[#047857] hover:bg-[#065f46] focus:ring-[#047857] focus:border-[#047857]",
        };
        const sizeStyles = {
            small: "px-4 py-1.5 text-xs",
            medium: "px-6 py-2.5 text-base",
            large: "px-8 py-3 text-lg",
        };

        const defaultIcon = () => {
            if (iconType === "home") return <AiOutlineHome className="w-5 h-5" />;
            if (iconType === "Left") return <TbArrowBigLeftLinesFilled className="w-5 h-5" />;
            if (iconType === "right") return <TbArrowBigRightLinesFilled className="w-5 h-5" />;
            if (iconType === "save") return <FaSave className="w-5 h-5" />;
            if (iconType === "more") return <MdMoreTime className="w-5 h-5" />;
            if (iconType === "update") return <MdOutlineUpdate className="w-5 h-5" />;
            if (iconType === "attach") return <IoMdAttach className="w-5 h-5" />;
            if (iconType === "send") return <GrSend className="w-5 h-5" />;
            if (iconType === "delete") return <MdDeleteForever className="w-5 h-5" />;
            if (iconType === "edit") return <MdEditSquare className="w-5 h-5" />;
            if (iconType === "login") return <CiLogin className="w-5 h-5" />;
            if (iconType === "reset") return <MdLockReset className="w-5 h-5" />;
            if (iconType === "add") return <MdFormatListBulletedAdd className="w-5 h-5" />;
            if (iconType === "exit") return <IoExit className="w-5 h-5" />;
            if (iconType === "off") return <FaPowerOff className="w-5 h-5" />;
            if (iconType === "calculator") return <AiFillCalculator className="w-5 h-5" />;
            if (iconType === "list") return <FaClipboardList className="w-5 h-5" />;
            if (iconType === "futbol") return <FaFutbol className="w-5 h-5" />;
            return null;
        };

        const LoadingIndicator = (
            <div
                className={clsx(
                    "w-5 h-5 animate-spin border-2 border-t-transparent rounded-full",
                    variant === "secondary" ? "border-[#1F2937]" : "border-white"
                )}
            ></div>
        )

        const renderIcon = () => {
            if (React.isValidElement(Icon)) {
                return React.cloneElement(Icon as React.ReactElement, { className: "w-5 h-5" });
            }
            return defaultIcon();
        };

        const buttonText = label || children;

        useEffect(() => {
            const handleKeyDown = (event: KeyboardEvent) => {
                if (isSubmit && event.key === 'Enter' && !disabled && onClick) {
                    const mockMouseEvent = new MouseEvent('click', {
                        bubbles: true,
                        cancelable: true,
                        view: window,
                    });
                    onClick(mockMouseEvent as unknown as React.MouseEvent<HTMLButtonElement>);
                }
            };
            window.addEventListener('keydown', handleKeyDown);
            return () => {
                window.removeEventListener('keydown', handleKeyDown);
            };
        }, [isSubmit, onClick, disabled]);

        return (
            <button
                ref={ref}
                className={clsx(
                    baseStyles,
                    variantStyles[variant],
                    sizeStyles[size],
                    {
                        "opacity-60 cursor-not-allowed": isLoading,
                        "opacity-20 cursor-not-allowed": disabled && !isLoading,
                    },
                    className
                )}
                disabled={isLoading || disabled}
                onClick={onClick}
                {...props}
            >
                {isLoading && loadingPosition === "left" && (
                    <span className="mr-2">{LoadingIndicator}</span>
                )}
                {iconPosition === "left" && (
                    <span className="mr-2">{renderIcon()}</span>
                )}
                {buttonText}
                {iconPosition === "right" && (
                    <span className="ml-2">{renderIcon()}</span>
                )}
                {isLoading && loadingPosition === "right" && (
                    <span className="ml-2">{LoadingIndicator}</span>
                )}
            </button>
        );
    }
);

Button.displayName = "Button";