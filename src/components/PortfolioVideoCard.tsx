import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, Sparkles, Film, ArrowUpRight } from 'lucide-react';
import { PortfolioCategory } from '../types';
import { BlurImage } from './BlurImage';

interface PortfolioVideoCardProps {
  category: PortfolioCategory;
  categoryIcon: React.ReactNode;
  onSelectCategory: (category: PortfolioCategory) => void;
}

export const PortfolioVideoCard: React.FC<PortfolioVideoCardProps> = ({
  category,
  categoryIcon,
  onSelectCategory,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const videoSource = category.videoUrl || category.videoPreviewUrl;

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && !videoError) {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Autoplay policy or error fallback
          setIsPlaying(false);
        });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      if (total > 0) {
        setVideoProgress((current / total) * 100);
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const nextMuteState = !isMuted;
      videoRef.current.muted = nextMuteState;
      setIsMuted(nextMuteState);
    }
  };

  const togglePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => setVideoError(true));
      }
    }
  };

  return (
    <motion.div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelectCategory(category)}
      className={`group relative rounded-3xl bg-gradient-to-b ${category.gradientClass} text-white p-6 min-h-[500px] flex flex-col justify-between border ${category.borderClass} shadow-xl hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 cursor-pointer overflow-hidden transform hover:-translate-y-1.5`}
    >
      {/* Background Image / Ambient Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {category.imageUrl && (
          <BlurImage
            src={category.imageUrl}
            alt={category.title}
            className={`w-full h-full object-cover transition-all duration-700 ${
              isHovered && isPlaying ? 'scale-110 opacity-20 filter blur-xs' : 'scale-100 opacity-30 group-hover:opacity-40'
            }`}
          />
        )}
        <div className={`absolute inset-0 bg-gradient-to-b ${category.gradientClass} opacity-85 group-hover:opacity-75 transition-opacity duration-300`} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/20" />
      </div>

      {/* TOP BAR: Category Icon & Badges */}
      <div className="relative z-10 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/15 shadow-inner">
            {categoryIcon}
          </div>
          <span className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
            {category.title}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Live Video Preview Badge on Hover */}
          {isHovered && isPlaying && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-500/90 text-white border border-rose-400/50 backdrop-blur-md flex items-center gap-1.5 shadow-md font-mono"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              <span>LIVE VIDEO</span>
            </motion.span>
          )}

          <span className="px-3 py-1 rounded-full text-xs font-medium bg-black/50 backdrop-blur-md border border-white/15 text-slate-200">
            {category.projectCount}
          </span>
        </div>
      </div>

      {/* CENTER SHOWCASE: DYNAMIC VIDEO PREVIEW BOX */}
      <div className="relative z-10 my-4 w-full rounded-2xl overflow-hidden border border-white/20 group-hover:border-emerald-400/50 shadow-2xl transition-all duration-300 bg-slate-950/80 aspect-16/10 flex items-center justify-center">
        
        {/* Cover Image fallback / initial view */}
        {category.imageUrl && (
          <div className={`absolute inset-0 z-0 transition-opacity duration-500 ${isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <BlurImage
              src={category.imageUrl}
              alt={`${category.title} Preview`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
          </div>
        )}

        {/* HTML5 Loop Video Element for Hover Preview */}
        {videoSource && !videoError && (
          <video
            ref={videoRef}
            src={videoSource}
            muted={isMuted}
            loop
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onError={() => setVideoError(true)}
            className={`w-full h-full object-cover relative z-10 transition-opacity duration-500 ${
              isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          />
        )}

        {/* Dynamic Video HUD Controls on Hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute inset-0 z-20 flex flex-col justify-between p-3.5 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-slate-950/40 pointer-events-auto"
            >
              {/* Top HUD bar */}
              <div className="flex items-center justify-between text-[10px] font-bold text-white/90 font-mono">
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/80 backdrop-blur-md text-white flex items-center gap-1 shadow-sm">
                  <Film className="w-3 h-3" />
                  <span>Interactive Preview</span>
                </span>

                {/* Sound Mute/Unmute Toggle Button */}
                {videoSource && !videoError && isPlaying && (
                  <button
                    onClick={toggleMute}
                    aria-label={isMuted ? 'Unmute video preview' : 'Mute video preview'}
                    className="p-1.5 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/20 text-white transition-all cursor-pointer hover:scale-110"
                    title={isMuted ? 'Click to enable audio' : 'Muted'}
                  >
                    {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
                  </button>
                )}
              </div>

              {/* Center Play/Pause Quick Action */}
              <div className="self-center my-auto">
                <button
                  onClick={togglePlayPause}
                  aria-label={isPlaying ? 'Pause preview' : 'Play video preview'}
                  className="w-12 h-12 rounded-full bg-white/20 hover:bg-emerald-500/90 text-white backdrop-blur-md border border-white/40 flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-xl cursor-pointer"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 text-white" />
                  ) : (
                    <Play className="w-5 h-5 text-white ml-0.5 fill-white" />
                  )}
                </button>
              </div>

              {/* Bottom Video Progress Scrub Bar */}
              <div>
                <div className="flex items-center justify-between text-[10px] text-slate-300 font-mono mb-1">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-emerald-400" />
                    <span>Hovering Video Preview</span>
                  </span>
                  <span>{isPlaying ? 'Playing' : 'Paused'}</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/20 overflow-hidden backdrop-blur-xs">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-400 to-teal-300 transition-all duration-150 rounded-full"
                    style={{ width: `${videoProgress}%` }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Non-hover overlay cue */}
        {!isHovered && (
          <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-semibold text-white/90 z-20 pointer-events-none">
            <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center gap-1.5 shadow-sm">
              <Play className="w-3 h-3 text-emerald-400 fill-emerald-400" />
              <span>Hover for Video Preview</span>
            </span>
            <span className="opacity-80 flex items-center gap-0.5">
              <span>View</span>
              <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        )}
      </div>

      {/* BOTTOM SECTION: CATEGORY INFO & TAGS */}
      <div className="relative z-10 space-y-3.5 mt-auto">
        <div>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-emerald-200 transition-colors">
            {category.title}
          </h3>
          <p className="text-xs text-slate-300/80 mt-1 line-clamp-2">
            Explore client video reels, high-converting assets, and interactive case study milestones.
          </p>
        </div>

        {/* Tag Chips */}
        <div className="flex flex-wrap gap-1.5">
          {category.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white/10 hover:bg-white/20 border border-white/10 text-slate-200 transition-colors font-mono"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Watch Case Studies Action Button */}
        <div className="pt-2 flex items-center justify-between text-xs font-bold text-white/90 group-hover:text-white border-t border-white/10 mt-2">
          <span className="flex items-center gap-1.5 text-emerald-300 group-hover:text-emerald-200">
            <Film className="w-3.5 h-3.5" />
            <span>Watch Video Gallery</span>
          </span>
          <span className="inline-flex items-center gap-1 text-white group-hover:translate-x-1 transition-transform">
            <span>Explore Case Studies</span>
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </motion.div>
  );
};
