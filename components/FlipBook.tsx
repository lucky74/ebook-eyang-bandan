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

    useEffect(() => {
        setIsMounted(true);
        // Generate image paths 1.png to 26.png
        const imgs = [];
        for (let i = 1; i <= 26; i++) {
            imgs.push(`/images/${i}.png`);
        }
        setImages(imgs);
    }, []);

    if (!isMounted) return null;

    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#2b2b2b] overflow-hidden relative"
             style={{
                 backgroundImage: `url("https://www.transparenttextures.com/patterns/wood-pattern.png")`,
                 backgroundBlendMode: "multiply"
             }}
        >
            <div className="absolute top-8 left-8 z-10 flex items-center gap-4">
                <div className="w-16 h-16 relative rounded-full overflow-hidden border-2 border-[#d4af37] shadow-lg bg-white/10 backdrop-blur-sm">
                    <Image src="/images/Logo_Eyang.png" alt="Logo" fill className="object-cover" />
                </div>
                <div>
                    <h1 className="text-[#d4af37] text-2xl font-bold tracking-wider drop-shadow-md">Silsilah</h1>
                    <h2 className="text-[#fdfaf5] text-lg tracking-wide drop-shadow-md">Eyang Bandan</h2>
                </div>
            </div>

            {/* Book Container */}
            <div className="relative shadow-2xl rounded-sm flex items-center justify-center">
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
