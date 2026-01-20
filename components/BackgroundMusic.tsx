"use client";

import React, { useState, useRef, useEffect } from "react";

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Attempt to auto-play on mount (often blocked by browsers without interaction)
    if (audioRef.current) {
      audioRef.current.volume = 0.5; // Set initial volume
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <audio
        ref={audioRef}
        src="/audio/backsound.mp3"
        loop
        preload="auto"
      />
      <button
        onClick={togglePlay}
        className="bg-[#8B4513] text-[#F3E5AB] p-3 rounded-full shadow-lg hover:bg-[#65320e] transition-all duration-300 border-2 border-[#D4C4A8] flex items-center justify-center w-12 h-12"
        aria-label={isPlaying ? "Pause Music" : "Play Music"}
        title={isPlaying ? "Matikan Musik" : "Putar Musik"}
      >
        {isPlaying ? (
          // Pause Icon
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
          </svg>
        ) : (
          // Play Icon
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
          </svg>
        )}
      </button>
    </div>
  );
}
