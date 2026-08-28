import React, { useState, useRef } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Trophy,
  Zap,
  Share2,
  Compass,
  ArrowRight,
} from 'lucide-react';
import { DepartmentEvent } from '../types';

interface SpatialDeck3DProps {
  events: DepartmentEvent[];
  onSelectEvent: (event: DepartmentEvent) => void;
  onOpenRegister: (event: DepartmentEvent) => void;
  onShareEvent?: (event: DepartmentEvent) => void;
}

const CATEGORY_STYLES: Record<
  string,
  { pill: string; glow: string; accent: string; border: string; bg: string }
> = {
  'Data Science & Machine Learning': {
    pill: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
    glow: 'rgba(6,182,212,0.3)',
    accent: '#00f0ff',
    border: 'border-cyan-500/40',
    bg: 'from-cyan-950/40 via-slate-900/90 to-slate-950',
  },
  'Entrepreneurship & Innovation': {
    pill: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    glow: 'rgba(245,158,11,0.3)',
    accent: '#f59e0b',
    border: 'border-amber-500/40',
    bg: 'from-amber-950/40 via-slate-900/90 to-slate-950',
  },
  'Sports & Gaming Strategy': {
    pill: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
    glow: 'rgba(168,85,247,0.3)',
    accent: '#a855f7',
    border: 'border-purple-500/40',
    bg: 'from-purple-950/40 via-slate-900/90 to-slate-950',
  },
  'Cinema & Production': {
    pill: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
    glow: 'rgba(56,189,248,0.3)',
    accent: '#38bdf8',
    border: 'border-sky-500/40',
    bg: 'from-sky-950/40 via-slate-900/90 to-slate-950',
  },
  'Keynote Gala': {
    pill: 'bg-amber-400/15 text-amber-200 border-amber-400/30',
    glow: 'rgba(251,191,36,0.35)',
    accent: '#fbbf24',
    border: 'border-amber-400/40',
    bg: 'from-amber-950/40 via-slate-900/90 to-slate-950',
  },
};

const defaultCatStyle = {
  pill: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
  glow: 'rgba(59,130,246,0.3)',
  accent: '#3b82f6',
  border: 'border-blue-500/40',
  bg: 'from-blue-950/40 via-slate-900/90 to-slate-950',
};

function extractPrize(perks: string[]): string | null {
  const prizeLine = perks.find(
    (p) => p.toLowerCase().includes('prize') || p.toLowerCase().includes('₹') || p.toLowerCase().includes('$')
  );
  if (!prizeLine) return null;
  const match = prizeLine.match(/(₹[\d,]+|[$][\d,]+|\d[\d,]*\s*(?:Crore|crore|lakh|Lakh))/);
  return match ? match[0] : null;
}

export const SpatialDeck3D: React.FC<SpatialDeck3DProps> = ({
  events,
  onSelectEvent,
  onOpenRegister,
  onShareEvent,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });

  if (events.length === 0) return null;

  const currentEvent = events[activeIndex] || events[0];
  const catStyle = CATEGORY_STYLES[currentEvent.category] || defaultCatStyle;
  const prize = extractPrize(currentEvent.registration.perks);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : events.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < events.length - 1 ? prev + 1 : 0));
  };

  // Interactive 3D tilt calculation on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTilt({ rotateX, rotateY, glareX, glareY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  };

  return (
    <div className="relative py-8 my-4" id="spatial-deck-3d-root">
      {/* 3D Arc Navigator Indicators */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
            Interactive 3D Event Deck
          </span>
          <span className="text-xs text-slate-500 font-mono">
            ({activeIndex + 1} / {events.length})
          </span>
        </div>

        <div className="flex items-center gap-2">
          {events.map((ev, idx) => (
            <button
              key={ev.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === activeIndex
                  ? 'w-8 bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.6)]'
                  : 'w-2 bg-slate-700 hover:bg-slate-500'
              }`}
              title={ev.title}
              aria-label={`Go to event ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Main 3D Stage Viewport */}
      <div className="relative w-full max-w-5xl mx-auto" style={{ perspective: '1600px' }}>
        {/* Navigation Arrow Left */}
        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-0 sm:-left-6 top-1/2 -translate-y-1/2 z-30 flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-700/80 bg-slate-900/90 text-slate-200 shadow-2xl backdrop-blur-xl transition-all hover:bg-indigo-600 hover:text-white hover:border-indigo-400 hover:scale-110 active:scale-95"
          aria-label="Previous Event"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        {/* Navigation Arrow Right */}
        <button
          type="button"
          onClick={handleNext}
          className="absolute right-0 sm:-right-6 top-1/2 -translate-y-1/2 z-30 flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-700/80 bg-slate-900/90 text-slate-200 shadow-2xl backdrop-blur-xl transition-all hover:bg-indigo-600 hover:text-white hover:border-indigo-400 hover:scale-110 active:scale-95"
          aria-label="Next Event"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Main 3D Card Shell */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
            transition: 'transform 0.15s ease-out',
            transformStyle: 'preserve-3d',
          }}
          className={`relative overflow-hidden rounded-3xl border ${catStyle.border} bg-gradient-to-br ${catStyle.bg} p-6 sm:p-8 shadow-[0_30px_90px_rgba(0,0,0,0.7)] backdrop-blur-2xl`}
        >
          {/* Dynamic Specular Glare Layer */}
          <div
            className="pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.18) 0%, transparent 60%)`,
            }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Event Visual (Clean: 2 overlay buttons removed) */}
            <div className="lg:col-span-5 space-y-4">
              <div
                onClick={() => onSelectEvent(currentEvent)}
                className="cursor-pointer group relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-slate-950 border border-slate-700/60 shadow-2xl"
              >
                <img
                  src={currentEvent.heroImage}
                  alt={currentEvent.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/15 to-transparent" />

                {/* Prize Ribbon */}
                {prize && (
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/90 text-slate-950 font-black text-xs shadow-lg backdrop-blur-md">
                    <Trophy className="w-3.5 h-3.5" />
                    <span>{prize}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Event Content & Action */}
            <div className="lg:col-span-7 space-y-4">
              {/* Header Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-indigo-400">
                  <Compass className="w-3.5 h-3.5" />
                  {currentEvent.voyageMilestone.split(':')[0]}
                </span>
                <span
                  className={`inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${catStyle.pill}`}
                >
                  {currentEvent.category}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-slate-800/80 border border-slate-700 text-[10px] font-bold uppercase tracking-wider text-slate-300">
                  <Zap className="w-3 h-3 text-amber-400" />
                  {currentEvent.badge}
                </span>
              </div>

              {/* Event Title & Subtitle */}
              <div>
                <h3 className="font-epic text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  {currentEvent.title}
                </h3>
                <p className="mt-1.5 font-serif-cormorant text-base sm:text-lg italic text-slate-300">
                  {currentEvent.subtitle}
                </p>
              </div>

              {/* Event Meta Pills Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs">
                <div className="flex items-center gap-2.5 text-slate-300">
                  <Calendar className="w-4 h-4 text-indigo-400 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block font-semibold">Date</span>
                    <span className="font-semibold text-slate-200">{currentEvent.date}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 text-slate-300">
                  <Clock className="w-4 h-4 text-indigo-400 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block font-semibold">Time</span>
                    <span className="font-semibold text-slate-200">{currentEvent.time}</span>
                  </div>
                </div>

                <div className="sm:col-span-2 flex items-center gap-2.5 text-slate-300 pt-1 border-t border-slate-800/60">
                  <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block font-semibold">Venue</span>
                    <span className="font-semibold text-slate-200">
                      {currentEvent.venue.name} &bull; {currentEvent.venue.hall}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description preview */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
                {currentEvent.description}
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => onSelectEvent(currentEvent)}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(99,102,241,0.4)] hover:brightness-110 active:scale-95 transition-all"
                >
                  <span>Open Dossier &amp; Agenda</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {onShareEvent && (
                  <button
                    type="button"
                    onClick={() => onShareEvent(currentEvent)}
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-700 bg-slate-900/80 text-slate-300 hover:border-slate-500 hover:text-white transition-all active:scale-95"
                    title="Share Event"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
