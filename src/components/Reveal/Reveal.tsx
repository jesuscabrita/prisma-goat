import { forwardRef, HTMLAttributes, PropsWithChildren, useEffect, useRef } from "react";
import { useAnimation, useInView, motion } from "framer-motion"

export type RevealProps = HTMLAttributes<HTMLDivElement> & {
    variant?: "primary" | "secondary" | "vividPink" | "darkMagenta" | "veryDarkViolet" | "danger" | "warning" | "success" | "tertiary" | "experiences" | "pikaros";
    duration?: number;
    delay?: number;
    ease?: "easeIn" | "easeInOut" | "easeOut" | "linear" | "anticipate" | "backIn" | "backInOut" | "backOut" | "circIn" | "circInOut" | "circOut"
};

export const Reveal = forwardRef<HTMLDivElement, PropsWithChildren<RevealProps>>(
    (
        {
            ease = "easeIn",
            variant = "primary",
            children,
            duration = 0.5,
            delay = 0.5,
            ...props
        }, ref) => {
        const innerRef = useRef<HTMLDivElement | null>(null);
        const combinedRef = (node: HTMLDivElement) => {
            innerRef.current = node;
            if (typeof ref === 'function') {
                ref(node);
            } else if (ref) {
                (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
            }
        };
        const isInView = useInView(innerRef, { once: false });
        const mainControls = useAnimation();
        const slideControls = useAnimation();

        const colorStyle = {
            primary: "#1F2937",
            secondary: "#ededed",
            vividPink: "#ff0145",
            darkMagenta: "#770069",
            veryDarkViolet: "#350053",
            danger: "#b91c1c",
            warning: "#f59e0b",
            success: "#047857",
            tertiary: "#d4d3d3",
            experiences: "#a8dbce",
            pikaros: "#DFCA78"
        }

        useEffect(() => {
            if (isInView) {
                mainControls.start("visible");
                slideControls.start("visible");
            }
        }, [isInView, mainControls, slideControls]);

        return (
            <div ref={combinedRef} {...props} className="relative overflow-hidden w-fit">
                <motion.div
                    variants={{
                        hidden: { opacity: 0, y: 75 },
                        visible: { opacity: 1, y: 0 }
                    }}
                    initial="hidden"
                    animate={mainControls}
                    exit="hidden"
                    transition={{ duration: duration, delay: delay }}
                >
                    {children}
                </motion.div>
                <motion.div
                    variants={{
                        hidden: { left: 0 },
                        visible: { left: "100%" }
                    }}
                    initial="hidden"
                    animate={slideControls}
                    transition={{ duration: 0.5, ease: ease }}
                    style={{
                        position: "absolute",
                        top: 4,
                        bottom: 4,
                        left: 0,
                        right: 0,
                        background: colorStyle[variant],
                        zIndex: 20
                    }}
                >
                </motion.div>
            </div>
        );
    }
);

Reveal.displayName = "Reveal";