import logoMagenta from '../../assets/images/LogosMagenta.png';
import logoRed from '../../assets/images/logodatagoat.png';
import logoWhite from '../../assets/images/LogosWhite.png';
import logoBlack from '../../assets/images/LogoBlack.png';
import logo6 from '../../assets/images/Logos-06.png';
import { forwardRef, HTMLAttributes } from "react";

export type LoadingIndicatorProps = HTMLAttributes<HTMLDivElement> & {
    variant?: "primary" | "secondary" | "vividPink" | "darkMagenta" | "veryDarkViolet" | "danger" | "warning" | "success" | "experiences";
    background?: "black" | "white";
    logoGoatData?: "logoRed" | "logoBlack" | "logo6" | "logoMagenta" | "logoWhite";
    imgLoading?: string;
    strokeWidth?: "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14";
};

export const LoadingIndicator = forwardRef<HTMLDivElement, LoadingIndicatorProps>(
    (
        {
            variant = "primary",
            background = "black",
            logoGoatData = "logoRed",
            imgLoading = "",
            strokeWidth = "10",
            ...props
        },
        ref) => {

        const variantStyles = {
            primary: "#1F2937",
            secondary: "#ededed",
            vividPink: "#ff0145",
            darkMagenta: "#770069",
            veryDarkViolet: "#350053",
            danger: "#b91c1c",
            warning: "#f59e0b",
            success: "#047857",
            experiences:"#6BC1E4"
        };

        const backgroundStyles = {
            black: "bg-black",
            white: "bg-white"
        }

        const logoType = {
            logoRed: logoRed,
            logoBlack: logoBlack,
            logo6: logo6,
            logoMagenta: logoMagenta,
            logoWhite: logoWhite,
        }

        const strokeWidthType = {
            6: "6",
            7: "7",
            8: "8",
            9: "9",
            10: "10",
            11: "11",
            12: "12",
            13: "13",
            14: "14",
        }

        return (
            <div
                ref={ref}
                {...props}
                style={{zIndex:99999}}
                className={`fixed flex justify-center items-center top-0 left-0 right-0 bottom-0 ${backgroundStyles[background]} bg-opacity-50 z-[1201]`}
            >
                <svg
                    width="110"
                    height="110"
                    viewBox="0 0 110 110"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute blink 1s ease-in-out infinite"
                >
                    <circle
                        cx="55"
                        cy="55"
                        r="45"
                        fill="none"
                        stroke={variantStyles[variant]}
                        strokeWidth={strokeWidthType[strokeWidth]}
                        strokeDasharray="314"
                        strokeDashoffset="314"
                        className="progress-circle"
                        style={{
                            animation: "progress 1.4s ease-in-out infinite, blink 1s ease-in-out infinite, fade 1.4s ease-in-out infinite",
                        }}
                    />
                </svg>
                <div
                    className="flex justify-center items-center relative h-[60px] w-[60px] rounded-full"
                    style={{
                        animation: "blink 1s ease-in-out infinite",
                    }}
                >
                    <div className="ml-1">{<img src={imgLoading && imgLoading.trim() !== '' ? imgLoading : logoType[logoGoatData]} alt="logo" />}</div>
                </div>
            </div>
        );
    }
);

LoadingIndicator.displayName = "LoadingIndicator";