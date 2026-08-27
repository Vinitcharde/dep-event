import React from 'react';
import { Compass, ArrowRight } from 'lucide-react';
import { ViewMode } from '../types';

interface NavbarProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenCMS: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-amber-500/20 bg-[#040711]/85 backdrop-blur-xl transition-all">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber-400/40 bg-gradient-to-br from-amber-500/15 via-slate-900 to-black shadow-[0_0_18px_rgba(212,175,55,0.2)]">
              <Compass className="h-5 w-5 text-amber-400" />
            </div>

            <div className="leading-none">
              <div className="flex items-center gap-3">
                <span className="font-epic text-base sm:text-lg font-black tracking-[0.2em] text-slate-100 uppercase">
                  The Odyssey
                </span>
              </div>
              <p className="mt-1 text-[11px] font-serif-cormorant italic text-amber-200/80">
                Department of Cinema & Classical Media Arts
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-slate-900/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-amber-300">
              <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.9)]" />
              Data Dive 5.0
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
