import React from 'react';
import {
  Globe,
  RotateCw,
  Eye,
  Layers,
  Film,
  Compass,
  Play,
  Pause,
  Maximize2,
  Minimize2,
  Search,
  Filter,
  Sparkles,
  Zap,
  LayoutGrid,
  Radio,
  Tv,
} from 'lucide-react';
import { DepartmentEvent, ViewMode, CameraPreset } from '../types';

interface SpatialHUDControlsProps {
  events: DepartmentEvent[];
  selectedEvent: DepartmentEvent | null;
  onSelectEvent: (event: DepartmentEvent) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  autoOrbit: boolean;
  onToggleAutoOrbit: () => void;
  cameraPreset: CameraPreset;
  onCameraPresetChange: (preset: CameraPreset) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onCategorySelect: (cat: string) => void;
  categories: string[];
  onOpenCinema: () => void;
}

const CATEGORY_COLORS: Record<string, { dot: string; border: string; text: string; bg: string }> = {
  'Data Science & Machine Learning': {
    dot: 'bg-[#00f0ff]',
    border: 'border-[#00f0ff]/40',
    text: 'text-[#00f0ff]',
    bg: 'bg-[#00f0ff]/10',
  },
  'Entrepreneurship & Innovation': {
    dot: 'bg-[#f59e0b]',
    border: 'border-[#f59e0b]/40',
    text: 'text-[#f59e0b]',
    bg: 'bg-[#f59e0b]/10',
  },
  'Sports & Gaming Strategy': {
    dot: 'bg-[#a855f7]',
    border: 'border-[#a855f7]/40',
    text: 'text-[#a855f7]',
    bg: 'bg-[#a855f7]/10',
  },
  'Cinema & Production': {
    dot: 'bg-[#38bdf8]',
    border: 'border-[#38bdf8]/40',
    text: 'text-[#38bdf8]',
    bg: 'bg-[#38bdf8]/10',
  },
  'Keynote Gala': {
    dot: 'bg-[#ffd700]',
    border: 'border-[#ffd700]/40',
    text: 'text-[#ffd700]',
    bg: 'bg-[#ffd700]/10',
  },
};

const DEFAULT_CATEGORY = {
  dot: 'bg-[#fbbf24]',
  border: 'border-[#fbbf24]/40',
  text: 'text-[#fbbf24]',
  bg: 'bg-[#fbbf24]/10',
};

export const SpatialHUDControls: React.FC<SpatialHUDControlsProps> = ({
  events,
  selectedEvent,
  onSelectEvent,
  viewMode,
  onViewModeChange,
  autoOrbit,
  onToggleAutoOrbit,
  cameraPreset,
  onCameraPresetChange,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategorySelect,
  categories,
  onOpenCinema,
}) => {
  return (
    <div className="space-y-4 my-6" id="spatial-hud-controls-dock">
      {/* ── Top Bar: 3D View Modes & Camera Controls ────────────── */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 p-2.5 rounded-2xl border border-amber-500/25 bg-[#060b18]/90 backdrop-blur-xl shadow-xl">
        
        {/* 3D Mode Selector Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 pl-2 pr-1 hidden sm:inline">
            3D Mode:
          </span>

          <button
            type="button"
            onClick={() => onViewModeChange('3d-orbit-arena')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              viewMode === '3d-orbit-arena'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-[0_0_16px_rgba(251,191,36,0.35)]'
                : 'bg-slate-900/80 text-slate-300 border border-slate-700/60 hover:border-amber-400/40 hover:text-amber-200'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>3D Orbit Arena</span>
          </button>

          <button
            type="button"
            onClick={() => onViewModeChange('3d-holo-ring')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              viewMode === '3d-holo-ring'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-[0_0_16px_rgba(6,182,212,0.35)]'
                : 'bg-slate-900/80 text-slate-300 border border-slate-700/60 hover:border-cyan-400/40 hover:text-cyan-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Holo-Ring Cylinder</span>
          </button>

          <button
            type="button"
            onClick={() => onViewModeChange('3d-voyage-warp')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              viewMode === '3d-voyage-warp'
                ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-slate-950 shadow-[0_0_16px_rgba(168,85,247,0.35)]'
                : 'bg-slate-900/80 text-slate-300 border border-slate-700/60 hover:border-purple-400/40 hover:text-purple-200'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Voyage Warp Spline</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onViewModeChange('3d-holo-cinema');
              onOpenCinema();
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              viewMode === '3d-holo-cinema'
                ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-slate-950 shadow-[0_0_16px_rgba(244,63,94,0.35)]'
                : 'bg-slate-900/80 text-slate-300 border border-slate-700/60 hover:border-rose-400/40 hover:text-rose-200'
            }`}
          >
            <Tv className="w-3.5 h-3.5" />
            <span>3D Holo-Cinema</span>
          </button>

          <button
            type="button"
            onClick={() => onViewModeChange('3d-grid')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              viewMode === '3d-grid'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'bg-slate-900/80 text-slate-300 border border-slate-700/60 hover:border-amber-400/40 hover:text-amber-200'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>3D Grid Roster</span>
          </button>
        </div>

        {/* Camera Presets & Auto Orbit Controls */}
        <div className="flex items-center gap-2 self-end lg:self-auto shrink-0">
          {/* Auto Orbit Toggle */}
          <button
            type="button"
            onClick={onToggleAutoOrbit}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              autoOrbit
                ? 'bg-amber-500/20 text-amber-300 border border-amber-400/50 shadow-[0_0_12px_rgba(251,191,36,0.25)]'
                : 'bg-slate-900/80 text-slate-400 border border-slate-700 hover:text-white'
            }`}
            title={autoOrbit ? 'Pause 360° Auto-Orbit' : 'Enable 360° Auto-Orbit'}
          >
            {autoOrbit ? (
              <>
                <Pause className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Orbiting</span>
              </>
            ) : (
              <>
                <RotateCw className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Auto-Orbit</span>
              </>
            )}
          </button>

          {/* Camera Angles */}
          <div className="flex items-center rounded-xl bg-slate-900 border border-slate-700/80 p-0.5 text-[11px] font-semibold text-slate-300">
            <button
              type="button"
              onClick={() => onCameraPresetChange('front')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                cameraPreset === 'front' ? 'bg-amber-500 text-slate-950 font-bold' : 'hover:text-white'
              }`}
            >
              Front
            </button>
            <button
              type="button"
              onClick={() => onCameraPresetChange('perspective')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                cameraPreset === 'perspective' ? 'bg-amber-500 text-slate-950 font-bold' : 'hover:text-white'
              }`}
            >
              Angle
            </button>
            <button
              type="button"
              onClick={() => onCameraPresetChange('top')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                cameraPreset === 'top' ? 'bg-amber-500 text-slate-950 font-bold' : 'hover:text-white'
              }`}
            >
              Top
            </button>
          </div>
        </div>
      </div>

      {/* ── Event Quick Jumper Station Pills ───────────────────── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 shrink-0 flex items-center gap-1">
          <Radio className="w-3 h-3 text-amber-400 animate-pulse" />
          <span>Jump to 3D Station:</span>
        </span>

        {events.map((ev) => {
          const isSelected = selectedEvent?.id === ev.id;
          const style = CATEGORY_COLORS[ev.category] || DEFAULT_CATEGORY;

          return (
            <button
              key={ev.id}
              type="button"
              onClick={() => onSelectEvent(ev)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all shrink-0 active:scale-95 ${
                isSelected
                  ? `${style.bg} ${style.border} ${style.text} shadow-[0_0_16px_rgba(255,255,255,0.15)] ring-1 ring-amber-400`
                  : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-600 hover:text-white'
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${style.dot} shadow-[0_0_6px_currentColor]`} />
              <span className="font-epic">{ev.title}</span>
              <span className="text-[10px] text-slate-400 font-mono hidden md:inline">({ev.badge})</span>
            </button>
          );
        })}
      </div>

      {/* ── Search & Filter Controls ───────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-2.5 rounded-2xl border border-slate-800 bg-[#050914]/80 backdrop-blur-md">
        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search 3D events, topics, ML, IPL..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-slate-900/90 border border-slate-700/60 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none pb-1 sm:pb-0">
          <Filter className="w-3.5 h-3.5 text-amber-400 shrink-0 hidden md:inline" />
          {categories.map((cat) => {
            const isCatActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onCategorySelect(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                  isCatActive
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
