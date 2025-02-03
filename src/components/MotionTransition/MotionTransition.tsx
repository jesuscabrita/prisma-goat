import { forwardRef, HTMLAttributes, PropsWithChildren, useEffect, useRef } from "react";
import { useAnimation, useInView, motion } from "framer-motion";
import { fadeIn } from "./fadeIn";

export type MotionTransitionProps = HTMLAttributes<HTMLDivElement> & {
    variant?: "primary" | "secondary" | "vividPink" | "darkMagenta" | "veryDarkViolet" | "danger" | "warning" | "success" | "experiences";
};

export const MotionTransition = forwardRef<HTMLDivElement, PropsWithChildren<MotionTransitionProps>>(
    (
        {
            children,
            className,
            ...props
        }, ref) => {
        const localRef = useRef<HTMLDivElement>(null);
        const combinedRef = (ref as React.RefObject<HTMLDivElement>) || localRef;
        const isInView = useInView(combinedRef, { once: false });
        const mainControls = useAnimation();
        const slideControls = useAnimation();

        useEffect(() => {
            if (combinedRef.current && isInView) {
                mainControls.start("visible");
                slideControls.start("visible");
            }
        }, [isInView, mainControls, slideControls, combinedRef]);

        return (
            <div ref={combinedRef} {...props}>
                <motion.div
                    variants={fadeIn()}
                    initial="hidden"
                    animate={mainControls}
                    exit="hidden"
                    className={className}
                >
                    {children}
                </motion.div>
            </div>
        );
    }
);

MotionTransition.displayName = "MotionTransition";