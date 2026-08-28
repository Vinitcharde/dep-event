import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X, Calendar, Clock, MapPin, Users, QrCode, Play,
  ExternalLink, Sparkles, CheckCircle2,
  Share2, Compass, Globe, Download, Trophy, Target, Zap
} from 'lucide-react';
import { DepartmentEvent } from '../types';
import { QRCodeSVG } from 'qrcode.react';
import { ShareModal } from './ShareModal';

interface EventModalProps {
  event: DepartmentEvent | null;
  onClose: () => void;
  onOpenRegister: (event: DepartmentEvent) => void;
}

export const EventModal: React.FC<EventModalProps> = ({ event, onClose, onOpenRegister }) => {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'agenda' | 'speakers' | 'media'>('overview');

  if (!event) return null;

  const handleShare = () => {
    setIsShareOpen(true);
  };

  const generateICS = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//DATA DIVE 5.0 Departmental Events//EN
BEGIN:VEVENT
UID:${event.id}@datadive-events.edu
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${event.isoDate.replace(/[-:]/g, '').split('.')[0]}Z
SUMMARY:${event.title}
DESCRIPTION:${event.description.replace(/\n/g, '\\n')}
LOCATION:${event.venue.name} - ${event.venue.hall}, ${event.venue.address}
URL:${event.registration.url}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${event.id}-datadive-event.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative w-full max-w-5xl rounded-3xl border border-slate-700/80 bg-[#070b16] text-slate-100 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
          id="datadive-event-dossier-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-event-title"
        >
          {/* Top Bar Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                <Compass className="w-3.5 h-3.5 text-indigo-400" />
                {event.voyageMilestone}
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline">&bull; {event.category}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShare}
                className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:border-indigo-400 transition-colors"
                title="Share Event"
                aria-label="Share Event"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                id="btn-close-event-modal"
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:border-rose-400 hover:bg-rose-950/40 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Body (Scrollable) */}
          <div className="overflow-y-auto flex-1 p-6 space-y-6">
            {/* Hero Media / Video Reel Section */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-black aspect-[21/9] sm:aspect-[2.39/1] min-h-[220px]">
              {isPlayingVideo && event.videoTrailerUrl ? (
                <div className="relative w-full h-full bg-black">
                  {event.videoTrailerUrl.includes('youtube.com') || event.videoTrailerUrl.includes('youtu.be') ? (
                    <iframe
                      key={event.videoTrailerUrl}
                      src={event.videoTrailerUrl.replace(
                        /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/,
                        (_: string, id: string) => `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`
                      )}
                      allow="autoplay; encrypted-media; fullscreen"
                      allowFullScreen
                      style={{ width: '100%', height: '100%', border: 'none', background: '#000' }}
                      title={`${event.title} Video`}
                    />
                  ) : (
                    <video
                      key={event.videoTrailerUrl}
                      src={event.videoTrailerUrl}
                      controls
                      autoPlay
                      muted
                      playsInline
                      style={{ width: '100%', height: '100%', objectFit: 'cover', background: '#000' }}
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => setIsPlayingVideo(false)}
                    className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-black/80 text-xs font-semibold text-white border border-white/20 hover:bg-indigo-600"
                  >
                    Exit Video
                  </button>
                </div>
              ) : (
                <>
                  <img
                    src={event.heroImage}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070b16] via-black/40 to-transparent" />

                  {/* Floating Action within Hero */}
                  <div className="absolute bottom-4 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                      <div className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-indigo-500 text-white mb-2 shadow">
                        {event.badge}
                      </div>
                      <h2 id="modal-event-title" className="font-epic text-xl sm:text-3xl font-black text-white drop-shadow-md">
                        {event.title}
                      </h2>
                      <p className="font-serif-cormorant text-sm sm:text-lg italic text-slate-200 drop-shadow">
                        {event.subtitle}
                      </p>
                    </div>

                    {event.videoTrailerUrl && (
                      <button
                        type="button"
                        onClick={() => setIsPlayingVideo(true)}
                        className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider shadow-xl transition-transform hover:scale-105"
                      >
                        <Play className="w-4 h-4 fill-current" />
                        <span>Play Video Reel</span>
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* ── Cricket Theme Banner — Game of Bids 2026 only ── */}
            {event.id === 'game-of-bids-2026' && (
              <div className="relative overflow-hidden rounded-2xl border border-purple-500/30 bg-gradient-to-br from-[#0e0720] via-[#140b2a] to-[#081a10] p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600/20 border border-purple-500/40 text-xl">
                      🏏
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-purple-400">IPL Auction Simulation</p>
                      <h3 className="font-epic text-lg font-black text-white leading-tight">Game of Bids 2026</h3>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-300">
                    Live Auction Event
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="flex flex-col items-center justify-center rounded-xl border border-purple-500/20 bg-purple-900/20 p-3 text-center">
                    <span className="text-2xl font-black text-purple-300 font-epic">₹80Cr</span>
                    <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">Virtual Purse</span>
                  </div>
                  <div className="flex flex-col items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-900/20 p-3 text-center">
                    <span className="text-2xl font-black text-emerald-300 font-epic">100+</span>
                    <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">IPL Players</span>
                  </div>
                  <div className="flex flex-col items-center justify-center rounded-xl border border-amber-500/20 bg-amber-900/20 p-3 text-center">
                    <span className="text-2xl font-black text-amber-300 font-epic">2</span>
                    <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">Auction Rounds</span>
                  </div>
                  <div className="flex flex-col items-center justify-center rounded-xl border border-rose-500/20 bg-rose-900/20 p-3 text-center">
                    <Trophy className="w-5 h-5 text-rose-300 mb-0.5" />
                    <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">Best Franchise</span>
                  </div>
                </div>
              </div>
            )}

            {/* ── WWE 2K26 Theme Banner — Survival Showdown only ── */}
            {event.id === 'survival-showdown-2026' && (
              <div className="relative overflow-hidden rounded-2xl border border-rose-500/30 bg-gradient-to-br from-[#1a0812] via-[#200b18] to-[#0c0a1a] p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-600/20 border border-rose-500/40 text-xl">
                      🎮
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-400">WWE 2K26 Esports Championship</p>
                      <h3 className="font-epic text-lg font-black text-white leading-tight">Survival Showdown (Edition 2)</h3>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-amber-300">
                    Knockout Tournament
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="flex flex-col items-center justify-center rounded-xl border border-rose-500/20 bg-rose-900/20 p-3 text-center">
                    <span className="text-2xl font-black text-rose-300 font-epic">Top Dog</span>
                    <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">Champion Title</span>
                  </div>
                  <div className="flex flex-col items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-900/20 p-3 text-center">
                    <span className="text-2xl font-black text-cyan-300 font-epic">Triple Threat</span>
                    <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">Knockout Stage</span>
                  </div>
                  <div className="flex flex-col items-center justify-center rounded-xl border border-amber-500/20 bg-amber-900/20 p-3 text-center">
                    <span className="text-2xl font-black text-amber-300 font-epic">Tag Team</span>
                    <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">Grand Finals</span>
                  </div>
                  <div className="flex flex-col items-center justify-center rounded-xl border border-violet-500/20 bg-violet-900/20 p-3 text-center">
                    <span className="text-2xl font-black text-violet-300 font-epic">Solo / Duo</span>
                    <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">Entry Modes</span>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Meta Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs">
              <div className="space-y-1">
                <span className="text-slate-400 flex items-center gap-1.5 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-indigo-400" /> Date
                </span>
                <p className="font-semibold text-slate-200">{event.date}</p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5 text-indigo-400" /> Time
                </span>
                <p className="font-semibold text-slate-200">{event.time}</p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 flex items-center gap-1.5 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-indigo-400" /> Location
                </span>
                {event.venue.mapUrl ? (
                  <a
                    href={event.venue.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/map block hover:text-indigo-300 transition-colors"
                  >
                    <p className="font-semibold text-slate-200 truncate group-hover/map:text-indigo-300 flex items-center gap-1">
                      <span>{event.venue.name}</span>
                      <ExternalLink className="w-2.5 h-2.5 opacity-60 group-hover/map:opacity-100" />
                    </p>
                    <p className="text-[11px] text-indigo-300">{event.venue.hall}</p>
                  </a>
                ) : (
                  <>
                    <p className="font-semibold text-slate-200 truncate">{event.venue.name}</p>
                    <p className="text-[11px] text-indigo-300">{event.venue.hall}</p>
                  </>
                )}
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-slate-800 gap-2 sm:gap-6 overflow-x-auto text-xs sm:text-sm font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                className={`pb-3 px-1 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'overview'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
              >
                Overview &amp; Rules
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('agenda')}
                className={`pb-3 px-1 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'agenda'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
              >
                Program Agenda ({event.agenda.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('speakers')}
                className={`pb-3 px-1 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'speakers'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
              >
                Jury &amp; Panel ({event.speakers.length})
              </button>
            </div>

            {/* Tab Contents */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  <div>
                    <h3 className="font-epic text-base font-bold text-white mb-2">Event Description</h3>
                    <p className="text-slate-300 leading-relaxed text-sm font-sans">{event.description}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                    <h4 className="text-xs uppercase tracking-widest text-indigo-400 font-bold mb-1">Competition Synopsis</h4>
                    <p className="text-sm font-serif-cormorant italic text-slate-300 leading-relaxed">{event.synopsis}</p>
                  </div>

                  {event.curatorNotes && (
                    <div className="text-xs text-slate-300 bg-slate-900/40 border border-slate-800 p-3.5 rounded-xl flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                      <span>{event.curatorNotes}</span>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {event.tags.map((tag, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg text-xs bg-slate-800 text-slate-300 border border-slate-700">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Registration Fast Card */}
                <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-indigo-500/30 flex flex-col justify-between space-y-4 shadow-xl">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-bold text-indigo-400">Official Access Pass</span>
                    <h4 className="text-sm font-bold text-white mt-1">Instant Event Pass &amp; QR</h4>

                    <div className="mt-3 flex justify-center p-3 bg-white rounded-xl shadow-inner">
                      <QRCodeSVG
                        value={event.registration.qrValue}
                        size={140}
                        level="H"
                        includeMargin={true}
                      />
                    </div>
                    <p className="text-[11px] text-center text-slate-400 mt-2">
                      Scan with camera for direct pass verification
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-800 text-xs text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-400">RSVP Deadline:</span>
                      <span className="font-semibold text-indigo-300">{event.registration.deadline}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Fee:</span>
                      <span className="font-semibold text-emerald-400">{event.registration.fee}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => onOpenRegister(event)}
                      className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all"
                    >
                      <QrCode className="w-4 h-4" />
                      <span>Generate Verified Pass</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'agenda' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <h3 className="font-epic text-sm font-bold text-white">Program Agenda &amp; Rounds</h3>
                  <button
                    type="button"
                    onClick={generateICS}
                    className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 border border-indigo-500/30 px-3 py-1.5 rounded-xl bg-slate-900"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Add to Calendar (.ics)</span>
                  </button>
                </div>

                <div className="relative border-l-2 border-indigo-500/30 ml-4 pl-6 space-y-6 py-2">
                  {event.agenda.map((item, idx) => (
                    <div key={idx} className="relative group">
                      <div className="absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full bg-indigo-500 border-4 border-[#070b16] group-hover:scale-125 transition-transform" />
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <span className="text-xs font-bold text-indigo-400 font-mono">{item.time}</span>
                        {item.speaker && (
                          <span className="text-xs text-slate-400 italic">Host: {item.speaker}</span>
                        )}
                      </div>
                      <h4 className="font-semibold text-slate-100 text-sm mt-0.5">{item.title}</h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'speakers' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {event.speakers.map((sp, idx) => (
                  <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
                    <img
                      src={sp.avatar}
                      alt={sp.name}
                      className="w-16 h-16 rounded-xl object-cover border border-slate-700 flex-shrink-0"
                    />
                    <div className="space-y-1">
                      <h4 className="font-epic text-sm font-bold text-white">{sp.name}</h4>
                      <p className="text-xs font-medium text-indigo-400">{sp.role}</p>
                      <p className="text-[11px] text-slate-400 font-sans leading-relaxed">{sp.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        event={event}
      />
    </AnimatePresence>
  );
};
