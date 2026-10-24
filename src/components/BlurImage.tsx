import React, { useState } from 'react';
import { motion } from 'motion/react';

interface Props {
  src: string;
  alt: string;
  className?: string;
  style?: any;
}

export const BlurImage: React.FC<Props> = ({ src, alt, className, style }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-all duration-700 ease-in-out ${loaded ? 'blur-0' : 'blur-xl scale-105'}`}
        style={style}
        onLoad={() => setLoaded(true)}
        loading="lazy"
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
      />
    </div>
  );
};
