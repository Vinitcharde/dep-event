import React from 'react';
import { Compass, Mail, MapPin, Phone, ShieldCheck, Heart, ExternalLink, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative border-t border-amber-500/20 bg-[#03050c] text-slate-400 text-xs mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Col 1: Department Info */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-400/40 bg-amber-500/10 text-amber-400">
                <Compass className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-epic text-sm font-bold text-slate-100 uppercase tracking-widest">
                  Department of Cinema & Classical Media
                </h4>
                <p className="font-serif-cormorant text-xs italic text-amber-300/80">
                  The Odyssey Colloquium & Epic Filmmaking Series
                </p>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed text-xs max-w-md">
              Fostering interdisciplinary study connecting ancient Hellenic epics, classical reception, narrative dramaturgy, and modern immersive cinema technologies.
            </p>

            <div className="flex items-center gap-4 text-slate-400 text-xs">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Accredited Academic Series</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                <span>BFI & AMPAS Partnered</span>
              </span>
            </div>
          </div>

          {/* Col 2: Campus Locations */}
          <div className="space-y-3">
            <h5 className="font-epic text-xs font-bold text-slate-100 uppercase tracking-wider">
              Venues & Campus Map
            </h5>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>Amphitheater of the Muses, Room 101</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>LED Volume Stage B, Innovation Center</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>Cinema Apollo Grand Theatre & Colonnade</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Department Contact & Support */}
          <div className="space-y-3">
            <h5 className="font-epic text-xs font-bold text-slate-100 uppercase tracking-wider">
              Colloquium Inquiries
            </h5>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span>odyssey-events@cinema.edu</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span>+1 (555) 472-6397</span>
              </li>
              <li>
                <a
                  href="https://odyssey-cinema.edu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 transition-colors"
                >
                  <span>Departmental Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>&copy; {new Date().getFullYear()} Faculty of Cinema, Media Arts & Classical Studies. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Crafted for The Odyssey Event Series</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
