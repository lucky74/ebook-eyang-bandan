"use client";
import React, { useRef, useState, useEffect, forwardRef } from "react";
import Image from "next/image";
import dynamic from 'next/dynamic';

// Dynamically import HTMLFlipBook to avoid SSR issues
const HTMLFlipBook = dynamic(() => import('react-pageflip'), { ssr: false });

interface PageProps {
  image: string;
  number: number;
}

const Page = forwardRef<HTMLDivElement, PageProps>(({ image, number }, ref) => {
  return (
    <div className="demoPage bg-[#fdfaf5] h-full w-full shadow-inner border-l border-[#e0dcd5]" ref={ref}>
      <div className="relative w-full h-full flex items-center justify-center p-4">
        <div className="relative w-full h-full">
            <Image
                src={image}
                alt={`Page ${number}`}
                fill
                className="object-contain"
                priority={number <= 4}
            />
        </div>
        {/* Page Number */}
        <div className="absolute bottom-4 text-black/50 text-sm font-serif">
            {number}
        </div>
      </div>
    </div>
  );
});

Page.displayName = "Page";

const FlipBookComponent = () => {
    // @ts-ignore
    const bookRef = useRef(null);
    const [images, setImages] = useState<string[]>([]);
    const [isMounted, setIsMounted] = useState(false);
    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        setIsMounted(true);
        // Generate image paths 1.png to 26.png
        const imgs = [];
        for (let i = 1; i <= 26; i++) {
            imgs.push(`/images/${i}.png`);
        }
        setImages(imgs);

        // Splash screen timer
        const timer = setTimeout(() => {
            setShowSplash(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    if (!isMounted) return null;

    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#2b2b2b] overflow-hidden relative"
             style={{
                 backgroundImage: `url("https://www.transparenttextures.com/patterns/wood-pattern.png")`,
                 backgroundBlendMode: "multiply"
             }}
        >
            {/* Splash Screen Overlay */}
            <div 
                className={`absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#2b2b2b] transition-opacity duration-1000 ${showSplash ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                style={{
                    backgroundImage: `url("https://www.transparenttextures.com/patterns/wood-pattern.png")`,
                    backgroundBlendMode: "multiply"
                }}
            >
                <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-[#d4af37] shadow-2xl animate-pulse">
                    <Image 
                        src="/images/Logo_Eyang.png" 
                        alt="Logo Eyang Bandan" 
                        fill 
                        className="object-cover"
                        priority
                    />
                </div>
                <h1 className="mt-8 text-[#d4af37] text-3xl md:text-4xl font-bold font-serif tracking-widest drop-shadow-lg text-center">
                    Silsilah Keluarga<br/>Eyang Bandan
                </h1>
            </div>

            <div className="absolute top-8 left-8 z-10 flex items-center gap-4 transition-opacity duration-1000 delay-500" style={{ opacity: showSplash ? 0 : 1 }}>
                <div className="w-16 h-16 relative rounded-full overflow-hidden border-2 border-[#d4af37] shadow-lg bg-white/10 backdrop-blur-sm">
                    <Image src="/images/Logo_Eyang.png" alt="Logo" fill className="object-cover" />
                </div>
                <div>
                    <h1 className="text-[#d4af37] text-2xl font-bold tracking-wider drop-shadow-md">Silsilah</h1>
                    <h2 className="text-[#fdfaf5] text-lg tracking-wide drop-shadow-md">Eyang Bandan</h2>
                </div>
            </div>

            {/* Book Container */}
            <div className={`relative shadow-2xl rounded-sm flex items-center justify-center transition-all duration-1000 delay-500 ${showSplash ? 'scale-90 opacity-0' : 'scale-100 opacity-100'}`}>
                 {/* @ts-ignore */}
                <HTMLFlipBook
                    width={450}
                    height={650}
                    size="stretch"
                    minWidth={300}
                    maxWidth={600}
                    minHeight={400}
                    maxHeight={900}
                    maxShadowOpacity={0.5}
                    showCover={true}
                    mobileScrollSupport={true}
                    className="shadow-2xl bg-[#fdfaf5]"
                    ref={bookRef}
                >
                    {images.map((img, index) => (
                        <Page key={index} image={img} number={index + 1} />
                    ))}
                </HTMLFlipBook>
            </div>
            
            <div className="absolute bottom-8 text-[#888] text-sm">
                <p>Use arrow keys or click corners to flip pages</p>
            </div>
        </div>
    );
};

export default FlipBookComponent;
