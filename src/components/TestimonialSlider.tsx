import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatarBg: string;
}

const testimonialsData: Testimonial[] = [
  {
    id: '1',
    name: 'Tanvir Ahmed',
    role: 'Managing Director',
    company: 'Learning Kabbo',
    content: 'Crafvanta Media transformed our digital presence completely. Our student enrollment skyrocketed by 240% within 3 months of launching our campaigns with them.',
    rating: 5,
    avatarBg: 'bg-blue-600 text-white',
  },
  {
    id: '2',
    name: 'Sarah Chowdhury',
    role: 'Chief Marketing Officer',
    company: 'SLSH Global',
    content: 'Their strategic approach to performance marketing and brand identity is unmatched. The team is proactive, highly responsive, and results-driven.',
    rating: 5,
    avatarBg: 'bg-emerald-600 text-white',
  },
  {
    id: '3',
    name: 'Rafiqul Islam',
    role: 'Founder & CEO',
    company: 'Dhaka Tech Solutions',
    content: 'From UI/UX design to full-stack web development, Crafvanta delivered beyond our highest expectations. Absolute professionals in every aspect.',
    rating: 5,
    avatarBg: 'bg-violet-600 text-white',
  },
  {
    id: '4',
    name: 'Nusrat Jahan',
    role: 'Head of E-commerce',
    company: 'Bengal Lifestyle',
    content: 'Our ROAS (Return on Ad Spend) jumped from 2.1x to 4.8x in just 60 days. Working with Crafvanta Media has been the best decision for our growth.',
    rating: 5,
    avatarBg: 'bg-amber-600 text-white',
  },
];

export function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-advance carousel
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
      }, 5000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  return (
    <section
      id="testimonials"
      className="py-24 bg-slate-50 dark:bg-[#060a13] relative overflow-hidden transition-colors border-t border-slate-200/60 dark:border-slate-800/60"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/5 dark:bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
            Client Testimonials
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Trusted by Industry Leaders
          </h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            See what founders, directors, and marketing heads say about partnering with Crafvanta Media.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden py-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-8 sm:p-12 shadow-xl shadow-slate-200/50 dark:shadow-none relative"
              >
                {/* Quote Icon watermark */}
                <div className="absolute top-6 right-8 text-slate-200 dark:text-slate-800/60 pointer-events-none select-none text-7xl font-serif">
                  “
                </div>

                <div className="flex items-center gap-1 text-amber-500 mb-6">
                  {[...Array(testimonialsData[currentIndex].rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>

                <p className="text-base sm:text-lg text-slate-700 dark:text-slate-200 leading-relaxed italic mb-8">
                  "{testimonialsData[currentIndex].content}"
                </p>

                <div className="flex items-center justify-between flex-wrap gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl ${testimonialsData[currentIndex].avatarBg} flex items-center justify-center font-bold text-lg shadow-md`}>
                      {testimonialsData[currentIndex].name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-base">
                        {testimonialsData[currentIndex].name}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {testimonialsData[currentIndex].role}, <strong className="text-slate-700 dark:text-slate-300">{testimonialsData[currentIndex].company}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/50">
                    Verified Partner
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex items-center gap-2">
              {testimonialsData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx
                      ? 'w-8 bg-blue-600 dark:bg-blue-500'
                      : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="w-10 h-10 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-sm cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                aria-label="Next testimonial"
                className="w-10 h-10 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-sm cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
