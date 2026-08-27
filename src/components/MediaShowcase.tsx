import React, { useState } from 'react';
import { Play, Film, Image as ImageIcon, X, Sparkles, Eye, Camera, Maximize2 } from 'lucide-react';
import { DepartmentEvent } from '../types';
import { ODYSSEY_FILM_STILLS, OdysseyFilmStill } from '../data/filmStills';

interface MediaShowcaseProps {
  events: DepartmentEvent[];
  onSelectEvent: (event: DepartmentEvent) => void;
}

export const MediaShowcase: React.FC<MediaShowcaseProps> = ({ events, onSelectEvent }) => {
  const [selectedVideo, setSelectedVideo] = useState<{ title: string; url: string; subtitle: string } | null>(null);
  const [selectedStill, setSelectedStill] = useState<OdysseyFilmStill | null>(null);
  const [activeTab, setActiveTab] = useState<'film-stills' | 'video-reels'>('film-stills');
  const [stillsFilter, setStillsFilter] = useState<string>('All');

  const categories = ['All', 'Teaser & Posters', 'Characters', 'Production & Sets', 'Landscapes & Sea'];

  const filteredStills = stillsFilter === 'All'
    ? ODYSSEY_FILM_STILLS
    : ODYSSEY_FILM_STILLS.filter(s => s.category === stillsFilter);

  // Extract video reels
  const videoItems = events
    .filter(ev => Boolean(ev.videoTrailerUrl))
    .map(ev => ({
      title: ev.title,
      subtitle: ev.subtitle,
      url: ev.videoTrailerUrl!,
      poster: ev.heroImage,
      badge: ev.badge,
      event: ev,
    }));

  return (
    <div className="py-10" id="odyssey-media-showcase-section">
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-amber-500/20 pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-400 font-bold flex items-center gap-1.5 mb-1.5">
            <Film className="w-3.5 h-3.5" />
            <span>The Odyssey (2026) Cinema Archive & Reels</span>
          </span>
          <h3 className="font-epic text-2xl sm:text-3xl font-bold text-slate-100">
            Real Film Stills & Cinematic Chronicles
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mt-2 font-sans">
            Authentic production photography, 70mm anamorphic stills, teaser frames, and high-definition video archives from the epic adaptation.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-900/90 border border-amber-500/30 backdrop-blur-md self-start md:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('film-stills')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
              activeTab === 'film-stills'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Film Stills ({ODYSSEY_FILM_STILLS.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('video-reels')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
              activeTab === 'video-reels'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>Video Reels ({videoItems.length})</span>
          </button>
        </div>
      </div>

      {/* Film Stills Tab */}
      {activeTab === 'film-stills' && (
        <div className="space-y-6">
          {/* Subcategory Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setStillsFilter(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  stillsFilter === cat
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'bg-slate-900/80 border border-amber-500/20 text-slate-300 hover:border-amber-400/50 hover:text-amber-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Stills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredStills.map((still) => (
              <div
                key={still.id}
                onClick={() => setSelectedStill(still)}
                className="group relative aspect-[16/10] rounded-2xl overflow-hidden border border-amber-500/25 bg-slate-950 shadow-xl cursor-pointer hover:border-amber-400 transition-all hover:shadow-[0_0_25px_rgba(212,175,55,0.25)]"
              >
                <img
                  src={still.imageUrl}
                  alt={still.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

                {/* Top Badge: Category & Resolution */}
                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md border border-amber-500/30 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                    {still.category}
                  </span>
                  <span className="p-1 rounded-md bg-black/60 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </span>
                </div>

                {/* Bottom Details */}
                <div className="absolute bottom-2.5 left-3 right-3 space-y-0.5">
                  <h4 className="font-epic text-sm font-bold text-slate-100 group-hover:text-amber-300 transition-colors line-clamp-1">
                    {still.title}
                  </h4>
                  <p className="text-[11px] text-amber-200/80 font-serif-cormorant italic line-clamp-1">
                    {still.characterOrScene}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Video Reels Tab */}
      {activeTab === 'video-reels' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {videoItems.map((item, idx) => (
            <div
              key={idx}
              className="group relative aspect-video rounded-2xl overflow-hidden border border-amber-500/20 bg-slate-950 shadow-xl cursor-pointer hover:border-amber-400 transition-all"
              onClick={() => {
                setSelectedVideo({
                  title: item.title,
                  subtitle: item.subtitle,
                  url: item.url,
                });
              }}
            >
              <img
                src={item.poster}
                alt={item.title}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* Play Badge */}
              <div className="absolute top-3 right-3">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-lg">
                  <Play className="w-3 h-3 fill-current" />
                  <span>Play Reel</span>
                </span>
              </div>

              {/* Title Overlay */}
              <div className="absolute bottom-3 left-3 right-3">
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block mb-0.5">
                  {item.badge}
                </span>
                <h4 className="font-epic text-sm font-bold text-slate-100 group-hover:text-amber-300 transition-colors line-clamp-1">
                  {item.title}
                </h4>
                <p className="font-serif-cormorant text-xs italic text-slate-300 line-clamp-1 mt-0.5">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* High-Res Film Still Lightbox Modal */}
      {selectedStill && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/95 backdrop-blur-2xl animate-fade-in"
          onClick={() => setSelectedStill(null)}
        >
          <div 
            className="relative w-full max-w-5xl rounded-2xl overflow-hidden border border-amber-500/40 bg-slate-950 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-slate-900/90 border-b border-amber-500/20">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                    {selectedStill.category}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {selectedStill.resolution}
                  </span>
                </div>
                <h3 className="font-epic text-lg sm:text-xl font-bold text-slate-100">
                  {selectedStill.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedStill(null)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Image Frame */}
            <div className="relative aspect-[16/9] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={selectedStill.imageUrl}
                alt={selectedStill.title}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Modal Footer / Description */}
            <div className="px-6 py-4 bg-slate-900/95 border-t border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1 max-w-2xl">
                <p className="text-xs uppercase tracking-wider font-bold text-amber-300">
                  {selectedStill.characterOrScene}
                </p>
                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                  {selectedStill.caption}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <a
                  href={selectedStill.imageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Full Frame</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Modal Player */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-fade-in"
          onClick={() => setSelectedVideo(null)}
        >
          <div 
            className="relative w-full max-w-4xl rounded-2xl overflow-hidden border border-amber-500/30 bg-slate-950 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-amber-500/20">
              <div>
                <h4 className="font-epic text-sm font-bold text-slate-100">{selectedVideo.title}</h4>
                <p className="text-xs text-amber-300/80 italic">{selectedVideo.subtitle}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedVideo(null)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video bg-black">
              <video
                src={selectedVideo.url}
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
