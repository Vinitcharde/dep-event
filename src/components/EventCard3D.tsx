import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  QrCode,
  Play,
  ChevronRight,
  Compass,
  Trophy,
  Zap,
  Globe,
  Wifi,
} from 'lucide-react';
import { DepartmentEvent } from '../types';
import { QRCodeSVG } from 'qrcode.react';

interface EventCard3DProps {
  event: DepartmentEvent;
  onSelect: (event: DepartmentEvent) => void;
}

/* ── Category colour palette ─────────────────────────────────── */
const CATEGORY_STYLES: Record<string, { pill: string; glow: string; accent: string }> = {
  'Data Science & Machine Learning': {
    pill: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
    glow: 'rgba(6,182,212,0.18)',
    accent: '#06b6d4',
  },
  'Entrepreneurship & Innovation': {
    pill: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    glow: 'rgba(16,185,129,0.18)',
    accent: '#10b981',
  },
  'Sports & Gaming Strategy': {
    pill: 'bg-violet-500/15 text-violet-300 border-violet-500/30',
    glow: 'rgba(139,92,246,0.18)',
    accent: '#8b5cf6',
  },
  'VFX & Technology': {
    pill: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
    glow: 'rgba(244,63,94,0.18)',
    accent: '#f43f5e',
  },
  'Keynote Gala': {
    pill: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    glow: 'rgba(245,158,11,0.22)',
    accent: '#f59e0b',
  },
};

const fallbackStyle = {
  pill: 'bg-slate-500/15 text-slate-300 border-slate-500/30',
  glow: 'rgba(100,116,139,0.18)',
  accent: '#94a3b8',
};

/* ── Extract prize info from perks ───────────────────────────── */
function extractPrize(perks: string[]): string | null {
  const prizeLine = perks.find(
    (p) => p.toLowerCase().includes('prize') || p.toLowerCase().includes('₹') || p.toLowerCase().includes('$')
  );
  if (!prizeLine) return null;
  // grab the first monetary mention
  const match = prizeLine.match(/(₹[\d,]+|[$][\d,]+|\d[\d,]*\s*(?:Crore|crore|lakh|Lakh))/);
  return match ? match[0] : null;
}

export const EventCard3D: React.FC<EventCard3DProps> = ({ event, onSelect }) => {
  const [showQuickQR, setShowQuickQR] = useState(false);

  const catStyle = CATEGORY_STYLES[event.category] ?? fallbackStyle;
  const prize = extractPrize(event.registration.perks);
  const isDateConfirmed = !event.date.toLowerCase().includes('announce');

  return (
    <div
      id={`event-card-${event.id}`}
      className="group relative"
      style={{ perspective: '1200px' }}
    >
      {/* ── Card shell ─────────────────────────────────────────── */}
      <div
        className="relative flex h-full flex-col rounded-2xl border border-slate-700/60 bg-[#0a101f] shadow-2xl transition-all duration-300
          hover:-translate-y-1.5 hover:shadow-[0_24px_48px_rgba(0,0,0,0.4)] hover:border-slate-600/80"
        style={{
          boxShadow: `0 0 0 1px rgba(255,255,255,0.04), 0 12px 32px rgba(0,0,0,0.32)`,
        }}
      >
        {/* ── Top accent line matching category colour ────────── */}
        <div
          className="h-[3px] w-full rounded-t-2xl"
          style={{ background: `linear-gradient(90deg, ${catStyle.accent}cc, ${catStyle.accent}22)` }}
        />

        <div className="flex flex-col flex-1 p-4 pt-3 gap-0">

          {/* ── Row 1: milestone + category pill ───────────────── */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-amber-400">
              <Compass className="h-3 w-3 shrink-0" />
              {event.voyageMilestone.split(':')[0]}
            </span>
            <span
              className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider shrink-0 ${catStyle.pill}`}
            >
              {event.category}
            </span>
          </div>

          {/* ── Hero image ─────────────────────────────────────── */}
          <div className="group/media relative mb-4 aspect-video w-full overflow-hidden rounded-xl bg-slate-950">
            <img
              src={event.heroImage}
              alt={event.title}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
            />

            {/* image gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#04060e]/80 via-[#04060e]/10 to-transparent" />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `radial-gradient(ellipse at 50% 0%, ${catStyle.glow}, transparent 70%)`,
              }}
            />

            {/* Trailer button */}
            {event.videoTrailerUrl && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onSelect(event); }}
                className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-lg border border-white/20 bg-black/75 px-2.5 py-1.5
                  text-[11px] font-semibold text-white transition-all hover:bg-amber-500 hover:text-black hover:border-amber-400 backdrop-blur-sm"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Trailer Reel</span>
              </button>
            )}

            {/* Hybrid / Virtual badge */}
            {event.venue.isVirtual && (
              <span className="absolute bottom-3 right-12 inline-flex items-center gap-1 rounded-md border border-sky-400/30 bg-sky-900/60 px-2 py-1 text-[10px] font-semibold text-sky-300 backdrop-blur-sm">
                <Wifi className="w-3 h-3" /> Live Stream
              </span>
            )}

            {/* QR button */}
            <div className="absolute top-3 right-3">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setShowQuickQR(!showQuickQR); }}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-black/70 text-amber-300
                  transition-all hover:bg-amber-500 hover:text-black backdrop-blur-sm"
                title="View Instant Event QR Code"
                aria-label="View QR Code"
              >
                <QrCode className="w-3.5 h-3.5" />
              </button>

              {showQuickQR && (
                <div
                  className="absolute right-0 top-10 z-30 flex min-w-[180px] flex-col items-center gap-2.5 rounded-xl border border-slate-700 bg-slate-950/95 p-4 shadow-2xl backdrop-blur-md"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="bg-white p-2.5 rounded-lg shadow">
                    <QRCodeSVG value={event.registration.qrValue} size={120} level="M" includeMargin={false} />
                  </div>
                  <span className="text-[11px] text-center text-amber-200/90 font-medium">Scan for Direct Pass</span>
                  <button
                    type="button"
                    onClick={() => setShowQuickQR(false)}
                    className="text-[10px] text-slate-400 hover:text-white underline"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>

            {/* Prize ribbon in top-left corner */}
            {prize && (
              <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-md border border-amber-400/30 bg-amber-900/60 px-2 py-1 text-[10px] font-bold text-amber-300 backdrop-blur-sm">
                <Trophy className="w-3 h-3" /> {prize}
              </span>
            )}
          </div>

          {/* ── Badge pill ─────────────────────────────────────── */}
          <span className="inline-flex self-start items-center gap-1 mb-2 rounded-md bg-slate-800/60 border border-slate-700/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
            <Zap className="w-2.5 h-2.5 text-amber-400" />
            {event.badge}
          </span>

          {/* ── Title & subtitle ───────────────────────────────── */}
          <h3
            className="font-epic text-base font-bold leading-snug text-slate-100 transition-colors group-hover:text-amber-300 line-clamp-2"
          >
            {event.title}
          </h3>
          <p className="mt-1 font-serif-cormorant text-[13px] italic leading-snug text-slate-400 line-clamp-2">
            {event.subtitle}
          </p>

          {/* ── Divider ────────────────────────────────────────── */}
          <div className="my-3 h-px bg-gradient-to-r from-transparent via-slate-700/60 to-transparent" />

          {/* ── Meta grid ──────────────────────────────────────── */}
          <div className="grid grid-cols-1 gap-1.5 text-[11px] text-slate-300">
            <div className="flex items-center gap-2">
              <Calendar
                className="w-3.5 h-3.5 shrink-0"
                style={{ color: isDateConfirmed ? catStyle.accent : '#f59e0b' }}
              />
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

          {/* ── Divider ────────────────────────────────────────── */}
          <div className="my-3 h-px bg-gradient-to-r from-transparent via-slate-700/60 to-transparent" />

          {/* ── Speakers row ───────────────────────────────────── */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {event.speakers.slice(0, 3).map((sp, idx) => (
                  <img
                    key={idx}
                    src={sp.avatar}
                    alt={sp.name}
                    title={`${sp.name} — ${sp.role}`}
                    className="h-7 w-7 rounded-full border-2 border-[#0a101f] object-cover ring-1"
                    style={{ ringColor: catStyle.accent + '55' }}
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

          {/* ── CTA buttons ────────────────────────────────────── */}
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              id={`btn-details-${event.id}`}
              onClick={() => onSelect(event)}
              className="flex flex-1 min-h-10 items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/50
                px-3 py-2 text-[11px] font-semibold text-slate-300 transition-all
                hover:border-amber-400/60 hover:bg-amber-500/10 hover:text-amber-200"
            >
              <span>Dossier & Agenda</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>{/* end inner padding */}
      </div>
    </div>
  );
};
