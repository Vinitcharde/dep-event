import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Copy,
  CheckCircle2,
  Share2,
  QrCode,
  Globe,
  Mail,
  Send,
  MessageCircle,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { DepartmentEvent } from '../types';

export interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  event?: DepartmentEvent | null;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, event }) => {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  if (!isOpen) return null;

  const baseUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${window.location.pathname}`
    : 'http://localhost:3000';

  const shareUrl = event
    ? `${baseUrl}?event=${encodeURIComponent(event.id)}`
    : baseUrl;

  const shareTitle = event
    ? `${event.title} | DATA DIVE 5.0 — Department of Data Science`
    : 'DATA DIVE 5.0 | Department of Data Science Events & Symposium';

  const shareText = event
    ? `Check out "${event.title}" (${event.category}) at DATA DIVE 5.0! Date: ${event.date} at ${event.venue.name}. Register & view details here:`
    : `Explore DATA DIVE 5.0 — Departmental Events, Technical Challenges, Startup Pitches & IPL Auction Arena! Check out the full roster here:`;

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = shareUrl;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.log('Share dismissed', err);
      }
    } else {
      handleCopyLink();
    }
  };

  const sharePlatforms = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'hover:bg-[#25D366]/20 hover:text-[#25D366] border-[#25D366]/30',
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + '\n' + shareUrl)}`,
    },
    {
      name: 'Telegram',
      icon: Send,
      color: 'hover:bg-[#229ED9]/20 hover:text-[#229ED9] border-[#229ED9]/30',
      url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
    },
    {
      name: 'LinkedIn',
      icon: () => (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      ),
      color: 'hover:bg-[#0077b5]/20 hover:text-[#0077b5] border-[#0077b5]/30',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'hover:bg-indigo-500/20 hover:text-indigo-300 border-indigo-500/30',
      url: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`,
    },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative w-full max-w-lg rounded-3xl border border-slate-800 bg-[#070b16] p-6 sm:p-8 shadow-2xl text-slate-100 overflow-hidden"
          role="dialog"
          aria-modal="true"
        >
          {/* Header */}
          <div className="relative flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-indigo-500/40 bg-indigo-500/10 text-indigo-400">
                <Share2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-epic text-base font-bold text-white uppercase tracking-wider">
                  {event ? 'Share Event Dossier' : 'Share Departmental Platform'}
                </h3>
                <p className="text-xs text-indigo-300 font-medium">
                  {event ? event.title : 'DATA DIVE 5.0 • Department of Data Science'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl border border-slate-700 bg-slate-800/80 text-slate-400 hover:text-white transition-colors"
              aria-label="Close share dialog"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Main Content Area */}
          <div className="relative mt-6 space-y-4">
            {/* Direct Link Box */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Direct Link
              </label>
              <div className="flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900 p-1.5 pl-3">
                <Globe className="w-4 h-4 text-indigo-400 shrink-0" />
                <input
                  type="text"
                  readOnly
                  value={shareUrl}
                  className="w-full bg-transparent text-xs text-slate-200 outline-none select-all font-mono truncate"
                />
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    copied
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                  }`}
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Toggle QR Code View */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-slate-400">
                {showQR ? 'Scan with your smartphone camera:' : 'Share via apps:'}
              </span>
              <button
                type="button"
                onClick={() => setShowQR(!showQR)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                <QrCode className="w-3.5 h-3.5" />
                {showQR ? 'Hide QR Code' : 'Show QR Code'}
              </button>
            </div>

            {/* QR Code Card View */}
            {showQR ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-col items-center justify-center p-4 rounded-2xl border border-slate-800 bg-slate-900/60"
              >
                <div className="p-3 bg-white rounded-xl shadow-lg">
                  <QRCodeSVG value={shareUrl} size={150} level="H" includeMargin={false} />
                </div>
                <p className="mt-3 text-xs text-slate-400 text-center">
                  Point smartphone camera at this code to open the site directly.
                </p>
              </motion.div>
            ) : (
              /* Social Share Buttons Grid */
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {sharePlatforms.map((platform) => {
                  const Icon = platform.icon;
                  return (
                    <a
                      key={platform.name}
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-2xl border border-slate-800 bg-slate-900/70 text-slate-300 transition-all ${platform.color} active:scale-95`}
                      title={`Share on ${platform.name}`}
                    >
                      <Icon />
                      <span className="text-xs font-semibold">
                        {platform.name}
                      </span>
                    </a>
                  );
                })}
              </div>
            )}

            {/* Native Share button */}
            {typeof navigator !== 'undefined' && 'share' in navigator && (
              <button
                type="button"
                onClick={handleNativeShare}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border border-indigo-500/40 bg-indigo-600/15 text-xs font-bold uppercase tracking-wider text-indigo-300 hover:bg-indigo-600/25 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Open Device Share Menu</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-70" />
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
