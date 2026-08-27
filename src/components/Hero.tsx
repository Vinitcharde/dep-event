import React, { useRef, useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { DepartmentEvent } from '../types';

interface HeroProps {
  onExploreClick: () => void;
  featuredEvent: DepartmentEvent;
  onSelectFeatured: (event: DepartmentEvent) => void;
  selectedCategory: string;
  onCategorySelect: (cat: string) => void;
  categories: string[];
}

export const Hero: React.FC<HeroProps> = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isSoundOn, setIsSoundOn] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = 0.8;
    video.preload = 'auto';
    video.muted = true;

    const playVideo = async () => {
      try {
        await video.play();
      } catch {
        video.addEventListener(
          'loadeddata',
          () => {
            video.play().catch(() => undefined);
          },
          { once: true }
        );
      }
    };

    playVideo();
  }, []);

  const toggleVideoSound = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      const nextSoundState = !isSoundOn;
      video.muted = !nextSoundState;
      video.volume = 0.8;
      await video.play();
      setIsSoundOn(nextSoundState);
    } catch {
      video.muted = true;
      setIsSoundOn(false);
    }
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-[#02050f] aspect-[16/9] sm:aspect-[16/9] md:aspect-auto md:min-h-[85vh] lg:min-h-screen flex items-center justify-center"
      id="hero-voyage-section"
    >
      {/* ── Background Media Container ────────────────────────── */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/90">
        {/* Ambient blurred backdrop for letterbox support on mobile/ultrawide */}
        <video
          src="/ODY.THEME.mp4"
          aria-hidden="true"
          loop
          autoPlay
          playsInline
          muted
          preload="auto"
          controls={false}
          disablePictureInPicture
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-35 blur-2xl md:opacity-20 transition-opacity"
        />

        {/* Main Crisp Video — Full horizontal frame shown on mobile, cinematic cover on desktop */}
        <video
          ref={videoRef}
          src="/ODY.THEME.mp4"
          poster="/odyssey_warrior_bg.jpg"
          loop
          autoPlay
          playsInline
          muted
          preload="auto"
          controls={false}
          disablePictureInPicture
          className="relative z-0 h-full w-full object-contain md:object-cover brightness-[0.92] contrast-[1.02] saturate-[1.08] transition-all"
          onLoadedData={() => videoRef.current?.play().catch(() => undefined)}
          onClick={() => videoRef.current?.play().catch(() => undefined)}
        />

        {/* Cinematic Gradient Overlays (gentle top & bottom vignette) */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#02050f]/60 via-transparent to-[#040711]" />
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_80px_rgba(2,5,15,0.7)]" />

        {/* Sound Toggle Button — Responsive position & sizing */}
        <button
          type="button"
          onClick={toggleVideoSound}
          className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 z-20 flex items-center gap-1.5 sm:gap-2 rounded-full border border-amber-400/50 bg-slate-950/85 px-3 py-1.5 sm:px-4 sm:py-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-100 shadow-xl backdrop-blur-md transition-all hover:bg-amber-500 hover:text-slate-950 active:scale-95"
          aria-label={isSoundOn ? 'Mute cinematic video' : 'Play cinematic video with sound'}
          title={isSoundOn ? 'Mute cinematic video' : 'Play cinematic video with sound'}
        >
          {isSoundOn ? (
            <Volume2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          ) : (
            <VolumeX className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          )}
          <span>{isSoundOn ? 'Mute Video' : 'Play With Sound'}</span>
        </button>
      </div>
    </section>
  );
};
