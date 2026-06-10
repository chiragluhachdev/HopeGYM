'use client';

import Image, { type ImageProps } from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/cn';

/**
 * next/image wrapper that fades the photo in once it has finished decoding,
 * over a dark placeholder. Prevents the jarring "blank box → pop" you get
 * with lazy-loaded remote images. Forwards all next/image props.
 */
export function Img({ className, onLoad, ...props }: ImageProps) {
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  // If the image was already cached/complete before this component hydrated,
  // `onLoad` won't fire again — reveal it immediately so it never gets stuck.
  useEffect(() => {
    if (ref.current?.complete) setLoaded(true);
  }, []);

  return (
    <Image
      ref={ref}
      {...props}
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
      className={cn(
        // transition both opacity (fade-in) and transform (hover-zoom) so a
        // caller's `group-hover:scale-*` keeps animating without clashing.
        'transition-[opacity,transform] duration-700 ease-out',
        loaded ? 'opacity-100' : 'opacity-0',
        className
      )}
    />
  );
}
