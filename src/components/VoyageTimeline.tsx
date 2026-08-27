import React from 'react';
import { motion } from 'motion/react';
import { Compass, Calendar, Clock, MapPin, QrCode, ArrowRight, Anchor } from 'lucide-react';
import { DepartmentEvent } from '../types';

interface VoyageTimelineProps {
  events: DepartmentEvent[];
  onSelectEvent: (event: DepartmentEvent) => void;
  onRegisterEvent: (event: DepartmentEvent) => void;
}

export const VoyageTimeline: React.FC<VoyageTimelineProps> = ({ events, onSelectEvent, onRegisterEvent }) => {
  return (
    <div className="relative py-8" id="odyssey-voyage-timeline-section">
      {/* Central Guide Line */}
      <div className="hidden md:block absolute left-1/2 top-10 bottom-10 w-0.5 -translate-x-1/2 bg-gradient-to-b from-amber-400 via-amber-500/50 to-amber-700/20" />

      <div className="space-y-12 relative">
        {events.map((event, index) => {
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`flex flex-col md:flex-row items-center gap-6 md:gap-12 ${
                isEven ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Event Content Box */}
              <div className="w-full md:w-1/2">
                <div className="group relative rounded-2xl border border-amber-500/20 bg-gradient-to-b from-slate-900/95 via-[#070c1a] to-[#04060f] p-5 sm:p-6 shadow-2xl backdrop-blur-xl hover:border-amber-400/50 transition-all duration-300">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-300 border border-amber-500/30">
                      <Compass className="w-3.5 h-3.5 text-amber-400" />
                      {event.voyageMilestone}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{event.category}</span>
                  </div>

                  <h3 className="font-epic text-lg sm:text-xl font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
                    {event.title}
                  </h3>
                  <p className="font-serif-cormorant text-sm italic text-amber-200/80 mt-1 mb-4">
                    {event.subtitle}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-amber-500/10 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                      <span>{event.time}</span>
                    </div>
                    <div className="col-span-2 flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                      <span className="truncate">{event.venue.name} ({event.venue.hall})</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2 mb-4 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="flex items-center justify-between gap-3 pt-2 border-t border-amber-500/15">
                    <button
                      type="button"
                      onClick={() => onSelectEvent(event)}
                      className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors"
                    >
                      <span>Examine Milestone Dossier</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onRegisterEvent(event)}
                      className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md"
                    >
                      <QrCode className="w-3 h-3 text-slate-950" />
                      <span>Pass & QR</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Central Nautical Node */}
              <div className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-amber-400 bg-[#040711] shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                <Anchor className="h-5 w-5 text-amber-400" />
              </div>

              {/* Media Preview Box on Opposite Side */}
              <div className="w-full md:w-1/2">
                <div
                  onClick={() => onSelectEvent(event)}
                  className="cursor-pointer group relative aspect-[16/9] overflow-hidden rounded-2xl border border-amber-500/20 bg-slate-950 shadow-xl"
                >
                  <img
                    src={event.heroImage}
                    alt={event.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-amber-200">
                    <span className="font-semibold">{event.badge}</span>
                    <span className="text-[11px] text-slate-300">{event.venue.seatsLeft} seats left</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
