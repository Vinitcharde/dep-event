import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Film,
  Sparkles,
  ChevronRight,
  Tv,
  CheckCircle2,
} from 'lucide-react';
import { DepartmentEvent } from '../types';

interface DepartmentVideoTheaterProps {
  events: DepartmentEvent[];
  onSelectEvent: (event: DepartmentEvent) => void;
  onOpenRegister: (event: DepartmentEvent) => void;
}

interface VideoPlaylistItem {
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

export const DepartmentVideoTheater: React.FC<DepartmentVideoTheaterProps> = ({
  events,
  onSelectEvent,
  onOpenRegister,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  const playlist: VideoPlaylistItem[] = [
    {
      id: 'symposium-main-trailer',
      title: 'Departmental Symposium & Theme Showcase',
      subtitle: 'Official 4K Cinematic Overview of DATA DIVE 5.0 Events',
      badge: 'Featured Video',
      category: 'Department Overview',
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

  const currentVideo = playlist[activeVideoIndex] || playlist[0];

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
    <section
      className="relative my-12 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80 p-6 sm:p-8 shadow-2xl backdrop-blur-xl"
      id="department-video-theater-section"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-indigo-300">
            <Tv className="w-3.5 h-3.5 text-indigo-400" />
            <span>Official Video &amp; Trailer Hub</span>
          </div>
          <h3 className="font-epic text-2xl sm:text-3xl font-extrabold text-white mt-1.5">
            Departmental Video &amp; Trailer Showcase
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 font-serif-cormorant italic mt-0.5">
            Watch technical challenge overviews, startup pitch trailers, and event briefings.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 bg-slate-900/90 px-3.5 py-2 rounded-xl border border-slate-800 self-start sm:self-auto">
          <Film className="w-4 h-4 text-indigo-400" />
          <span>Playing {activeVideoIndex + 1} of {playlist.length} Videos</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main Widescreen Video Player (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="group relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-slate-700/80 bg-black shadow-2xl">
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
                className="w-full h-full object-cover"
              />
            )}

            {/* Custom Control Overlay for MP4 Videos */}
            {!currentVideo.isYouTube && (
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 rounded-xl bg-slate-950/85 p-2 backdrop-blur-md border border-white/10 opacity-90 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 font-bold transition-all"
                    title={isPlaying ? 'Pause video' : 'Play video'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                  </button>

                  <button
                    type="button"
                    onClick={toggleMute}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 text-xs font-semibold text-slate-200 hover:text-white"
                  >
                    {isMuted ? <VolumeX className="w-3.5 h-3.5 text-slate-400" /> : <Volume2 className="w-3.5 h-3.5 text-indigo-400" />}
                    <span>{isMuted ? 'Muted' : 'Audio On'}</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleFullscreen}
                  className="p-2 rounded-lg border border-slate-700 bg-slate-900 text-slate-300 hover:text-white"
                  title="Fullscreen"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Active Video Meta Strip */}
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-[10px] font-bold uppercase tracking-wider">
                  {currentVideo.badge}
                </span>
                <span className="text-xs text-slate-400">{currentVideo.category}</span>
              </div>
              <h4 className="font-epic text-lg font-bold text-white">
                {currentVideo.title}
              </h4>
              <p className="font-serif-cormorant text-sm italic text-slate-300">
                {currentVideo.subtitle}
              </p>
            </div>

            {currentVideo.eventRef && (
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => onSelectEvent(currentVideo.eventRef!)}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-lg"
                >
                  <span>Event Details</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Video Playlist Selector (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Film className="w-3.5 h-3.5 text-indigo-400" />
            <span>Select Event Video Reel:</span>
          </h4>

          <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
            {playlist.map((item, idx) => {
              const isSelected = idx === activeVideoIndex;

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveVideoIndex(idx)}
                  className={`group relative flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-950/40 shadow-[0_0_20px_rgba(99,102,241,0.25)]'
                      : 'border-slate-800/80 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl bg-black border border-slate-700/60">
                    <img
                      src={item.poster}
                      alt={item.title}
                      className="h-full w-full object-cover brightness-90 group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-full ${
                          isSelected ? 'bg-indigo-500 text-white' : 'bg-white/80 text-black'
                        }`}
                      >
                        <Play className="w-3 h-3 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 block truncate">
                      {item.badge}
                    </span>
                    <h5 className="font-epic text-xs font-bold text-white truncate group-hover:text-indigo-300">
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
    </section>
  );
};
