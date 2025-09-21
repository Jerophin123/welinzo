'use client';

import { useState } from 'react';
import { UserCircle } from 'lucide-react';

interface AvatarProps {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export default function Avatar({ src, alt, size = 'md', className = '' }: AvatarProps) {
  const [imageError, setImageError] = useState(false);
  
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  const iconSizes = {
    sm: 16,
    md: 24,
    lg: 32,
    xl: 40
  };

  if (!src || imageError) {
    return (
      <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-r from-slate-600 to-slate-700 flex items-center justify-center ${className}`}>
        <UserCircle size={iconSizes[size]} className="text-white" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setImageError(true)}
      className={`${sizeClasses[size]} rounded-full object-cover ${className}`}
    />
  );
}
