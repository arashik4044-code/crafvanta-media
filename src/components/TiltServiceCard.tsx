import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ServiceItem } from '../types';
import { ArrowLeftRight, Check, Scale } from 'lucide-react';

interface TiltServiceCardProps {
  item: ServiceItem;
  isComparing: boolean;
  onToggleCompare: () => void;
  onOpenDetail: () => void;
}

export function TiltServiceCard({
  item,
  isComparing,
  onToggleCompare,
  onOpenDetail,
}: TiltServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Raw mouse offset normalized from -0.5 to 0.5
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for natural, tactile responsiveness
  const springConfig = { damping: 22, stiffness: 220, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Subtle tilt range (-7deg to 7deg)
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [6.5, -6.5]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-6.5, 6.5]);

  // Dynamic glare coordinates for subtle glass sheen
  const glareX = useTransform(smoothX, [-0.5, 0.5], [15, 85]);
  const glareY = useTransform(smoothY, [-0.5, 0.5], [15, 85]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const xPos = (e.clientX - rect.left) / rect.width - 0.5;
    const yPos = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(xPos);
    mouseY.set(yPos);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      style={{ perspective: 1000 }}
      className="h-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: 1.018 }}
        transition={{ scale: { duration: 0.2, ease: 'easeOut' } }}
        className={`group relative bg-white dark:bg-slate-900 rounded-3xl border overflow-hidden shadow-xs hover:shadow-2xl hover:shadow-emerald-500/10 transition-shadow duration-300 flex flex-col justify-between h-full will-change-transform ${
          isComparing
            ? 'border-emerald-500 ring-2 ring-emerald-500/50 shadow-emerald-500/15'
            : 'border-slate-200/80 dark:border-slate-800 hover:border-emerald-500/40 dark:hover:border-emerald-500/40'
        }`}
      >
        {/* Dynamic Glass Sheen on Hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-3xl z-30 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) =>
                `radial-gradient(circle 240px at ${gx}% ${gy}%, rgba(16, 185, 129, 0.12), transparent 70%)`
            ),
          }}
        />

        {/* Visual Device / Graphic Header with Image Support */}
        <div className="relative h-48 bg-gradient-to-br from-emerald-50 to-indigo-50/60 dark:from-slate-800 dark:to-slate-900 p-4 flex flex-col justify-between overflow-hidden border-b border-slate-100 dark:border-slate-800">
          {item.imageUrl ? (
            <>
              <img
                src={item.imageUrl}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-black/30 pointer-events-none" />
            </>
          ) : null}

          <div className="flex items-center justify-between z-10 w-full">
            <span className="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase bg-white/90 dark:bg-slate-900/90 text-emerald-700 dark:text-emerald-300 shadow-xs border border-emerald-100 dark:border-slate-700 backdrop-blur-xs">
              {item.category}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleCompare();
              }}
              className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full border transition-all cursor-pointer shadow-xs ${
                isComparing
                  ? 'bg-emerald-600 text-white border-emerald-600 ring-2 ring-emerald-400/50'
                  : 'bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700 hover:border-emerald-500 hover:text-emerald-600 backdrop-blur-xs'
              }`}
            >
              {isComparing ? (
                <>
                  <Check className="w-3 h-3 text-white" />
                  <span>Selected</span>
                </>
              ) : (
                <>
                  <ArrowLeftRight className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  <span>Compare</span>
                </>
              )}
            </button>
          </div>

          {/* Ambient Backdrop Shapes */}
          <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-emerald-400/20 rounded-full blur-xl pointer-events-none" />
        </div>

        {/* Card Content */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 font-mono mb-1.5">
              {item.badge}
            </div>
            <h3
              onClick={onOpenDetail}
              className="text-lg font-bold text-slate-950 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors cursor-pointer"
            >
              {item.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Card Footer */}
          <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <button
              onClick={onOpenDetail}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors cursor-pointer group-hover:translate-x-0.5"
            >
              <span>Learn more</span>
              <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
            <div className="flex items-center gap-1.5">
              <div className="flex gap-1">
                {item.tags.slice(0, 2).map((t, idx) => (
                  <span key={idx} className="text-[10px] text-slate-400 font-mono">
                    #{t}
                  </span>
                ))}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleCompare();
                }}
                title={isComparing ? 'Remove from comparison' : 'Add to side-by-side comparison'}
                className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                  isComparing
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'text-slate-400 hover:text-emerald-600 hover:border-emerald-500/50 border-transparent'
                }`}
              >
                <Scale className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
