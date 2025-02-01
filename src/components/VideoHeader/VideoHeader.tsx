import { forwardRef, PropsWithChildren, useEffect, useRef, useState } from "react";
import { HTMLAttributes } from "react";
import { Button } from "../Button/Button";
import { MotionTransition } from "../MotionTransition/MotionTransition";
import { Reveal } from "../Reveal/Reveal";

export type VideoHeaderProps = HTMLAttributes<HTMLElement> & {
    videoSrc: string;
    height?: string;
    explore?: { content: string };
    overlap?: { text1: string; text2?: string; text3?: string; text4?: string; text5?: string };
    handletext4?: () => void;
    handletext5?: () => void;
    mutedVideo?: boolean;
    variant?: "primary" | "secondary" | "vividPink" | "darkMagenta" | "veryDarkViolet" | "danger" | "warning" | "success" | "tertiary" | "experiences";
};

export const VideoHeader = forwardRef<HTMLElement, PropsWithChildren<VideoHeaderProps>>(
    ({ videoSrc, height = "400px", explore, overlap, mutedVideo = false, handletext4, handletext5, variant = "vividPink", ...props }, ref) => {
        const videoRef = useRef<HTMLVideoElement | null>(null);
        const [muted, setMuted] = useState(mutedVideo);

        const handleCanPlay = () => {
            const video = videoRef.current;
            if (video) {
                const playPromise = video.play();
                playPromise
                    .catch(() => {
                        video.play();
                    });
            }
        };

        const handleClickLink = (href: string) => {
            const targetElement = document.getElementById(href.slice(1));
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth" });
            }
        };

        useEffect(() => {
            if (videoRef.current) {
                const video = videoRef.current;
                video.muted = muted;
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise
                        .catch(() => {
                            video.play();
                        });
                }
            }
        }, [muted]);

        const variantStyles = {
            primary: "text-white",
            secondary: "text-white",
            vividPink: "text-[#ff0145]",
            darkMagenta: "text-[#770069]",
            veryDarkViolet: "text-[#350053]",
            danger: "text-[#b91c1c]",
            warning: "text-[#f59e0b]",
            success: "text-[#047857]",
            tertiary: "text-[#d4d3d3]",
            experiences: "text-[#a8dbce]",
        };

        return (
            <header ref={ref} {...props} className="relative w-full overflow-hidden" style={{ height }}>
                <video
                    ref={videoRef}
                    src={videoSrc}
                    autoPlay
                    muted={muted}
                    loop
                    playsInline
                    onCanPlay={handleCanPlay}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                {overlap && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 text-white">
                        <MotionTransition>
                            <h1 className="text-3xl md:text-5xl font-bold animate-fade-in-up">
                                {overlap.text1}{" "}
                                <span className={`${variantStyles[variant]}`}>{overlap.text2}</span>
                            </h1>
                        </MotionTransition>
                        {overlap.text3 && (
                            <MotionTransition>
                                <p className="text-sm md:text-lg mb-6">{overlap.text3}</p>
                            </MotionTransition>
                        )}
                        <div className="flex gap-4">
                            {overlap.text4 && (
                                <Reveal variant={variant} duration={1} delay={1}>
                                    <div className="flex p-2">
                                        <Button variant={variant} onClick={handletext4} size="small" label={overlap.text4} />
                                    </div>
                                </Reveal>
                            )}
                            {overlap.text5 && (
                                <Reveal variant="tertiary" duration={1} delay={1}>
                                    <div className="flex p-2">
                                        <Button variant="tertiary" onClick={handletext5} size="small" label={overlap.text5} />
                                    </div>
                                </Reveal>
                            )}
                        </div>
                    </div>
                )}
                <button
                    onClick={() => setMuted(!muted)}
                    className="absolute z-30 bottom-8 right-8 bg-white bg-opacity-30 p-3 rounded-full backdrop-blur-md hover:bg-opacity-50 transition"
                >
                    {muted ? "🔇" : "🔊"}
                </button>
                {explore?.content && (
                    <div className="absolute z-20 bottom-8 left-1/2 transform -translate-x-1/2 pointer-events-auto">
                        <MotionTransition>
                            <a
                                onClick={() => explore.content && handleClickLink(explore.content)}
                                className="flex flex-col items-center text-white cursor-pointer"
                            >
                                <span className="mb-2 text-lg font-medium">Explora más</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-8 h-8 animate-bounce"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </a>
                        </MotionTransition>
                    </div>
                )}
            </header>
        );
    }
);

VideoHeader.displayName = "VideoHeader";