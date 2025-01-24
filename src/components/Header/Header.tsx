import { forwardRef, PropsWithChildren, useEffect, useRef, useState } from "react";
import { HTMLAttributes } from "react";

export type HeaderProps = HTMLAttributes<HTMLElement> & {
    images: { src: string; alt: string; href?: string }[];
    autoPlaySpeed?: number;
    height?: string;
};

export const Header = forwardRef<HTMLElement, PropsWithChildren<HeaderProps>>(
    (
        {
            images = [],
            autoPlaySpeed = 3000,
            height = "400px",
            ...props
        }, ref
    ) => {
        const [currentIndex, setCurrentIndex] = useState(0);
        const intervalRef = useRef<NodeJS.Timeout | null>(null);

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
                <header ref={ref} {...props} className="relative w-full overflow-hidden" style={{ height }}>
                    <p className="text-center text-gray-500">No hay imágenes para mostrar</p>
                </header>
            );
        }

        return (
            <header ref={ref} {...props} className="relative w-full overflow-hidden" style={{ height }}>
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
                                className="absolute inset-0 bg-black bg-opacity-50"
                                style={{ height }}
                            ></div>
                        </div>
                    ))}
                </div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-3 h-3 rounded-full ${currentIndex === index ? "bg-white" : "bg-gray-400"
                                }`}
                        />
                    ))}
                </div>
            </header>
        );
    }
);

Header.displayName = "Header";