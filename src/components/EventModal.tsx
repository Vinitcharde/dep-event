import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Calendar, Clock, MapPin, Users, QrCode, Play,
  ExternalLink, Sparkles, CheckCircle2,
  Share2, Compass, Globe, Download, Trophy, Target, Zap
} from 'lucide-react';
import { DepartmentEvent } from '../types';
import { QRCodeSVG } from 'qrcode.react';

interface EventModalProps {
  event: DepartmentEvent | null;
  onClose: () => void;
  onOpenRegister: (event: DepartmentEvent) => void;
}

export const EventModal: React.FC<EventModalProps> = ({ event, onClose, onOpenRegister }) => {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'agenda' | 'speakers' | 'media'>('overview');

  if (!event) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const generateICS = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Odyssey Department Cinema Events//EN
BEGIN:VEVENT
UID:${event.id}@odyssey-cinema.edu
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
    link.setAttribute('download', `${event.id}-odyssey-event.ics`);
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
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-5xl rounded-2xl border border-amber-500/30 bg-[#060a14] text-slate-100 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
          id="odyssey-event-dossier-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-event-title"
        >
          {/* Top Bar Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-amber-500/20 bg-slate-900/60 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-300 border border-amber-500/30">
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                {event.voyageMilestone}
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline">&bull; {event.category}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShare}
                className="p-2 rounded-lg bg-slate-800 border border-amber-500/20 text-slate-300 hover:text-amber-300 hover:border-amber-400 transition-colors"
                title="Copy Event Link"
                aria-label="Share Event"
              >
                {copiedLink ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              </button>
              <button
                type="button"
                id="btn-close-event-modal"
                onClick={onClose}
                className="p-2 rounded-lg bg-slate-800 border border-amber-500/20 text-slate-300 hover:text-white hover:border-rose-400 hover:bg-rose-950/40 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Body (Scrollable) */}
          <div className="overflow-y-auto flex-1 p-6 space-y-6">
            {/* Hero Media / Video Reel Section */}
            <div className="relative rounded-2xl overflow-hidden border border-amber-500/20 bg-slate-950 aspect-[21/9] sm:aspect-[2.39/1] min-h-[220px]">
              {isPlayingVideo && event.videoTrailerUrl ? (
                <div className="relative w-full h-full bg-black">
                  {/* YouTube URL → render as iframe embed */}
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
                      title={`${event.title} Trailer`}
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
                    className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-black/80 text-xs font-semibold text-white border border-white/20 hover:bg-amber-600"
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
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060a14] via-black/40 to-transparent" />
                  
                  {/* Floating Action within Hero */}
                  <div className="absolute bottom-4 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                      <div className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-widest bg-amber-400 text-slate-950 mb-2">
                        {event.badge}
                      </div>
                      <h2 id="modal-event-title" className="font-epic text-xl sm:text-3xl font-black text-white drop-shadow-md">
                        {event.title}
                      </h2>
                      <p className="font-serif-cormorant text-sm sm:text-lg italic text-amber-200/90 drop-shadow">
                        {event.subtitle}
                      </p>
                    </div>

                    {event.videoTrailerUrl && (
                      <button
                        type="button"
                        onClick={() => setIsPlayingVideo(true)}
                        className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-xl transition-transform hover:scale-105"
                      >
                        <Play className="w-4 h-4 fill-current" />
                        <span>Play Cinematic Trailer</span>
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* ── Cricket Theme Banner — Game of Bids 2026 only ── */}
            {event.id === 'game-of-bids-2026' && (
              <div className="relative overflow-hidden rounded-2xl border border-violet-500/30 bg-gradient-to-br from-[#0d0520] via-[#130a2e] to-[#071a10]">

                {/* Cricket pitch stripe overlay */}
                <div className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(16,185,129,0.4) 60px, rgba(16,185,129,0.4) 62px)`,
                  }}
                />
                {/* Radial glow */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(139,92,246,0.18),transparent_60%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(16,185,129,0.14),transparent_60%)]" />

                <div className="relative p-5">
                  {/* Top row — title + live badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      {/* Cricket ball icon */}
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600/20 border border-violet-500/40 text-xl">
                        🏏
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-400">IPL Auction Simulation</p>
                        <h3 className="font-epic text-lg font-black text-white leading-tight">Game of Bids 2026</h3>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-300">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      </span>
                      Live Auction Event
                    </span>
                  </div>


                  {/* Stats grid */}

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="flex flex-col items-center justify-center rounded-xl border border-violet-500/20 bg-violet-900/20 p-3 text-center">
                      <span className="text-2xl font-black text-violet-300 font-epic">₹80Cr</span>
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

                  {/* Key rules strip */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {[
                      '🏏 Real IPL 2026 Player Pool',
                      '💰 ₹80 Crore Franchise Budget',
                      '⚡ Live Bidding Wars',
                      '🎯 Squad Balance Scoring',
                      '🏆 Best Franchise Trophy',
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-lg border border-slate-700/60 bg-slate-800/50 px-2.5 py-1 text-[11px] font-medium text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer divider */}
                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex-1 h-px bg-gradient-to-r from-violet-500/40 via-emerald-500/40 to-transparent" />
                    <span className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">Build · Bid · Win</span>
                    <div className="flex-1 h-px bg-gradient-to-l from-violet-500/40 via-emerald-500/40 to-transparent" />
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 rounded-xl bg-slate-900/60 border border-amber-500/15 text-xs">
              <div className="space-y-1">
                <span className="text-slate-400 flex items-center gap-1.5 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" /> Date
                </span>
                <p className="font-semibold text-slate-200">{event.date}</p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5 text-amber-400" /> Time
                </span>
                <p className="font-semibold text-slate-200">{event.time}</p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 flex items-center gap-1.5 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" /> Location
                </span>
                <p className="font-semibold text-slate-200 truncate">{event.venue.name}</p>
                <p className="text-[11px] text-amber-300/80">{event.venue.hall}</p>
              </div>

            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-amber-500/20 gap-2 sm:gap-6 overflow-x-auto text-xs sm:text-sm font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                className={`pb-3 px-1 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'overview'
                    ? 'border-amber-400 text-amber-300'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Overview & Theme
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('agenda')}
                className={`pb-3 px-1 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'agenda'
                    ? 'border-amber-400 text-amber-300'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Program Agenda ({event.agenda.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('speakers')}
                className={`pb-3 px-1 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'speakers'
                    ? 'border-amber-400 text-amber-300'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Speakers & Hosts ({event.speakers.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('media')}
                className={`pb-3 px-1 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'media'
                    ? 'border-amber-400 text-amber-300'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Archival Gallery ({event.gallery.length})
              </button>
            </div>

            {/* Tab Contents */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  <div>
                    <h3 className="font-epic text-base font-bold text-amber-300 mb-2">Event Synopsis</h3>
                    <p className="text-slate-300 leading-relaxed text-sm font-sans">{event.description}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/40 border border-amber-500/10">
                    <h4 className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-1">Curator’s Mythic Deconstruction</h4>
                    <p className="text-sm font-serif-cormorant italic text-slate-300 leading-relaxed">{event.synopsis}</p>
                  </div>

                  {event.curatorNotes && (
                    <div className="text-xs text-amber-200/80 bg-amber-950/20 border border-amber-500/20 p-3 rounded-lg flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span>{event.curatorNotes}</span>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {event.tags.map((tag, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-full text-xs bg-slate-800 text-slate-300 border border-slate-700">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Registration & QR Fast Card */}
                <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-900 to-black border border-amber-500/30 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-bold text-amber-400">Official Registration Access</span>
                    <h4 className="text-sm font-bold text-slate-100 mt-1">Instant Event Pass</h4>
                    
                    <div className="mt-3 flex justify-center p-3 bg-white rounded-xl shadow-inner">
                      <QRCodeSVG
                        value={event.registration.qrValue}
                        size={150}
                        level="H"
                        includeMargin={true}
                      />
                    </div>
                    <p className="text-[11px] text-center text-slate-400 mt-2">
                      Scan with mobile camera for rapid digital check-in
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-800 text-xs text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-400">RSVP Deadline:</span>
                      <span className="font-semibold text-amber-300">{event.registration.deadline}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Admission Fee:</span>
                      <span className="font-semibold text-emerald-400">{event.registration.fee}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <a
                      href={event.registration.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>View Registration Link</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'agenda' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <h3 className="font-epic text-sm font-bold text-amber-300">Chronological Program Schedule</h3>
                  <button
                    type="button"
                    onClick={generateICS}
                    className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 border border-amber-500/30 px-3 py-1 rounded-lg bg-slate-900"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Add to Calendar (.ics)</span>
                  </button>
                </div>

                <div className="relative border-l-2 border-amber-500/30 ml-4 pl-6 space-y-6 py-2">
                  {event.agenda.map((item, idx) => (
                    <div key={idx} className="relative group">
                      <div className="absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full bg-amber-400 border-4 border-[#060a14] group-hover:scale-125 transition-transform" />
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <span className="text-xs font-bold text-amber-400 font-mono">{item.time}</span>
                        {item.speaker && (
                          <span className="text-xs text-slate-400 italic">Presenter: {item.speaker}</span>
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
                  <div key={idx} className="flex gap-4 p-4 rounded-xl bg-slate-900/60 border border-amber-500/20">
                    <img
                      src={sp.avatar}
                      alt={sp.name}
                      className="w-16 h-16 rounded-xl object-cover border border-amber-500/40 flex-shrink-0"
                    />
                    <div className="space-y-1 text-xs">
                      <h4 className="font-bold text-sm text-slate-100 font-epic">{sp.name}</h4>
                      <p className="text-amber-300 font-medium">{sp.role}</p>
                      <p className="text-slate-400 text-[11px]">{sp.affiliation}</p>
                      <p className="text-slate-300 text-xs mt-2 leading-relaxed">{sp.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'media' && (
              <div className="space-y-4">
                <h3 className="font-epic text-sm font-bold text-amber-300">Curated Production & Archival Stills</h3>
                {event.gallery.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 rounded-xl border border-dashed border-amber-500/20 bg-slate-900/30 text-center gap-3">
                    <span className="text-3xl">🎬</span>
                    <p className="text-sm font-semibold text-slate-300">No archival gallery for this event</p>
                    <p className="text-xs text-slate-500 max-w-xs">Media stills and production photos will be added once the event is confirmed.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {event.gallery.map((item, idx) => (
                      <div key={idx} className="group relative rounded-xl overflow-hidden border border-amber-500/20 bg-slate-950 aspect-video">
                        <img
                          src={item.url}
                          alt={item.caption}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex items-end">
                          <p className="text-xs text-amber-200">{item.caption}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
