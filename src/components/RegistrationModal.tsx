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
  const [attendeeName, setAttendeeName] = useState('Alex Rivera');
  const [attendeeEmail, setAttendeeEmail] = useState('alex.rivera@university.edu');
  const [affiliation, setAffiliation] = useState('Department of Data Science & Computing');
  const [badgeType, setBadgeType] = useState<'Student Participant' | 'Delegate' | 'VIP Participant'>('Student Participant');
  const [isRegistered, setIsRegistered] = useState(false);
  const [passNumber] = useState(() => `DD5-${Math.floor(100000 + Math.random() * 900000)}`);

  if (!event) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistered(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#38bdf8', '#34d399', '#ffffff'],
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
        className="relative w-full max-w-xl rounded-3xl border border-slate-800 bg-[#070b16] text-slate-100 p-6 sm:p-8 shadow-2xl overflow-hidden my-6"
        id="datadive-registration-dialog"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-400 hover:text-white hover:border-indigo-400 transition-colors"
          aria-label="Close registration"
        >
          <X className="w-5 h-5" />
        </button>

        {!isRegistered ? (
          <div>
            <div className="flex items-center gap-2 mb-2 text-indigo-400 text-xs uppercase tracking-widest font-bold">
              <Ticket className="w-4 h-4" />
              <span>Event Pass &amp; Accreditation</span>
            </div>

            <h3 className="font-epic text-xl sm:text-2xl font-bold text-white">{event.title}</h3>
            <p className="font-serif-cormorant text-sm italic text-slate-300 mt-1">
              {event.date} &bull; {event.venue.name} ({event.venue.hall})
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-indigo-400" /> Full Name
                </label>
                <input
                  type="text"
                  required
                  value={attendeeName}
                  onChange={(e) => setAttendeeName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                  placeholder="e.g. Alex Rivera"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-indigo-400" /> Institutional Email
                </label>
                <input
                  type="email"
                  required
                  value={attendeeEmail}
                  onChange={(e) => setAttendeeEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                  placeholder="name@university.edu"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-indigo-400" /> Department / College Affiliation
                </label>
                <input
                  type="text"
                  value={affiliation}
                  onChange={(e) => setAffiliation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                  placeholder="e.g. Department of Data Science"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">
                  Participant Tier
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Student Participant', 'Delegate', 'VIP Participant'] as const).map((tier) => (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => setBadgeType(tier)}
                      className={`py-2 px-2 rounded-xl text-center font-bold text-[11px] transition-all border ${
                        badgeType === tier
                          ? 'bg-indigo-600 border-indigo-400 text-white shadow-md'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Verified Pass</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Registered Pass State */
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-emerald-400 text-xs uppercase tracking-widest font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Pass Confirmed &bull; Verified</span>
            </div>

            {/* Printable Pass Card */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-indigo-500/40 space-y-4 shadow-xl">
              <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">DATA DIVE 5.0 PASS</span>
                  <h4 className="font-epic text-lg font-bold text-white">{event.title}</h4>
                  <p className="text-xs text-slate-400">{event.venue.name} &bull; {event.venue.hall}</p>
                </div>
                <div className="px-2.5 py-1 rounded-md bg-indigo-500/20 text-indigo-300 text-[10px] font-bold uppercase">
                  {badgeType}
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1 text-xs">
                  <p><strong className="text-slate-400">Attendee:</strong> <span className="text-white">{attendeeName}</span></p>
                  <p><strong className="text-slate-400">Email:</strong> <span className="text-white">{attendeeEmail}</span></p>
                  <p><strong className="text-slate-400">Pass Code:</strong> <span className="font-mono text-indigo-300 font-bold">{passNumber}</span></p>
                </div>

                <div className="bg-white p-2 rounded-xl shrink-0 shadow">
                  <QRCodeSVG value={dynamicQrData} size={90} level="M" />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handlePrint}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-slate-700"
              >
                <Printer className="w-4 h-4" />
                <span>Print Pass</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500"
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
