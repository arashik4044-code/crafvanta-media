import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ServiceItem } from '../types';
import { ArrowLeftRight, X, Sparkles, Check } from 'lucide-react';

interface ServiceCompareDockProps {
  selectedServices: ServiceItem[];
  onRemoveService: (serviceId: string) => void;
  onClearAll: () => void;
  onOpenCompareModal: () => void;
}

export function ServiceCompareDock({
  selectedServices,
  onRemoveService,
  onClearAll,
  onOpenCompareModal,
}: ServiceCompareDockProps) {
  if (selectedServices.length === 0) return null;

  const isReady = selectedServices.length === 2;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="fixed bottom-6 inset-x-0 mx-auto z-40 max-w-xl px-4 pointer-events-auto"
      >
        <div className="bg-slate-900/95 dark:bg-slate-900/95 text-white backdrop-blur-xl border border-emerald-500/40 rounded-2xl p-3 sm:p-3.5 shadow-2xl flex items-center justify-between gap-3">
          
          {/* Left indicator & Slots */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <ArrowLeftRight className="w-4 h-4" />
            </div>

            {/* Chips */}
            <div className="flex items-center gap-2 overflow-x-auto py-0.5 no-scrollbar">
              {/* Slot 1 */}
              {selectedServices[0] && (
                <div className="flex items-center gap-1.5 bg-slate-800/90 border border-emerald-500/30 px-2.5 py-1 rounded-xl text-xs font-semibold shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="truncate max-w-[110px] sm:max-w-[140px]">
                    {selectedServices[0].title}
                  </span>
                  <button
                    onClick={() => onRemoveService(selectedServices[0].id)}
                    className="text-slate-400 hover:text-white ml-0.5"
                    title="Remove"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}

              {/* Slot 2 */}
              {selectedServices[1] ? (
                <div className="flex items-center gap-1.5 bg-slate-800/90 border border-teal-500/30 px-2.5 py-1 rounded-xl text-xs font-semibold shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                  <span className="truncate max-w-[110px] sm:max-w-[140px]">
                    {selectedServices[1].title}
                  </span>
                  <button
                    onClick={() => onRemoveService(selectedServices[1].id)}
                    className="text-slate-400 hover:text-white ml-0.5"
                    title="Remove"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 bg-slate-800/40 border border-dashed border-slate-700 px-2.5 py-1 rounded-xl text-xs text-slate-400 shrink-0">
                  <span>+ Pick 2nd service</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenCompareModal}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md ${
                isReady
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white animate-pulse'
                  : 'bg-emerald-600/80 hover:bg-emerald-600 text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isReady ? 'Compare Now (2/2)' : 'Compare (1/2)'}</span>
            </button>

            <button
              onClick={onClearAll}
              title="Clear comparison selection"
              className="text-slate-400 hover:text-slate-200 text-xs px-2 py-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Clear
            </button>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
}
