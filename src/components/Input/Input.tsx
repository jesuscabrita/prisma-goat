import React, { ComponentType, forwardRef, InputHTMLAttributes, useState } from "react";
import { MdErrorOutline, MdFormatListBulletedAdd } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { TbArrowBigRightLinesFilled } from "react-icons/tb";
import { TbArrowBigLeftLinesFilled } from "react-icons/tb";
import { FaClipboardList } from "react-icons/fa6";
import { AiFillCalculator } from "react-icons/ai";
import { MdOutlineUpdate } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { MdEditSquare } from "react-icons/md";
import { MdLockReset } from "react-icons/md";
import { IoMdAttach } from "react-icons/io";
import { FaPowerOff } from "react-icons/fa";
import { MdMoreTime } from "react-icons/md";
import { TooltipInfo } from "./TooltipInfo";
import { FaFutbol } from "react-icons/fa";
import { IoExit } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";
import { GrSend } from "react-icons/gr";
import { FaSave } from "react-icons/fa";
import clsx from "clsx";

export type InputProps = {
    variant?: "primary" | "secondary" | "vividPink" | "darkMagenta" | "veryDarkViolet" | "danger" | "warning" | "success" | "tertiary";
    size?: "small" | "medium" | "large";
    disabled?: boolean;
    hasIcon?: "home" | "Left" | "save" | "more" | "right" | "update" | "attach" | "send" | "delete" | "edit" | "login" | "reset" | "add" | "exit" | "off" | "calculator" | "list" | "futbol";
    icon?: ComponentType<{ className?: string }> | React.ReactNode;
    placeholder?: string;
    title?: string;
    info?: boolean;
    infoText?: string;
    positionIcon?: "left" | "right";
    type?: "text" | "password" | "email" | "number";
    error?: boolean;
    errorMessage?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            variant = "primary",
            size = "medium",
            disabled = false,
            hasIcon = false,
            icon: Icon,
            placeholder = "Enter text",
            title,
            info = false,
            infoText,
            positionIcon = "left",
            type = "text",
            error = false,
            errorMessage = "",
            className,
            ...props
        },
        ref
    ) => {
        const [inputType, setInputType] = useState(type);

        const togglePasswordVisibility = () => {
            setInputType((prevType) =>
                prevType === "password" ? "text" : "password"
            );
        };

        const baseStyles = clsx(
            "rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 w-full",
            {
                "text-gray-900": variant !== "secondary",
                "text-[#1F2937]": variant === "secondary",
                "bg-gray-200": disabled,
                "border border-[#b91c1c] focus:ring-[#b91c1c]": error,
            }
        );

        const variantStyles = {
            primary: "border border-[#1F2937] focus:ring-[#1F2937]",
            secondary: "border border-[#d4d3d3] bg-transparent focus:ring-[#1F2937]",
            vividPink: "border border-[#ff0145] focus:ring-[#ff0145]",
            darkMagenta: "border border-[#770069] focus:ring-[#770069]",
            veryDarkViolet: "border border-[#350053] focus:ring-[#350053]",
            danger: "border border-[#b91c1c] focus:ring-[#b91c1c]",
            warning: "border border-[#f59e0b] focus:ring-[#f59e0b]",
            success: "border border-[#047857] focus:ring-[#047857]",
            tertiary: "border border-[#d4d3d3] bg-[#f8f9fa] focus:ring-[#1F2937]",
        };

        const colorIconsStyles = {
            primary: "#1F2937",
            secondary: "#73787f",
            vividPink: "#ff0145",
            darkMagenta: "#770069",
            veryDarkViolet: "#350053",
            danger: "#b91c1c",
            warning: "#f59e0b",
            success: "#047857",
            tertiary: "#73787f",
        };

        const sizeStyles = {
            small: "px-4 py-1.5 text-xs",
            medium: "px-6 py-2.5 text-base",
            large: "px-8 py-3 text-lg",
        };

        const defaultIcon = () => {
            if (hasIcon === "home") return <AiOutlineHome size={size === "small" ? 15 : 20} color={colorIconsStyles[variant]} />;
            if (hasIcon === "Left") return <TbArrowBigLeftLinesFilled size={size === "small" ? 15 : 20} color={colorIconsStyles[variant]} />;
            if (hasIcon === "right") return <TbArrowBigRightLinesFilled size={size === "small" ? 15 : 20} color={colorIconsStyles[variant]} />;
            if (hasIcon === "save") return <FaSave size={size === "small" ? 15 : 20} color={colorIconsStyles[variant]} />;
            if (hasIcon === "more") return <MdMoreTime size={size === "small" ? 15 : 20} color={colorIconsStyles[variant]} />;
            if (hasIcon === "update") return <MdOutlineUpdate size={size === "small" ? 15 : 20} color={colorIconsStyles[variant]} />;
            if (hasIcon === "attach") return <IoMdAttach size={size === "small" ? 15 : 20} color={colorIconsStyles[variant]} />;
            if (hasIcon === "send") return <GrSend size={size === "small" ? 15 : 20} color={colorIconsStyles[variant]} />;
            if (hasIcon === "delete") return <MdDeleteForever size={size === "small" ? 15 : 20} color={colorIconsStyles[variant]} />;
            if (hasIcon === "edit") return <MdEditSquare size={size === "small" ? 15 : 20} color={colorIconsStyles[variant]} />;
            if (hasIcon === "login") return <CiLogin size={size === "small" ? 15 : 20} color={colorIconsStyles[variant]} />;
            if (hasIcon === "reset") return <MdLockReset size={size === "small" ? 15 : 20} color={colorIconsStyles[variant]} />;
            if (hasIcon === "add") return <MdFormatListBulletedAdd size={size === "small" ? 15 : 20} color={colorIconsStyles[variant]} />;
            if (hasIcon === "exit") return <IoExit size={size === "small" ? 15 : 20} color={colorIconsStyles[variant]} />;
            if (hasIcon === "off") return <FaPowerOff size={size === "small" ? 15 : 20} color={colorIconsStyles[variant]} />;
            if (hasIcon === "calculator") return <AiFillCalculator size={size === "small" ? 15 : 20} color={colorIconsStyles[variant]} />;
            if (hasIcon === "list") return <FaClipboardList size={size === "small" ? 15 : 20} color={colorIconsStyles[variant]} />;
            if (hasIcon === "futbol") return <FaFutbol size={size === "small" ? 15 : 20} color={colorIconsStyles[variant]} />;
            return null;
        };

        const renderIcon = () => {
            if (React.isValidElement(Icon)) {
                return React.cloneElement(Icon as React.ReactElement, { className: "w-5 h-5" });
            }
            return defaultIcon();
        };

        return (
            <div className="relative">
                {title && (
                    <div className="flex items-center text-xs mb-1 font-medium text-gray-800">
                        <span style={{ color: variant === "tertiary" ? "#73787f" : "" }}>{title}</span>
                        {info && infoText && (
                            <TooltipInfo infoText={infoText} disabled={disabled} bgStyles={colorIconsStyles[variant]} />
                        )}
                    </div>
                )}
                <div className="relative flex items-center">
                    {Icon && positionIcon === "left" && (
                        <span className="absolute left-3">
                            {renderIcon()}
                        </span>
                    )}
                    <input
                        ref={ref}
                        type={inputType}
                        className={clsx(
                            baseStyles,
                            error ? "border-[#b91c1c] focus:ring-[#b91c1c]" : variantStyles[variant],
                            size in sizeStyles ? sizeStyles[size as keyof typeof sizeStyles] : "",
                            {
                                "pl-10": Icon && positionIcon === "left",
                                "pr-10": Icon && positionIcon === "right" || type === "password",
                                "cursor-not-allowed opacity-60": disabled,
                            },
                            className
                        )}
                        disabled={disabled}
                        placeholder={placeholder}
                        {...props}
                    />
                    {type === "password" && (
                        <span
                            className="absolute right-3 cursor-pointer"
                            onClick={togglePasswordVisibility}
                        >
                            {inputType === "password" ? (
                                <AiOutlineEyeInvisible size={20} color={colorIconsStyles[variant]} />
                            ) : (
                                <AiOutlineEye size={20} color={colorIconsStyles[variant]} />
                            )}
                        </span>
                    )}
                </div>
                {error && errorMessage && (
                    <div className="flex items-center gap-2 text-red-600 text-xs mt-1">
                        <MdErrorOutline size={16} />
                        <span>{errorMessage}</span>
                    </div>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";
