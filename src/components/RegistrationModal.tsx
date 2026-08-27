import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, CheckCircle2, QrCode, Sparkles, Download, ExternalLink, Ticket, User, Mail, Building, Printer } from 'lucide-react';
import { DepartmentEvent } from '../types';
import { QRCodeSVG } from 'qrcode.react';
import confetti from 'canvas-confetti';

interface RegistrationModalProps {
  event: DepartmentEvent | null;
  onClose: () => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({ event, onClose }) => {
  const [attendeeName, setAttendeeName] = useState('Helena Vance');
  const [attendeeEmail, setAttendeeEmail] = useState('h.vance@cinema.edu');
  const [affiliation, setAffiliation] = useState('Faculty of Cinema & Media');
  const [badgeType, setBadgeType] = useState<'Standard' | 'VIP Scholar' | 'Student Filmmaker'>('VIP Scholar');
  const [isRegistered, setIsRegistered] = useState(false);
  const [passNumber] = useState(() => `ODY-${Math.floor(100000 + Math.random() * 900000)}`);

  if (!event) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistered(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#f59e0b', '#38bdf8', '#ffffff'],
      });
    } catch {
      // ignore
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const dynamicQrData = `${event.registration.qrValue}&pass=${passNumber}&attendee=${encodeURIComponent(attendeeName)}&tier=${encodeURIComponent(badgeType)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-xl rounded-2xl border border-amber-500/30 bg-[#070c18] text-slate-100 p-6 shadow-2xl overflow-hidden my-6"
        id="odyssey-registration-dialog"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800/80 border border-amber-500/20 text-slate-400 hover:text-white hover:border-amber-400"
          aria-label="Close registration"
        >
          <X className="w-5 h-5" />
        </button>

        {!isRegistered ? (
          <div>
            <div className="flex items-center gap-2 mb-2 text-amber-400 text-xs uppercase tracking-widest font-bold">
              <Ticket className="w-4 h-4" />
              <span>Departmental Event Pass & Accreditation</span>
            </div>

            <h3 className="font-epic text-xl font-bold text-slate-100">{event.title}</h3>
            <p className="font-serif-cormorant text-sm italic text-amber-200/80 mt-1">
              {event.date} &bull; {event.venue.name} ({event.venue.hall})
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-amber-400" /> Full Name
                </label>
                <input
                  type="text"
                  required
                  value={attendeeName}
                  onChange={(e) => setAttendeeName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-amber-500/20 text-slate-100 focus:outline-none focus:border-amber-400 transition-colors"
                  placeholder="e.g. Penelope Telemachus"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-amber-400" /> Institutional or Personal Email
                </label>
                <input
                  type="email"
                  required
                  value={attendeeEmail}
                  onChange={(e) => setAttendeeEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-amber-500/20 text-slate-100 focus:outline-none focus:border-amber-400 transition-colors"
                  placeholder="name@university.edu"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-amber-400" /> Department / Affiliation
                  </label>
                  <input
                    type="text"
                    value={affiliation}
                    onChange={(e) => setAffiliation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-amber-500/20 text-slate-100 focus:outline-none focus:border-amber-400 transition-colors"
                    placeholder="e.g. Cinema Studies"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Pass Category</label>
                  <select
                    value={badgeType}
                    onChange={(e) => setBadgeType(e.target.value as unknown as 'Standard' | 'VIP Scholar' | 'Student Filmmaker')}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-amber-500/20 text-slate-100 focus:outline-none focus:border-amber-400 transition-colors"
                  >
                    <option value="VIP Scholar">VIP Scholar / Delegate</option>
                    <option value="Student Filmmaker">Student Filmmaker</option>
                    <option value="Standard">General Attendee</option>
                  </select>
                </div>
              </div>

              {/* Event Perks */}
              <div className="p-3.5 rounded-xl bg-slate-900/70 border border-amber-500/10">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-1.5">
                  Included Pass Privileges
                </span>
                <ul className="space-y-1 text-slate-300 text-[11px]">
                  {event.registration.perks.map((perk, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  id="btn-confirm-registration"
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-[1.01]"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Digital Pass & QR</span>
                </button>

                <a
                  href={event.registration.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-semibold text-xs flex items-center justify-center gap-1.5 text-center transition-colors"
                >
                  <span>Direct URL</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </form>
          </div>
        ) : (
          /* Render Pass / Badge */
          <div className="space-y-5 animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>Pass Confirmed & Issued</span>
            </div>

            {/* 3D Ticket Badge Component */}
            <div
              id="printable-odyssey-pass"
              className="relative rounded-2xl overflow-hidden border-2 border-amber-400/60 bg-gradient-to-br from-slate-900 via-[#0a1024] to-black p-5 shadow-2xl text-slate-100"
            >
              {/* Badge Top Notch Motif */}
              <div className="flex items-start justify-between border-b border-amber-500/30 pb-4">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400">
                    THE ODYSSEY EVENT SERIES
                  </span>
                  <h4 className="font-epic text-base font-black text-slate-100 leading-tight">
                    {event.title}
                  </h4>
                  <p className="text-[11px] font-serif-cormorant italic text-amber-200/90 mt-0.5">
                    {event.date} &bull; {event.time}
                  </p>
                </div>

                <div className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-400 text-slate-950 shadow-md">
                  {badgeType}
                </div>
              </div>

              {/* Badge Center info & QR Code */}
              <div className="py-4 grid grid-cols-3 gap-4 items-center">
                <div className="col-span-2 space-y-2 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Attendee</span>
                    <p className="font-bold text-sm text-slate-100">{attendeeName}</p>
                    <p className="text-[11px] text-amber-300/80 truncate">{affiliation}</p>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Venue & Hall</span>
                    <p className="font-medium text-slate-200">{event.venue.name}</p>
                    <p className="text-[10px] text-slate-400">{event.venue.hall}</p>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Pass Identifier</span>
                    <p className="font-mono text-amber-400 font-bold">{passNumber}</p>
                  </div>
                </div>

                {/* QR Code Container */}
                <div className="flex flex-col items-center justify-center p-2.5 bg-white rounded-xl shadow-lg border border-amber-300">
                  <QRCodeSVG
                    value={dynamicQrData}
                    size={110}
                    level="H"
                    includeMargin={false}
                  />
                  <span className="text-[9px] text-slate-950 font-bold uppercase mt-1">Official Gate Scan</span>
                </div>
              </div>

              {/* Bottom security strip */}
              <div className="border-t border-dashed border-amber-500/30 pt-3 flex items-center justify-between text-[10px] text-slate-400">
                <span>Department of Cinema & Classical Studies</span>
                <span className="font-mono text-amber-400/80">AUTHENTICATED DIGITAL PASS</span>
              </div>
            </div>

            {/* Actions for pass */}
            <div className="flex flex-wrap gap-2 pt-2">
              <button
                type="button"
                onClick={handlePrint}
                className="flex-1 py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save Badge</span>
              </button>

              <a
                href={event.registration.url}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-xs flex items-center gap-1.5 transition-colors"
              >
                <span>Registration Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-4 rounded-xl bg-slate-900 border border-amber-500/20 text-slate-300 hover:text-white text-xs"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
