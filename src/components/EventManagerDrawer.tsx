import React, { useState } from 'react';
import { 
  X, Code, Plus, Copy, CheckCircle2, Download, FileText, 
  HelpCircle, Sparkles, RefreshCw, UploadCloud, Layers 
} from 'lucide-react';
import { DepartmentEvent, EventCategory } from '../types';

interface EventManagerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  events: DepartmentEvent[];
  onAddEvent: (newEvent: DepartmentEvent) => void;
  onResetEvents: () => void;
}

export const EventManagerDrawer: React.FC<EventManagerDrawerProps> = ({
  isOpen,
  onClose,
  events,
  onAddEvent,
  onResetEvents,
}) => {
  const [activeTab, setActiveTab] = useState<'guide' | 'schema' | 'add' | 'export'>('guide');
  const [copiedJSON, setCopiedJSON] = useState(false);

  // Form state for adding an event
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newCategory, setNewCategory] = useState<EventCategory>('Cinema & Production');
  const [newBadge, setNewBadge] = useState('New Masterclass');
  const [newDate, setNewDate] = useState('November 04, 2026');
  const [newTime, setNewTime] = useState('15:00 - 18:00 CET');
  const [newVenueName, setNewVenueName] = useState('Main Film Archive & Soundstage');
  const [newHall, setNewHall] = useState('Hall Alpha');
  const [newCapacity, setNewCapacity] = useState(120);
  const [newDescription, setNewDescription] = useState('');
  const [newSynopsis, setNewSynopsis] = useState('');
  const [newRegUrl, setNewRegUrl] = useState('https://odyssey-events.edu/register/custom-event');
  const [newHeroImg, setNewHeroImg] = useState('https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop');
  const [newMilestone, setNewMilestone] = useState('Act II: The Journey Continues');
  const [formSuccess, setFormSuccess] = useState(false);

  if (!isOpen) return null;

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(events, null, 2));
    setCopiedJSON(true);
    setTimeout(() => setCopiedJSON(false), 2500);
  };

  const handleDownloadJSON = () => {
    const blob = new Blob([JSON.stringify(events, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'odyssey-department-events.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const eventObj: DepartmentEvent = {
      id: `custom-event-${Date.now()}`,
      title: newTitle,
      subtitle: newSubtitle || 'Departmental Screening & Discussion',
      category: newCategory,
      badge: newBadge,
      date: newDate,
      isoDate: new Date().toISOString(),
      time: newTime,
      venue: {
        name: newVenueName,
        hall: newHall,
        address: 'Department of Cinema Campus, Historic Quadrangle',
        isVirtual: true,
        streamUrl: 'https://odyssey-cinema.edu/live/stream',
        capacity: Number(newCapacity) || 100,
        seatsLeft: Math.floor(Number(newCapacity) * 0.8),
      },
      heroImage: newHeroImg,
      gallery: [
        {
          url: newHeroImg,
          caption: 'Event promotional archive visual'
        }
      ],
      description: newDescription || 'An immersive departmental symposium curated around Homeric cinematic storytelling.',
      synopsis: newSynopsis || 'Deconstructing visual archetypes, ancient mythic paradigms, and contemporary filmmaking craft.',
      speakers: [
        {
          name: 'Department Faculty Chair',
          role: 'Host & Lead Moderator',
          affiliation: 'Department of Cinema',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
          bio: 'Leading scholar in mythic cinema and visual storytelling.'
        }
      ],
      agenda: [
        {
          time: '15:00 - 16:00',
          title: 'Opening Lecture & Archival Overview',
          description: 'Introduction to key themes and historical contexts.'
        },
        {
          time: '16:15 - 17:30',
          title: 'Masterclass Discussion & Live Demonstration',
          description: 'Hands-on breakdown and participant Q&A.'
        }
      ],
      registration: {
        url: newRegUrl,
        qrValue: `${newRegUrl}?src=qr_landing`,
        deadline: 'November 01, 2026',
        fee: 'Free for Department Members',
        perks: [
          'Access to live masterclass recording',
          'Certificate of Attendance',
          'Syllabus & Lecture Notes Pack'
        ]
      },
      voyageMilestone: newMilestone,
      tags: ['Cinema', 'Masterclass', 'Odyssey'],
    };

    onAddEvent(eventObj);
    setFormSuccess(true);
    setTimeout(() => {
      setFormSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md overflow-hidden">
      <div className="w-full max-w-2xl bg-[#060a15] border-l border-amber-500/30 text-slate-100 flex flex-col h-full shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="px-6 py-4 border-b border-amber-500/20 bg-slate-900/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code className="w-5 h-5 text-amber-400" />
            <h3 className="font-epic text-base font-bold text-slate-100">
              Departmental CMS & Event Guide
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-amber-500/20 px-6 gap-4 text-xs font-semibold bg-slate-950/60">
          <button
            type="button"
            onClick={() => setActiveTab('guide')}
            className={`py-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'guide'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Updating & Media Guide</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('add')}
            className={`py-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'add'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Event Live</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('export')}
            className={`py-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'export'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Clean JSON</span>
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
          {activeTab === 'guide' && (
            <div className="space-y-5 text-slate-300">
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
                <h4 className="font-epic text-sm font-bold text-amber-300 mb-1 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>The Odyssey Event System Architecture</span>
                </h4>
                <p className="text-xs leading-relaxed text-slate-200">
                  This landing application is fully data-driven. Every card, modal dossier, QR code, and agenda timeline automatically renders from the centralized structure defined in <code className="text-amber-300 font-mono">src/data/events.ts</code>.
                </p>
              </div>

              {/* Step 1: Adding Events */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-black font-bold text-[11px]">1</span>
                  <span>How to Add or Update Events</span>
                </h4>
                <p className="leading-relaxed">
                  Open <code className="text-amber-300">src/data/events.ts</code>. Append or edit an object conforming to the <code className="text-amber-300">DepartmentEvent</code> interface. You can supply custom dates, venue rooms, speaker profiles with avatars, and hour-by-hour agendas.
                </p>
              </div>

              {/* Step 2: Media Integration & Optimization */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-black font-bold text-[11px]">2</span>
                  <span>Media Optimization & User Assets</span>
                </h4>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                  <li><strong>Images:</strong> Recommended resolution is 1920x1080 (16:9) or 2.39:1 widescreen, compressed to WebP/JPEG under 400KB with native <code className="text-amber-300">loading="lazy"</code>.</li>
                  <li><strong>Videos:</strong> Provide direct MP4/H.264 video URLs (e.g. cloud storage buckets or CDN streams) via the <code className="text-amber-300">videoTrailerUrl</code> field. The in-modal video player handles responsive playback.</li>
                  <li><strong>Licensing:</strong> Ensure all production stills and film excerpts carry departmental distribution rights.</li>
                </ul>
              </div>

              {/* Step 3: Registration & QR Routing */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-black font-bold text-[11px]">3</span>
                  <span>Registration URLs & Dynamic QR Codes</span>
                </h4>
                <p className="leading-relaxed">
                  The QR code component (<code className="text-amber-300">&lt;QRCodeSVG /&gt;</code>) automatically generates a scannable high-resolution 2D barcode for each event pointing directly to the event’s specific registration URL with source tracking tags.
                </p>
              </div>

              {/* Reset to Default */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">Restore factory sample events:</span>
                <button
                  type="button"
                  onClick={onResetEvents}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 font-semibold"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset Default Data</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'add' && (
            <form onSubmit={handleCreateEvent} className="space-y-4">
              {formSuccess && (
                <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Event successfully added to landing page!</span>
                </div>
              )}

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. The Sirens in Modern Sound Design"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-amber-500/20 text-slate-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Subtitle / Tagline</label>
                <input
                  type="text"
                  value={newSubtitle}
                  onChange={(e) => setNewSubtitle(e.target.value)}
                  placeholder="e.g. Masterclass & Dolby Atmos Demonstration"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-amber-500/20 text-slate-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as EventCategory)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-amber-500/20 text-slate-100 focus:outline-none focus:border-amber-400"
                  >
                    <option value="Cinema & Production">Cinema & Production</option>
                    <option value="Classical Studies">Classical Studies</option>
                    <option value="VFX & Technology">VFX & Technology</option>
                    <option value="Screenwriting & Narrative">Screenwriting & Narrative</option>
                    <option value="Keynote Gala">Keynote Gala</option>
                    <option value="Film Screening">Film Screening</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Badge</label>
                  <input
                    type="text"
                    value={newBadge}
                    onChange={(e) => setNewBadge(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-amber-500/20 text-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Date</label>
                  <input
                    type="text"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-amber-500/20 text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Time</label>
                  <input
                    type="text"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-amber-500/20 text-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Venue Name</label>
                  <input
                    type="text"
                    value={newVenueName}
                    onChange={(e) => setNewVenueName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-amber-500/20 text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Hall / Room</label>
                  <input
                    type="text"
                    value={newHall}
                    onChange={(e) => setNewHall(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-amber-500/20 text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Hero Image URL</label>
                <input
                  type="url"
                  value={newHeroImg}
                  onChange={(e) => setNewHeroImg(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-amber-500/20 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Registration URL</label>
                <input
                  type="url"
                  value={newRegUrl}
                  onChange={(e) => setNewRegUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-amber-500/20 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Description</label>
                <textarea
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Detailed synopsis of the event..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-amber-500/20 text-slate-100"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Publish Event to Live Landing</span>
              </button>
            </form>
          )}

          {activeTab === 'export' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-300 font-semibold">Active JSON Data Payload ({events.length} events)</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleCopyJSON}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/20 flex items-center gap-1.5 font-semibold"
                  >
                    {copiedJSON ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedJSON ? 'Copied' : 'Copy JSON'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleDownloadJSON}
                    className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center gap-1.5 font-bold"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download .json</span>
                  </button>
                </div>
              </div>

              <pre className="p-4 rounded-xl bg-black border border-amber-500/20 text-[11px] font-mono text-amber-200/90 overflow-x-auto max-h-96">
                {JSON.stringify(events, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
