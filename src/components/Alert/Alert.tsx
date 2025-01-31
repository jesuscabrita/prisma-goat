import { forwardRef, useEffect, useState } from "react";
import { FiCheckCircle, FiXCircle, FiInfo, FiAlertTriangle } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

export type AlertProps = {
    type: "success" | "error" | "info" | "warning";
    message: string;
    duration?: number;
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
    ({ type = "success", message, duration = 5500 }, ref) => {
        const [visible, setVisible] = useState(true);
        const [isExiting, setIsExiting] = useState(false);
        const [animateProgress, setAnimateProgress] = useState(false);

        useEffect(() => {
            const timer = setTimeout(() => setIsExiting(true), duration - 500);
            return () => clearTimeout(timer);
        }, [duration]);

        useEffect(() => {
            if (isExiting) {
                setTimeout(() => setVisible(false), 500);
            }
        }, [isExiting]);

        useEffect(() => {
            setTimeout(() => setAnimateProgress(true), 100);
        }, []);

        if (!visible) return null;

        const colors = {
            success: { bg: "#047857", progress: "#0c583c" },
            error: { bg: "#b91c1c", progress: "#911d1d" },
            info: { bg: "#0369a1", progress: "#034067" },
            warning: { bg: "#b45309", progress: "#8a3e07" }
        };

        const icons = {
            success: <FiCheckCircle className="w-6 h-6 flex-shrink-0" />,
            error: <FiXCircle className="w-6 h-6 flex-shrink-0" />,
            info: <FiInfo className="w-6 h-6 flex-shrink-0" />,
            warning: <FiAlertTriangle className="w-6 h-6 flex-shrink-0" />
        };

        return (
            <div
                ref={ref}
                className={`fixed top-5 right-5 z-50 flex items-center gap-3 p-4 rounded-lg shadow-lg text-white bg-opacity-90 transition-transform transform ${isExiting ? "animate-slide-out" : "animate-slide-in"
                    } max-w-sm w-full`}
                style={{ backgroundColor: colors[type].bg }}
            >
                {icons[type]}
                <span className="flex-1 break-words">{message}</span>
                <button onClick={() => setIsExiting(true)}>
                    <IoClose className="w-5 h-5 flex-shrink-0" />
                </button>
                <div className="absolute bottom-0 left-0 w-full h-[6px] bg-opacity-50 overflow-hidden">
                    <div
                        className="h-full transition-all ease-linear opacity-100"
                        style={{
                            width: animateProgress ? "0%" : "100%",
                            backgroundColor: colors[type].progress,
                            transitionDuration: `${duration}ms`
                        }}
                    ></div>
                </div>
            </div>
        );
    }
);

Alert.displayName = "Alert";