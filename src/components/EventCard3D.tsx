import React from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  Compass,
  Trophy,
  Zap,
  Globe,
  Share2,
} from 'lucide-react';
import { DepartmentEvent } from '../types';

interface EventCard3DProps {
  event: DepartmentEvent;
  onSelect: (event: DepartmentEvent) => void;
  onShare?: (event: DepartmentEvent) => void;
}

/* ── Category colour palette ─────────────────────────────────── */
const CATEGORY_STYLES: Record<string, { pill: string; glow: string; accent: string; border: string }> = {
  'Data Science & Machine Learning': {
    pill: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
    glow: 'rgba(6,182,212,0.25)',
    accent: '#00f0ff',
    border: 'hover:border-cyan-400/80',
  },
  'Entrepreneurship & Innovation': {
    pill: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    glow: 'rgba(245,158,11,0.25)',
    accent: '#f59e0b',
    border: 'hover:border-amber-400/80',
  },
  'Sports & Gaming Strategy': {
    pill: 'bg-violet-500/15 text-violet-300 border-violet-500/30',
    glow: 'rgba(168,85,247,0.25)',
    accent: '#a855f7',
    border: 'hover:border-violet-400/80',
  },
  'Cinema & Production': {
    pill: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
    glow: 'rgba(56,189,248,0.25)',
    accent: '#38bdf8',
    border: 'hover:border-sky-400/80',
  },
  'Keynote Gala': {
    pill: 'bg-yellow-500/15 text-yellow-300 border-yellow-500/30',
    glow: 'rgba(255,215,0,0.28)',
    accent: '#ffd700',
    border: 'hover:border-yellow-400/80',
  },
};

const fallbackStyle = {
  pill: 'bg-slate-500/15 text-slate-300 border-slate-500/30',
  glow: 'rgba(100,116,139,0.2)',
  accent: '#94a3b8',
  border: 'hover:border-slate-400',
};

function extractPrize(perks: string[]): string | null {
  const prizeLine = perks.find(
    (p) => p.toLowerCase().includes('prize') || p.toLowerCase().includes('₹') || p.toLowerCase().includes('$')
  );
  if (!prizeLine) return null;
  const match = prizeLine.match(/(₹[\d,]+|[$][\d,]+|\d[\d,]*\s*(?:Crore|crore|lakh|Lakh))/);
  return match ? match[0] : null;
}

export const EventCard3D: React.FC<EventCard3DProps> = ({ event, onSelect, onShare }) => {
  const catStyle = CATEGORY_STYLES[event.category] ?? fallbackStyle;
  const prize = extractPrize(event.registration.perks);
  const isDateConfirmed = !event.date.toLowerCase().includes('announce');

  return (
    <div
      id={`event-card-${event.id}`}
      className="group relative h-full"
      style={{ perspective: '1200px' }}
    >
      {/* ── Card Shell ─────────────────────────────────────────── */}
      <div
        className={`relative flex h-full flex-col rounded-3xl border border-slate-700/60 bg-[#070d1d] shadow-2xl transition-all duration-300
          hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(0,0,0,0.6)] ${catStyle.border}`}
        style={{
          boxShadow: `0 0 0 1px rgba(255,255,255,0.05), 0 16px 36px rgba(0,0,0,0.45)`,
        }}
      >
        {/* Top accent line matching category color */}
        <div
          className="h-1 w-full rounded-t-3xl"
          style={{ background: `linear-gradient(90deg, ${catStyle.accent}, ${catStyle.accent}22)` }}
        />

        <div className="flex flex-col flex-1 p-5 gap-0">
          {/* Row 1: milestone + category pill */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-indigo-400">
              <Compass className="h-3.5 w-3.5 shrink-0" />
              {event.voyageMilestone.split(':')[0]}
            </span>
            <span
              className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider shrink-0 ${catStyle.pill}`}
            >
              {event.category}
            </span>
          </div>

          {/* Hero image (Clean: no overlay buttons) */}
          <div
            onClick={() => onSelect(event)}
            className="group/media relative mb-4 aspect-video w-full overflow-hidden rounded-2xl bg-slate-950 cursor-pointer"
          >
            <img
              src={event.heroImage}
              alt={event.title}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
            />

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#04060e]/80 via-transparent to-transparent" />

            {/* Prize ribbon */}
            {prize && (
              <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-lg border border-amber-400/40 bg-amber-950/80 px-2.5 py-1 text-[10px] font-black text-amber-300 backdrop-blur-md shadow-lg">
                <Trophy className="w-3 h-3 text-amber-400" /> {prize}
              </span>
            )}
          </div>

          {/* Badge pill */}
          <span className="inline-flex self-start items-center gap-1 mb-2 rounded-md bg-slate-800/80 border border-slate-700/60 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-300">
            <Zap className="w-2.5 h-2.5 text-amber-400" />
            {event.badge}
          </span>

          {/* Title & subtitle */}
          <h3 className="font-epic text-base font-bold leading-snug text-white transition-colors group-hover:text-indigo-300 line-clamp-2">
            {event.title}
          </h3>
          <p className="mt-1 font-serif-cormorant text-[13px] italic leading-snug text-slate-400 line-clamp-2">
            {event.subtitle}
          </p>

          {/* Divider */}
          <div className="my-3 h-px bg-gradient-to-r from-transparent via-slate-700/60 to-transparent" />

          {/* Meta grid */}
          <div className="grid grid-cols-1 gap-1.5 text-[11px] text-slate-300">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 shrink-0" style={{ color: catStyle.accent }} />
              <span className={isDateConfirmed ? '' : 'text-amber-300/80 italic'}>
                {event.date}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 shrink-0 text-slate-400" />
              <span className={event.time.toLowerCase().includes('announce') ? 'text-amber-300/80 italic' : ''}>
                {event.time}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-slate-400" />
              <span className="line-clamp-1 text-slate-300">
                {event.venue.name} &bull; {event.venue.hall}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="my-3 h-px bg-gradient-to-r from-transparent via-slate-700/60 to-transparent" />

          {/* Speakers row */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {event.speakers.slice(0, 3).map((sp, idx) => (
                  <img
                    key={idx}
                    src={sp.avatar}
                    alt={sp.name}
                    title={`${sp.name} — ${sp.role}`}
                    className="h-7 w-7 rounded-full border-2 border-[#070d1d] object-cover ring-1 ring-indigo-400/40"
                  />
                ))}
              </div>
              <span className="text-[11px] text-slate-400 line-clamp-1">
                {event.speakers.length === 1
                  ? event.speakers[0].name
                  : `${event.speakers[0].name.split(' ')[0]} & Guests`}
              </span>
            </div>
            {event.venue.isVirtual && (
              <Globe className="w-3.5 h-3.5 text-sky-400 shrink-0" title="Hybrid / Online access available" />
            )}
          </div>

          {/* CTA buttons */}
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              id={`btn-details-${event.id}`}
              onClick={() => onSelect(event)}
              className="flex flex-1 min-h-10 items-center justify-center gap-1.5 rounded-xl border border-indigo-500/30 bg-indigo-600/20
                px-3 py-2 text-[11px] font-bold text-white transition-all
                hover:border-indigo-400 hover:bg-indigo-600 shadow-md active:scale-95"
            >
              <span>Dossier &amp; Rules</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            {onShare && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onShare(event);
                }}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-800/60 text-slate-300 transition-all hover:border-indigo-400 hover:bg-indigo-600 hover:text-white active:scale-95 shrink-0"
                title={`Share ${event.title}`}
                aria-label={`Share ${event.title}`}
              >
                <Share2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
