import React, { useState, useMemo, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FixedBackground } from './components/FixedBackground';
import { EventCard3D } from './components/EventCard3D';
import { EventModal } from './components/EventModal';
import { RegistrationModal } from './components/RegistrationModal';
import { VoyageTimeline } from './components/VoyageTimeline';
import { MediaShowcase } from './components/MediaShowcase';
import { EventManagerDrawer } from './components/EventManagerDrawer';
import { Footer } from './components/Footer';
import { INITIAL_EVENTS } from './data/events';
import { DepartmentEvent, ViewMode } from './types';
import { Compass, Sparkles, Filter, AlertCircle, ArrowUpRight } from 'lucide-react';

export default function App() {
  const [events, setEvents] = useState<DepartmentEvent[]>(INITIAL_EVENTS);
  const [viewMode, setViewMode] = useState<ViewMode>('3d-grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Tracks');
  const [selectedEvent, setSelectedEvent] = useState<DepartmentEvent | null>(null);
  const [registeringEvent, setRegisteringEvent] = useState<DepartmentEvent | null>(null);
  const [isCMSOpen, setIsCMSOpen] = useState(false);

  const eventsGridRef = useRef<HTMLDivElement>(null);

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

  const featuredEvent = useMemo(() => {
    return events.find((e) => e.featured) || events[0];
  }, [events]);

  const handleExploreClick = () => {
    if (eventsGridRef.current) {
      eventsGridRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddCustomEvent = (newEvent: DepartmentEvent) => {
    setEvents((prev) => [newEvent, ...prev]);
  };

  const handleResetEvents = () => {
    setEvents(INITIAL_EVENTS);
  };

  return (
    <div className="min-h-screen bg-[#040711] text-slate-100 relative selection:bg-amber-500/30 selection:text-amber-100 flex flex-col font-sans">
      {/* Fixed Viewport Background - Only Content/Text Scrolls */}
      <FixedBackground />

      {/* Main App Container */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Hero Section */}
        <Hero
          onExploreClick={handleExploreClick}
          featuredEvent={featuredEvent}
          onSelectFeatured={(ev) => setSelectedEvent(ev)}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          categories={categories}
        />


        {/* Main Content Area */}
        <main ref={eventsGridRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex-1 py-6">

          {/* Section Header — Premium Professional */}
          <div className="relative pb-8 mb-8">
            {/* Gradient divider at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                {/* Eyebrow label */}
                <div className="inline-flex items-center gap-2 mb-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-3 py-1">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
                  </span>
                  <Compass className="w-3 h-3 text-amber-400" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-amber-400">
                    Departmental Curriculum &amp; Symposium Roster
                  </span>
                </div>

                {/* Main heading */}
                <h2 className="font-epic text-2xl sm:text-3xl lg:text-4xl font-black text-slate-100 leading-tight">
                  {viewMode === '3d-grid' && (
                    <>
                      <span className="text-white">Active</span>{' '}
                      <span className="text-amber-400">Departmental</span>{' '}
                      <span className="text-white">Events</span>
                    </>
                  )}
                  {viewMode === 'voyage-timeline' && 'The Homeric Voyage: Milestones & Masterclasses'}
                  {viewMode === 'cinematic-reel' && 'Cinematic Archives & Production Reels'}
                </h2>

                {/* Sub-label */}
                <p className="mt-1.5 text-xs text-slate-500 font-serif-cormorant italic">
                  Explore upcoming workshops, symposiums &amp; live competitions across all departments.
                </p>
              </div>

              {/* Count + filter */}
              <div className="flex flex-col items-end gap-1.5 shrink-0">
                <div className="inline-flex items-center gap-2 rounded-xl border border-slate-700/60 bg-slate-800/50 px-3 py-1.5">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span className="text-xs text-slate-300">
                    Showing{' '}
                    <strong className="text-amber-300 font-bold">{filteredEvents.length}</strong>
                    {' '}of{' '}
                    <strong className="text-slate-200">{events.length}</strong>{' '}events
                  </span>
                </div>
                {selectedCategory !== 'All Tracks' && (
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('All Tracks')}
                    className="flex items-center gap-1 text-[11px] font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    <Filter className="w-3 h-3" /> Clear filter
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* View Mode Switching */}
          {filteredEvents.length === 0 ? (
            <div className="py-16 text-center rounded-2xl border border-dashed border-amber-500/30 bg-slate-900/40 p-8 space-y-4">
              <AlertCircle className="w-10 h-10 text-amber-400 mx-auto" />
              <h3 className="font-epic text-lg font-bold text-slate-200">No events matched your criteria</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                No symposiums or workshops match query "{searchQuery}" in category "{selectedCategory}".
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All Tracks');
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <>
              {/* 1. 3D Voyager Grid View */}
              {viewMode === '3d-grid' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEvents.map((event) => (
                    <EventCard3D
                      key={event.id}
                      event={event}
                      onSelect={(ev) => setSelectedEvent(ev)}
                    />
                  ))}
                </div>
              )}

              {/* 2. Voyage Timeline View */}
              {viewMode === 'voyage-timeline' && (
                <VoyageTimeline
                  events={filteredEvents}
                  onSelectEvent={(ev) => setSelectedEvent(ev)}
                  onRegisterEvent={(ev) => setRegisteringEvent(ev)}
                />
              )}

              {/* 3. Cinematic Media Reel View */}
              {viewMode === 'cinematic-reel' && (
                <MediaShowcase
                  events={filteredEvents}
                  onSelectEvent={(ev) => setSelectedEvent(ev)}
                />
              )}
            </>
          )}

        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Modals & Drawers */}
      {/* 1. Full Event Dossier Modal */}
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

      {/* 2. Registration & Dynamic QR Code Modal */}
      {registeringEvent && (
        <RegistrationModal
          event={registeringEvent}
          onClose={() => setRegisteringEvent(null)}
        />
      )}

      {/* 3. Event CMS & Integration Guide Drawer */}
      <EventManagerDrawer
        isOpen={isCMSOpen}
        onClose={() => setIsCMSOpen(false)}
        events={events}
        onAddEvent={handleAddCustomEvent}
        onResetEvents={handleResetEvents}
      />
    </div>
  );
}
