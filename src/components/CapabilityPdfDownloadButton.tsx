import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, CheckCircle2, FileText, Loader2, Sparkles, X, ExternalLink, ShieldCheck } from 'lucide-react';
import { triggerPdfDownload } from '../utils/capabilityPdf';

interface CapabilityPdfDownloadButtonProps {
  className?: string;
  variant?: 'header' | 'hero' | 'floating';
}

export const CapabilityPdfDownloadButton: React.FC<CapabilityPdfDownloadButtonProps> = ({
  className = '',
  variant = 'header',
}) => {
  const [downloadState, setDownloadState] = useState<'idle' | 'downloading' | 'completed'>('idle');
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);

  const handleDownload = () => {
    if (downloadState === 'downloading') return;

    setDownloadState('downloading');
    setDownloadProgress(10);

    triggerPdfDownload(
      (percent) => {
        setDownloadProgress(percent);
      },
      () => {
        setDownloadState('completed');
        setShowToast(true);

        // Reset button back to idle after 4 seconds
        setTimeout(() => {
          setDownloadState('idle');
        }, 4000);

        // Hide toast automatically after 6 seconds
        setTimeout(() => {
          setShowToast(false);
        }, 6000);
      }
    );
  };

  return (
    <div className="relative inline-block">
      {/* MAIN DOWNLOAD BUTTON */}
      <button
        onClick={handleDownload}
        disabled={downloadState === 'downloading'}
        className={`relative group inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer shadow-xs hover:shadow-md ${
          downloadState === 'completed'
            ? 'bg-emerald-600 text-white border border-emerald-500 shadow-emerald-500/20 ring-2 ring-emerald-500/30'
            : downloadState === 'downloading'
            ? 'bg-slate-900 text-white border border-slate-700 cursor-wait'
            : variant === 'header'
            ? 'bg-slate-900 hover:bg-slate-950 dark:bg-emerald-950/80 dark:hover:bg-emerald-900 text-white border border-slate-800 dark:border-emerald-700/60 hover:border-emerald-500/60'
            : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20'
        } ${className}`}
      >
        {/* Progress Background Overlay */}
        {downloadState === 'downloading' && (
          <div
            className="absolute inset-0 bg-emerald-600/30 rounded-full transition-all duration-200"
            style={{ width: `${downloadProgress}%` }}
          />
        )}

        {/* Icon */}
        <span className="relative z-10">
          {downloadState === 'downloading' ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-400" />
          ) : downloadState === 'completed' ? (
            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
          ) : (
            <Download className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-y-0.5 transition-transform" />
          )}
        </span>

        {/* Text */}
        <span className="relative z-10 whitespace-nowrap">
          {downloadState === 'downloading'
            ? `Preparing PDF (${downloadProgress}%)...`
            : downloadState === 'completed'
            ? 'Deck PDF Downloaded!'
            : 'Download Capability PDF'}
        </span>

        {/* Badge Ribbon */}
        {downloadState === 'idle' && (
          <span className="relative z-10 px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[9px] font-mono font-black border border-emerald-500/30">
            2026 DECK
          </span>
        )}
      </button>

      {/* SUCCESS TOAST NOTIFICATION BANNER */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 max-w-md bg-slate-950 border border-emerald-500/40 text-white rounded-2xl p-4 shadow-2xl backdrop-blur-xl flex items-start gap-3"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-600/30">
              <FileText className="w-5 h-5" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Capability Deck PDF Saved!</span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5 leading-snug truncate">
                Crafvanta_Media_Agency_Capability_Deck_2026.pdf
              </p>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => {
                    setShowToast(false);
                    setShowSummaryModal(true);
                  }}
                  className="text-[11px] font-bold text-emerald-400 hover:text-emerald-300 underline underline-offset-2 cursor-pointer flex items-center gap-1"
                >
                  <span>Preview Deck Highlights</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowToast(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CAPABILITY DECK SUMMARY MODAL */}
      <AnimatePresence>
        {showSummaryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-900 dark:text-white space-y-6 max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-mono">
                      OFFICIAL AGENCY CREDENTIALS
                    </span>
                    <h3 className="text-xl font-black">
                      Crafvanta Media Capability Deck 2026
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setShowSummaryModal(false)}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/80">
                  <span className="font-bold text-emerald-700 dark:text-emerald-300 block mb-1">
                    📄 File Saved To Downloads:
                  </span>
                  <code className="text-[11px] font-mono text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 px-2 py-1 rounded border border-slate-200 dark:border-slate-800 block">
                    Crafvanta_Media_Agency_Capability_Deck_2026.pdf
                  </code>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono text-xs">
                    Included Deck Sections:
                  </h4>
                  <ul className="space-y-1.5 list-disc list-inside text-xs">
                    <li><strong>Agency Overview & Technical Stack:</strong> Next.js, Node.js, POS/ERP Cloud Architecture.</li>
                    <li><strong>Growth Marketing Capabilities:</strong> Meta Ads, Google Search/PPC, TikTok Advertising.</li>
                    <li><strong>Verified Case Studies:</strong> Kacchi Bhai (+480% Orders), Heaven Bakers (4.8x ROAS), Ranga Fashion (3.4x Conversion).</li>
                    <li><strong>Commercial Retainer Tiers & SLA Guarantees.</strong></li>
                  </ul>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                <button
                  onClick={() => handleDownload()}
                  className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Download Again</span>
                </button>

                <button
                  onClick={() => setShowSummaryModal(false)}
                  className="px-6 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/25 cursor-pointer"
                >
                  Close Preview
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
