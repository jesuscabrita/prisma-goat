import clsx from "clsx";
import { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

type TooltipInfoProps = {
    infoText: string;
    disabled?: boolean;
    bgStyles: string
};

export const TooltipInfo: React.FC<TooltipInfoProps> = ({ infoText, disabled = false, bgStyles }) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div
            className={clsx("relative flex items-center", {
                "cursor-not-allowed opacity-60": disabled,
                "cursor-pointer": !disabled,
            })}
            onMouseEnter={() => !disabled && setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            <AiOutlineInfoCircle
                size={13}
                className={clsx("ml-1", {
                    "text-gray-400": disabled,
                    "text-gray-700": !disabled,
                })}
            />
            {isVisible && !disabled && (
                <div className={`absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 z-10 w-48 p-2 bg-[${bgStyles}] text-white text-xs rounded-lg shadow-lg`}>
                    {infoText}
                </div>
            )}
        </div>
    );
};