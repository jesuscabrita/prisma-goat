import { forwardRef, HTMLAttributes, PropsWithChildren, useEffect, useRef } from "react";
import { useAnimation, useInView, motion } from "framer-motion";

const fadeIn = () => {
    return {
        hidden: {
            y: 80,
            opacity: 0,
            x: 0,
            transition: {
                type: "tween",
                duration: 0.5,
                delay: 0.5,
                ease: [0.25, 0.6, 0.3, 0.8],
            },
        },
        visible: {
            y: 0,
            x: 0,
            opacity: 1,
            transition: {
                type: "tween",
                duration: 1.4,
                delay: 0.5,
                ease: [0.25, 0.25, 0.25, 0.75],
            },
        },
    };
};

export type MotionTransitionProps = HTMLAttributes<HTMLDivElement> & {
    variant?: "primary" | "secondary" | "vividPink" | "darkMagenta" | "veryDarkViolet" | "danger" | "warning" | "success" | "experiences";
};

export const MotionTransition = forwardRef<HTMLDivElement, PropsWithChildren<MotionTransitionProps>>(
    (
        {
            children,
            className,
            ...props
        }) => {
        const ref = useRef(null)
        const isInView = useInView(ref, { once: false })
        const mainControls = useAnimation()
        const slideControls = useAnimation()

        useEffect(() => {
            if (isInView) {
                mainControls.start("visible")
                slideControls.start("visible")
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [isInView])

        return (
            <div ref={ref} {...props}>
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