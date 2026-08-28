import React, { useState } from 'react';
import {
  Sparkles,
  Compass,
  ArrowRight,
  Tv,
  Share2,
  Cpu,
  TrendingUp,
  Trophy,
  Award,
  Gamepad2,
  Layers,
  RotateCcw,
} from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onOpenCinema: () => void;
  onOpenShare?: () => void;
  totalEvents: number;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onOpenCinema,
  onOpenShare,
  totalEvents,
}) => {
  const [animationKey, setAnimationKey] = useState(0);

  const wordSequence = [
    {
      word: 'DATA',
      delay: 0.1,
      style: {
        color: '#ffffff',
        textShadow: '0 0 20px rgba(255, 255, 255, 0.6), 0 0 40px rgba(99, 102, 241, 0.4)',
      },
    },
    {
      word: 'DIVE',
      delay: 0.7,
      style: {
        color: 'transparent',
        WebkitTextStroke: '2.5px #818cf8',
        filter: 'drop-shadow(0 0 16px rgba(129, 140, 248, 0.8))',
      },
    },
    {
      word: '5.0',
      delay: 1.35,
      style: {
        color: '#fbbf24',
        textShadow: '0 0 24px rgba(251, 191, 36, 0.85), 0 0 50px rgba(245, 158, 11, 0.5)',
      },
    },
  ];

  const handleReplayAnimation = () => {
    setAnimationKey((prev) => prev + 1);
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#090d16] via-[#0b101d] to-[#040711] border-b border-slate-800/80 pt-16 pb-16"
      id="hero-departmental-section"
    >
      {/* Subtle modern ambient background glow (no video) */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-gradient-to-b from-indigo-500/15 via-sky-500/8 to-transparent blur-[120px]" />
      <div className="pointer-events-none absolute -top-20 right-10 w-96 h-96 bg-cyan-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute top-40 left-10 w-96 h-96 bg-purple-500/10 blur-[100px]" />

      {/* Main Hero Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 text-center space-y-6">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/40 bg-indigo-500/10 px-4 py-1.5 shadow-[0_0_20px_rgba(99,102,241,0.15)]">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-300">
            Annual Departmental Symposium &bull; {totalEvents} Flagship Competitions
          </span>
        </div>

        {/* ── Main DATA DIVE 5.0 Animated Word-by-Word Reveal Heading ── */}
        <div className="space-y-4 py-2">
          <h1
            key={animationKey}
            className="flex items-center justify-center gap-4 sm:gap-7 flex-wrap my-2 cursor-pointer group"
            onClick={handleReplayAnimation}
            title="Click to replay word animation"
          >
            {wordSequence.map(({ word, delay, style }) => (
              <span
                key={word}
                className="animated-datadive-word"
                style={
                  {
                    '--delay': `${delay}s`,
                    ...style,
                  } as React.CSSProperties
                }
              >
                {word}
              </span>
            ))}
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            Flagship technical competitions in Python &amp; Machine Learning, Power BI business intelligence dashboards, fast-paced Shark Tank startup pitches, live ₹80 Crore IPL Auction, and the WWE 2K26 Survival Showdown.
          </p>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
          <button
            type="button"
            onClick={onExploreClick}
            className="flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all hover:scale-105 active:scale-95"
          >
            <Layers className="w-4 h-4" />
            <span>Explore 3D Event Deck</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onOpenCinema}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl border border-slate-700 bg-slate-900/90 text-slate-200 font-bold text-xs uppercase tracking-wider hover:border-indigo-400 hover:text-white transition-all shadow-lg active:scale-95"
          >
            <Tv className="w-4 h-4 text-indigo-400" />
            <span>Watch Event Trailers</span>
          </button>
        </div>

        {/* Key Event Badges Grid — All 5 Flagship Events */}
        <div className="pt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 max-w-5xl mx-auto text-left">
          <div className="p-3.5 rounded-2xl border border-cyan-500/20 bg-slate-900/60 backdrop-blur-md">
            <Cpu className="w-5 h-5 text-cyan-400 mb-1.5" />
            <span className="text-xs font-bold text-white block">DataVerse</span>
            <span className="text-[11px] text-slate-400">Python &amp; ML Arena</span>
          </div>

          <div className="p-3.5 rounded-2xl border border-emerald-500/20 bg-slate-900/60 backdrop-blur-md">
            <TrendingUp className="w-5 h-5 text-emerald-400 mb-1.5" />
            <span className="text-xs font-bold text-white block">VizMinds</span>
            <span className="text-[11px] text-slate-400">Power BI Dashboards</span>
          </div>

          <div className="p-3.5 rounded-2xl border border-amber-500/20 bg-slate-900/60 backdrop-blur-md">
            <Award className="w-5 h-5 text-amber-400 mb-1.5" />
            <span className="text-xs font-bold text-white block">Founders Gone Wild</span>
            <span className="text-[11px] text-slate-400">Shark Tank Pitches</span>
          </div>

          <div className="p-3.5 rounded-2xl border border-purple-500/20 bg-slate-900/60 backdrop-blur-md">
            <Trophy className="w-5 h-5 text-purple-400 mb-1.5" />
            <span className="text-xs font-bold text-white block">Game of Bids 2026</span>
            <span className="text-[11px] text-slate-400">₹80Cr IPL Auction</span>
          </div>

          <div className="p-3.5 rounded-2xl border border-rose-500/20 bg-slate-900/60 backdrop-blur-md col-span-2 sm:col-span-1">
            <Gamepad2 className="w-5 h-5 text-rose-400 mb-1.5" />
            <span className="text-xs font-bold text-white block">Survival Showdown</span>
            <span className="text-[11px] text-slate-400">WWE 2K26 Knockout</span>
          </div>
        </div>
      </div>
    </section>
  );
};
