import { forwardRef, PropsWithChildren, useEffect, useRef, useState } from "react";
import { HTMLAttributes } from "react";
import { Button } from "../Button/Button";
import { MotionTransition } from "../MotionTransition/MotionTransition";
import { Reveal } from "../Reveal/Reveal";

export type HeaderProps = HTMLAttributes<HTMLElement> & {
    images: { src: string; alt: string; href?: string }[];
    autoPlaySpeed?: number;
    height?: string;
    explore?: { content: string; };
    overlap?: { text1: string; text2: string; text3: string; text4: string; text5: string; };
    nameImages?: boolean;
    nameImagesBotton?: boolean;
    handletext4?: () => void;
    handletext5?: () => void;
    variant?: "primary" | "secondary" | "vividPink" | "darkMagenta" | "veryDarkViolet" | "danger" | "warning" | "success" | "tertiary" | "experiences";
};

export const Header = forwardRef<HTMLElement, PropsWithChildren<HeaderProps>>(
    (
        {
            images = [],
            variant = "vividPink",
            autoPlaySpeed = 3000,
            height = "400px",
            explore = {},
            overlap = {},
            nameImages = false,
            nameImagesBotton = false,
            handletext4,
            handletext5,
            ...props
        }, ref
    ) => {
        const [currentIndex, setCurrentIndex] = useState(0);
        const intervalRef = useRef<NodeJS.Timeout | null>(null);
        const touchStartX = useRef(null);
        const touchEndX = useRef(null);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const handleTouchStart = (e: any) => {
            touchStartX.current = e.touches[0].clientX;
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const handleTouchMove = (e: any) => {
            touchEndX.current = e.touches[0].clientX;
        };
        const handleTouchEnd = () => {
            if (!touchStartX.current || !touchEndX.current) return;
            const diffX = touchStartX.current - touchEndX.current;
            const threshold = 50;
            if (diffX > threshold) {
                if (currentIndex < images.length - 1) {
                    setCurrentIndex(currentIndex + 1);
                }
            } else if (diffX < -threshold) {
                if (currentIndex > 0) {
                    setCurrentIndex(currentIndex - 1);
                }
            }
            touchStartX.current = null;
            touchEndX.current = null;
        };

        const goToNextSlide = () => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        };

        useEffect(() => {
            if (images.length > 0) {
                intervalRef.current = setInterval(goToNextSlide, autoPlaySpeed);
            }
            return () => {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                }
            };
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [autoPlaySpeed, images.length]);

        if (!images || images.length === 0) {
            return (
                <header ref={ref} {...props} className="relative w-full overflow-hidden" style={{ height }} >
                    <p className="text-center text-gray-500">No hay imágenes para mostrar</p>
                </header>
            );
        }

        const variantStyles = {
            primary: "text-white",
            secondary: "text-white",
            vividPink: "text-[#ff0145]",
            darkMagenta: "text-[#770069]",
            veryDarkViolet: "text-[#350053]",
            danger: "text-[#b91c1c]",
            warning: "text-[#f59e0b]",
            success: "text-[#047857]",
            tertiary: "text--[#d4d3d3]",
            experiences: "text-[#a8dbce]",
        };

        return (
            <header
                ref={ref}
                {...props}
                style={{ height }}
                className="relative w-full overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}>
                {overlap && (
                    <div className={`absolute inset-0 flex flex-col items-center justify-center text-center z-20 text-white`}>
                        <MotionTransition>
                            <h1 className="text-3xl md:text-5xl font-bold animate-fade-in-up">
                                {overlap.text1}
                                <span className={`${variantStyles[variant]}`}>{overlap.text2}</span>
                            </h1>
                        </MotionTransition>
                        <MotionTransition>
                            <p className="text-sm md:text-lg mb-6">{overlap.text3}</p>
                        </MotionTransition>
                        <div className="flex gap-4">
                            {overlap.text4 &&
                                <div className="flex">
                                    <Reveal variant={variant} duration={1} delay={1}>
                                        <Button variant={variant} onClick={handletext4} size="small" label={overlap.text4} />
                                    </Reveal>
                                </div>
                            }
                            {overlap.text5 &&
                                <div className="flex">
                                    <Reveal variant="tertiary" duration={1} delay={1}>
                                        <Button variant="tertiary" onClick={handletext5} size="small" label={overlap.text5} />
                                    </Reveal>
                                </div>
                            }
                        </div>
                    </div>)}
                {explore?.content && (
                    <div className={`absolute z-20 bottom-8 left-1/2 transform -translate-x-1/2 pointer-events-auto`}>
                        <MotionTransition>
                            <a href={explore.content} className="flex flex-col items-center text-white">
                                <span className="mb-2 text-lg font-medium">Explora más</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-8 h-8 animate-bounce"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </a>
                        </MotionTransition>
                    </div>
                )}
                {nameImages &&
                    (<div className="absolute inset-0 flex flex-col justify-center items-center text-white z-10 transition-opacity duration-700 ease-in-out">
                        <h1 key={currentIndex} className="text-4xl font-bold">
                            {images[currentIndex]?.alt || "Título dinámico"}
                        </h1>
                    </div>)}
                {nameImagesBotton &&
                    (<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center z-10">
                        <p className="text-lg font-medium text-white">{images[currentIndex]?.alt}</p>
                    </div>)}
                <div
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                        height,
                    }}
                >
                    {images.map(({ src, alt, href }, index) => (
                        <div key={index} id="large-header" className="relative w-full flex-shrink-0 large-header">
                            {href ? (
                                <a href={href}>
                                    <img
                                        src={src}
                                        alt={alt}
                                        className="w-full h-full object-cover"
                                        style={{ height }}
                                    />
                                </a>
                            ) : (
                                <img
                                    src={src}
                                    alt={alt}
                                    className="w-full h-full object-cover"
                                    style={{ height }}
                                />
                            )}
                            <div
                                className="absolute inset-0 bg-black bg-opacity-0"
                                style={{ height }}
                            ></div>
                        </div>
                    ))}
                </div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
                    {images.map((_, index) => (
                        <Reveal variant="tertiary" duration={1} delay={1}>
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-3 h-3 rounded-full ${currentIndex === index ? "bg-white" : "bg-gray-400"
                                    }`}
                            />
                        </Reveal>
                    ))}
                </div>
            </header>
        );
    }
);

Header.displayName = "Header";