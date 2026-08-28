import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Film,
  Sparkles,
  ChevronRight,
  Tv,
  CheckCircle2,
  Compass,
} from 'lucide-react';
import { DepartmentEvent } from '../types';

interface HoloCinemaTheaterProps {
  events: DepartmentEvent[];
  onSelectEvent: (event: DepartmentEvent) => void;
  onOpenRegister: (event: DepartmentEvent) => void;
}

interface VideoItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  category: string;
  videoUrl: string;
  isYouTube: boolean;
  poster: string;
  eventRef?: DepartmentEvent;
}

export const HoloCinemaTheater: React.FC<HoloCinemaTheaterProps> = ({
  events,
  onSelectEvent,
  onOpenRegister,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  // Build complete video playlist (Main Theme Video + All Event Trailers)
  const videoPlaylist: VideoItem[] = [
    {
      id: 'odyssey-main-theme',
      title: 'The Odyssey — Official Production Theme Trailer',
      subtitle: 'Original 4K 70mm Cinematic Reel & Mythic Symphony',
      badge: 'Main Feature Film',
      category: 'Cinema & Production',
      videoUrl: '/ODY.THEME.mp4',
      isYouTube: false,
      poster: '/odyssey_warrior_bg.jpg',
    },
    ...events
      .filter((ev) => Boolean(ev.videoTrailerUrl))
      .map((ev) => {
        const isYT =
          Boolean(ev.videoTrailerUrl?.includes('youtube.com')) ||
          Boolean(ev.videoTrailerUrl?.includes('youtu.be'));
        return {
          id: ev.id,
          title: ev.title,
          subtitle: ev.subtitle,
          badge: ev.badge,
          category: ev.category,
          videoUrl: ev.videoTrailerUrl!,
          isYouTube: isYT,
          poster: ev.heroImage,
          eventRef: ev,
        };
      }),
  ];

  const currentVideo = videoPlaylist[activeVideoIndex] || videoPlaylist[0];

  useEffect(() => {
    if (!currentVideo.isYouTube && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [activeVideoIndex, currentVideo.isYouTube]);

  const togglePlay = () => {
    if (!videoRef.current || currentVideo.isYouTube) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div
      className="relative my-8 overflow-hidden rounded-3xl border border-amber-500/30 bg-[#030612] p-4 sm:p-6 shadow-2xl"
      id="odyssey-holo-cinema-stage"
    >
      {/* Dynamic Ambient Stage Backlight */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-80 w-full max-w-4xl rounded-full bg-amber-500/15 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-32 left-1/2 -translate-x-1/2 h-80 w-full max-w-4xl rounded-full bg-cyan-500/10 blur-[100px]" />

      {/* Stage Header */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-500/20 pb-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-300">
            <Tv className="w-3.5 h-3.5 text-amber-400" />
            <span>3D Holo-Cinema &amp; Video Theater</span>
          </div>
          <h3 className="font-epic text-xl sm:text-2xl font-bold text-slate-100 mt-1">
            Official Theme Video &amp; Departmental Trailers
          </h3>
        </div>

        {/* Video counter pill */}
        <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800 self-start sm:self-auto">
          <Film className="w-3.5 h-3.5 text-amber-400" />
          <span>Playing Reel {activeVideoIndex + 1} of {videoPlaylist.length}</span>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main 3D Cinema Curved Screen (2 Columns) */}
        <div className="lg:col-span-2 flex flex-col space-y-4">
          <div className="group relative aspect-[16/9] w-full overflow-hidden rounded-2xl border-2 border-amber-400/40 bg-black shadow-[0_0_50px_rgba(251,191,36,0.15)]">
            {currentVideo.isYouTube ? (
              <iframe
                key={currentVideo.videoUrl}
                src={currentVideo.videoUrl.replace(
                  /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/,
                  (_: string, id: string) => `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`
                )}
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
                className="w-full h-full border-none"
                title={currentVideo.title}
              />
            ) : (
              <video
                ref={videoRef}
                src={currentVideo.videoUrl}
                poster={currentVideo.poster}
                loop
                autoPlay
                playsInline
                muted={isMuted}
                className="w-full h-full object-cover brightness-[0.95] contrast-[1.05]"
              />
            )}

            {/* Glowing Widescreen Stage Edge */}
            <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]" />

            {/* Custom Cinema Player Floating Controls */}
            {!currentVideo.isYouTube && (
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 rounded-xl bg-slate-950/80 p-2 backdrop-blur-md border border-white/10 opacity-90 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-slate-950 hover:bg-amber-400 font-bold transition-all"
                    title={isPlaying ? 'Pause video' : 'Play video'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                  </button>

                  <button
                    type="button"
                    onClick={toggleMute}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 text-xs font-semibold text-slate-200 hover:text-amber-300"
                    title={isMuted ? 'Unmute Video' : 'Mute Video'}
                  >
                    {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-amber-400" />}
                    <span>{isMuted ? 'Muted' : 'Sound On'}</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleFullscreen}
                    className="p-2 rounded-lg border border-slate-700 bg-slate-900 text-slate-300 hover:text-white"
                    title="Fullscreen"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Current Video Meta Box */}
          <div className="p-4 rounded-2xl border border-amber-500/20 bg-slate-900/70 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                  {currentVideo.badge}
                </span>
                <span className="text-xs text-slate-400">{currentVideo.category}</span>
              </div>
              <h4 className="font-epic text-base sm:text-lg font-bold text-slate-100">
                {currentVideo.title}
              </h4>
              <p className="font-serif-cormorant text-xs sm:text-sm italic text-slate-300">
                {currentVideo.subtitle}
              </p>
            </div>

            {currentVideo.eventRef && (
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => onSelectEvent(currentVideo.eventRef!)}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md"
                >
                  <span>Event Dossier</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Video Playlist Selector (1 Column) */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <Film className="w-3.5 h-3.5" />
            <span>Select Video Reel:</span>
          </h4>

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {videoPlaylist.map((item, idx) => {
              const isSelected = idx === activeVideoIndex;

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveVideoIndex(idx)}
                  className={`group relative flex items-center gap-3 p-2.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-amber-400 bg-amber-500/15 shadow-[0_0_20px_rgba(251,191,36,0.2)]'
                      : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  {/* Video Thumbnail */}
                  <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-black">
                    <img
                      src={item.poster}
                      alt={item.title}
                      className="h-full w-full object-cover brightness-90 group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <div className={`flex h-6 w-6 items-center justify-center rounded-full ${isSelected ? 'bg-amber-400 text-slate-950' : 'bg-white/80 text-black'}`}>
                        <Play className="w-3 h-3 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Title & Badge */}
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block truncate">
                      {item.badge}
                    </span>
                    <h5 className="font-epic text-xs font-bold text-slate-100 truncate group-hover:text-amber-300">
                      {item.title}
                    </h5>
                    <p className="text-[11px] text-slate-400 truncate font-serif-cormorant italic">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
