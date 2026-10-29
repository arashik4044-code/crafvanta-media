import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface Props {
  src?: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

export const BlurImage: React.FC<Props> = ({ src, alt, className = '', style }) => {
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string>('');

  useEffect(() => {
    let resolved = src || '';
    if (resolved.startsWith('/src/assets/images/')) {
      resolved = resolved.replace('/src/assets/images/', '/assets/images/');
    } else if (resolved && !resolved.startsWith('/') && !resolved.startsWith('http')) {
      resolved = `/assets/images/${resolved}`;
    }
    setCurrentSrc(resolved);
    setLoaded(false);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    if (!currentSrc) {
      setHasError(true);
      return;
    }
    // If /assets/images/ failed, try root or fallback
    if (currentSrc.startsWith('/assets/images/')) {
      const filename = currentSrc.split('/').pop();
      if (filename && currentSrc !== `/${filename}`) {
        setCurrentSrc(`/${filename}`);
        return;
      }
    }
    // High-quality fallback if file is unavailable
    setCurrentSrc('https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80');
    setHasError(true);
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {currentSrc && (
        <motion.img
          src={currentSrc}
          alt={alt}
          className={`w-full h-full object-cover transition-all duration-700 ease-in-out ${loaded ? 'blur-0' : 'blur-xl scale-105'}`}
          style={style}
          onLoad={() => setLoaded(true)}
          onError={handleError}
          loading="lazy"
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded || hasError ? 1 : 0 }}
        />
      )}
    </div>
  );
};
