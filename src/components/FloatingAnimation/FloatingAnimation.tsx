import { forwardRef, HTMLAttributes, PropsWithChildren } from "react";

export type FloatingAnimationProps = HTMLAttributes<HTMLDivElement> & {
    variant?: "primary" | "secondary" | "vividPink" | "darkMagenta" | "veryDarkViolet" | "danger" | "warning" | "success" | "tertiary" | "experiences";
};

export const FloatingAnimation = forwardRef<HTMLDivElement, PropsWithChildren<FloatingAnimationProps>>(
    (
        {
            children,
            className,
            ...props
        }, ref) => {
        return (
            <div ref={ref} {...props} className={`relative overflow-hidden ${className}`}>
                <div className="flex items-center justify-center w-full h-full">
                    <div className="relative animate-floating">
                        {children}
                    </div>
                </div>
            </div>
        );
    }
);

FloatingAnimation.displayName = "FloatingAnimation";