import React from 'react';
import {
  Compass,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  ExternalLink,
  Award,
  Share2,
  Calendar,
  Clock,
  Sparkles,
  ArrowUp,
  Gamepad2,
  Cpu,
  TrendingUp,
  Trophy,
  Users,
  MessageSquareCode,
} from 'lucide-react';

interface FooterProps {
  onOpenShare?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenShare }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const flagshipEvents = [
    {
      act: 'Act I',
      title: 'DataVerse',
      tag: 'Python & ML Arena',
      icon: Cpu,
      color: 'text-cyan-400',
    },
    {
      act: 'Act II',
      title: 'VizMinds',
      tag: 'Power BI Dashboards',
      icon: TrendingUp,
      color: 'text-emerald-400',
    },
    {
      act: 'Act III',
      title: 'Founders Gone Wild',
      tag: 'Shark Tank Pitches',
      icon: Award,
      color: 'text-amber-400',
    },
    {
      act: 'Act IV',
      title: 'Game of Bids 2026',
      tag: '₹80Cr IPL Auction',
      icon: Trophy,
      color: 'text-purple-400',
    },
    {
      act: 'Act V',
      title: 'Survival Showdown',
      tag: 'WWE 2K26 Knockout',
      icon: Gamepad2,
      color: 'text-rose-400',
    },
  ];

  return (
    <footer className="relative border-t border-slate-800/90 bg-[#02050c] text-slate-400 text-xs mt-20 overflow-hidden">
      {/* Ambient background glow accents */}
      <div className="pointer-events-none absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/5 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 blur-[120px]" />

      {/* ── Top Call-to-Action Strip ─────────────────────────────── */}
      <div className="border-b border-slate-800/60 bg-gradient-to-r from-indigo-950/40 via-slate-950/60 to-purple-950/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 shadow-[0_0_25px_rgba(99,102,241,0.2)]">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-epic text-base sm:text-lg font-bold text-white tracking-wide">
                DATA DIVE 5.0 &bull; Departmental Symposium 2026
              </h3>
              <p className="text-xs text-slate-300 font-sans mt-0.5">
                5 Flagship Arenas &bull; All competitions scheduled for <strong className="text-indigo-300">September 10, 2026</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {onOpenShare && (
              <button
                type="button"
                onClick={onOpenShare}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900/90 text-slate-200 text-xs font-bold hover:border-indigo-400 hover:bg-indigo-600 hover:text-white transition-all shadow-md active:scale-95"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Symposium</span>
              </button>
            )}

            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-800 bg-slate-900/80 text-slate-300 hover:text-white hover:border-slate-600 transition-all text-xs font-medium"
              title="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Top</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Multi-Column Footer Content ────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Department Overview & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-500/40 bg-indigo-500/10 text-indigo-400">
                <Compass className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-epic text-sm font-bold text-white uppercase tracking-wider">
                  DATA DIVE 5.0
                </h4>
                <p className="text-[11px] text-indigo-300 font-medium">
                  Department of Data Science
                </p>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed text-xs font-sans">
              The flagship annual symposium bringing together students, researchers, and tech enthusiasts across technical machine learning, data storytelling, startup pitching, fantasy sports strategy, and competitive esports.
            </p>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Certified Departmental Curriculum Event</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Award className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Prize Pools, Trophies &amp; Merit Awards</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Users className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Open for Solo &amp; Team Registrations</span>
              </div>
            </div>
          </div>

          {/* Column 2: The 5 Flagship Tracks */}
          <div className="space-y-3.5">
            <h5 className="font-epic text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              <span>Event Roster (5 Acts)</span>
            </h5>
            <ul className="space-y-2.5 text-xs">
              {flagshipEvents.map((ev) => {
                const Icon = ev.icon;
                return (
                  <li
                    key={ev.title}
                    className="flex items-center justify-between p-2 rounded-xl border border-slate-800/60 bg-slate-950/50 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${ev.color}`} />
                      <div>
                        <span className="font-semibold text-slate-200 block">{ev.title}</span>
                        <span className="text-[10px] text-slate-400">{ev.tag}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-indigo-400/90 uppercase tracking-wider bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/20">
                      {ev.act}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 3: Venues & Important Dates */}
          <div className="space-y-3.5">
            <h5 className="font-epic text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Venues &amp; Schedule</span>
            </h5>
            
            <div className="p-3 rounded-2xl border border-slate-800/80 bg-slate-950/60 space-y-2">
              <div className="flex items-center gap-2 text-indigo-300 font-semibold text-xs">
                <Calendar className="w-3.5 h-3.5" />
                <span>Symposium Day: Sept 10, 2026</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>Multi-session parallel tracks all day</span>
              </div>
            </div>

            <ul className="space-y-2 text-slate-400 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-300 block">Technical ML Arena</strong>
                  <span>Innovation Center, Lab Block 3</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-300 block">Visualization &amp; BI Lab</strong>
                  <span>Visual Computing Stage, Room 204</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-300 block">IPL Auction War Room</strong>
                  <span>Strategy Arena &amp; Live Bidding Bay</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-300 block">WWE 2K26 Esports Arena</strong>
                  <span>Console Gaming Lounge, Hub 1</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Organizing Desk & Contact Info */}
          <div className="space-y-3.5">
            <h5 className="font-epic text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>Organizing Desk &amp; Help</span>
            </h5>
            
            <p className="text-slate-400 text-xs font-sans">
              Have questions regarding rules, team formation, or event registration? Reach out to our student and faculty coordinators.
            </p>

            <ul className="space-y-2.5 text-slate-300 text-xs">
              <li className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <div className="truncate">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Official Inquiries</span>
                  <a href="mailto:datadive.events@university.edu" className="hover:text-indigo-300 transition-colors font-medium truncate">
                    datadive.events@university.edu
                  </a>
                </div>
              </li>

              <li className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Helpline &amp; Support</span>
                  <span className="font-medium text-slate-200">+91 (0) 800-DATA-DIVE</span>
                </div>
              </li>

              <li>
                <a
                  href="https://maps.app.goo.gl/wv9eUrZ8erRhXhNi8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-3 py-2 rounded-xl bg-indigo-600/10 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-600 hover:text-white transition-all text-xs font-semibold"
                >
                  <span className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Campus Navigation &amp; Map</span>
                  </span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* ── Bottom Copyright & Legal Strip ──────────────────────── */}
        <div className="mt-14 pt-8 border-t border-slate-900/90 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <p>
              &copy; 2026 Department of Data Science &amp; Technical Computing. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center gap-4 text-slate-400">
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[10px] font-bold text-indigo-400 tracking-wider uppercase">
              DATA DIVE 5.0 Official Platform
            </span>
            <span>Symposium Edition 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
