import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Hero } from './components/Hero';
import { FixedBackground } from './components/FixedBackground';
import { ThreeBackground } from './components/ThreeBackground';
import { SpatialDeck3D } from './components/SpatialDeck3D';
import { DepartmentVideoTheater } from './components/DepartmentVideoTheater';
import { EventModal } from './components/EventModal';
import { RegistrationModal } from './components/RegistrationModal';
import { VoyageTimeline } from './components/VoyageTimeline';
import { EventManagerDrawer } from './components/EventManagerDrawer';
import { Footer } from './components/Footer';
import { ShareModal } from './components/ShareModal';
import { INITIAL_EVENTS } from './data/events';
import { DepartmentEvent } from './types';
import {
  Compass,
  Share2,
  Search,
  Calendar,
} from 'lucide-react';

export default function App() {
  const [events, setEvents] = useState<DepartmentEvent[]>(INITIAL_EVENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Tracks');
  const [selectedEvent, setSelectedEvent] = useState<DepartmentEvent | null>(null);
  const [registeringEvent, setRegisteringEvent] = useState<DepartmentEvent | null>(null);
  const [isCMSOpen, setIsCMSOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [sharingEvent, setSharingEvent] = useState<DepartmentEvent | null>(null);

  const eventsSectionRef = useRef<HTMLDivElement>(null);
  const videoSectionRef = useRef<HTMLDivElement>(null);

  // Deep-linking: automatically open shared event if ?event=... or #event-id is in URL
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const eventParam = params.get('event');
      const hash = window.location.hash.replace('#', '');
      const targetId = eventParam || hash;

      if (targetId) {
        const match = events.find(
          (e) => e.id === targetId || e.id.toLowerCase() === targetId.toLowerCase()
        );
        if (match) {
          setSelectedEvent(match);
        }
      }
    } catch (e) {
      console.error('URL params parse error:', e);
    }
  }, [events]);

  // Extract unique categories for filter pills
  const categories = useMemo(() => {
    const cats = Array.from(new Set(events.map((e) => e.category)));
    return ['All Tracks', ...cats];
  }, [events]);

  // Filtered events based on category and search query
  const filteredEvents = useMemo(() => {
    return events.filter((ev) => {
      const matchCat = selectedCategory === 'All Tracks' || ev.category === selectedCategory;
      const matchSearch =
        searchQuery.trim() === '' ||
        ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ev.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ev.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ev.speakers.some((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        ev.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [events, selectedCategory, searchQuery]);

  const handleExploreClick = () => {
    if (eventsSectionRef.current) {
      eventsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenCinema = () => {
    if (videoSectionRef.current) {
      videoSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddCustomEvent = (newEvent: DepartmentEvent) => {
    setEvents((prev) => [newEvent, ...prev]);
  };

  const handleResetEvents = () => {
    setEvents(INITIAL_EVENTS);
  };

  return (
    <div className="min-h-screen bg-[#040711] text-slate-100 relative selection:bg-indigo-500/30 selection:text-indigo-100 flex flex-col font-sans">
      {/* Fixed Ambient Background & 3D Interactive Particle Field */}
      <FixedBackground />
      <ThreeBackground />

      {/* Main Content Layer */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Professional Hero Section (DATA DIVE 5.0 Word-by-Word Animation) */}
        <Hero
          onExploreClick={handleExploreClick}
          onOpenCinema={handleOpenCinema}
          onOpenShare={() => {
            setSharingEvent(null);
            setIsShareModalOpen(true);
          }}
          totalEvents={events.length}
        />

        {/* Main Content Area */}
        <main
          ref={eventsSectionRef}
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex-1 py-10 w-full"
        >
          {/* Section Header & Share Bar */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800/80 pb-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 mb-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-indigo-300">
                <Compass className="w-3.5 h-3.5 text-indigo-400" />
                <span>DATA DIVE 5.0 &bull; Flagship Competitions</span>
              </div>
              <h2 className="font-epic text-2xl sm:text-3xl font-extrabold text-white">
                Departmental Events &amp; Symposium
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-400 font-serif-cormorant italic">
                Select an event to explore detailed agendas, round structures, jury profiles, and prize pools.
              </p>
            </div>

            {/* Share Website Button */}
            <div className="flex items-center gap-3 self-start md:self-auto">
              <button
                type="button"
                onClick={() => {
                  setSharingEvent(null);
                  setIsShareModalOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900/90 text-slate-200 text-xs font-bold hover:bg-indigo-600 hover:text-white transition-all shadow-md active:scale-95"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Platform</span>
              </button>
            </div>
          </div>

          {/* Search & Category Filter Pills */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-2xl border border-slate-800 bg-slate-950/70 backdrop-blur-md mb-8">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search events, Python, ML, IPL, Shark Tank..."
                className="w-full pl-10 pr-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700/60 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none pb-1 sm:pb-0">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                      isActive
                        ? 'bg-indigo-600 text-white font-bold shadow-md'
                        : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Interactive 3D Spatial Deck ──────────────────────── */}
          <div className="mb-12">
            <SpatialDeck3D
              events={filteredEvents}
              onSelectEvent={(ev) => setSelectedEvent(ev)}
              onOpenRegister={(ev) => setRegisteringEvent(ev)}
              onShareEvent={(ev) => {
                setSharingEvent(ev);
                setIsShareModalOpen(true);
              }}
            />
          </div>

          {/* ── Dedicated Video Showcase & Cinema Stage ──────── */}
          <div ref={videoSectionRef}>
            <DepartmentVideoTheater
              events={events}
              onSelectEvent={(ev) => setSelectedEvent(ev)}
              onOpenRegister={(ev) => setRegisteringEvent(ev)}
            />
          </div>

          {/* ── Schedule Timeline Section ────────────────────── */}
          <div className="border-t border-slate-800 pt-12 my-12">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Symposium Schedule &amp; Timeline</span>
              </span>
              <h3 className="font-epic text-2xl font-bold text-white mt-1">
                Chronological Event Roadmap
              </h3>
            </div>

            <VoyageTimeline
              events={filteredEvents}
              onSelectEvent={(ev) => setSelectedEvent(ev)}
            />
          </div>
        </main>

        {/* Footer */}
        <Footer
          onOpenShare={() => {
            setSharingEvent(null);
            setIsShareModalOpen(true);
          }}
        />
      </div>

      {/* ── Modals & Drawers ───────────────────────────────── */}
      {/* 1. Full Event Dossier & Video Modal */}
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onOpenRegister={(ev) => {
            setSelectedEvent(null);
            setRegisteringEvent(ev);
          }}
        />
      )}

      {/* 2. Registration & Dynamic QR Code Pass Modal */}
      {registeringEvent && (
        <RegistrationModal
          event={registeringEvent}
          onClose={() => setRegisteringEvent(null)}
        />
      )}

      {/* 3. Event CMS Drawer */}
      <EventManagerDrawer
        isOpen={isCMSOpen}
        onClose={() => setIsCMSOpen(false)}
        events={events}
        onAddEvent={handleAddCustomEvent}
        onResetEvents={handleResetEvents}
      />

      {/* 4. Global Share Options Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => {
          setIsShareModalOpen(false);
          setSharingEvent(null);
        }}
        event={sharingEvent}
      />
    </div>
  );
}
