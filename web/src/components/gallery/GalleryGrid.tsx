'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Img } from '@/components/ui/Img';
import { AnimatePresence, motion } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { galleryCategories } from '@/data/gallery';
import type { GalleryCategory, GalleryItem } from '@/types';
import { cn } from '@/lib/cn';

export function GalleryGrid({ items: allItems }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState<GalleryCategory>('all');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const items =
    filter === 'all'
      ? allItems
      : allItems.filter((i) => i.category === filter);

  const openImage = lightbox !== null ? items[lightbox] : null;

  const step = (dir: number) =>
    setLightbox((cur) =>
      cur === null ? null : (cur + dir + items.length) % items.length
    );

  return (
    <>
      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-3">
        {galleryCategories.map((cat) => (
          <button
            key={cat.key}
            type="button"
            onClick={() => {
              setFilter(cat.key);
              setLightbox(null);
            }}
            className={cn(
              'rounded-full px-5 py-2.5 text-sm font-semibold transition-all',
              filter === cat.key
                ? 'bg-brand text-ink shadow-glow'
                : 'glass text-white/70 hover:text-white'
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Masonry-ish grid */}
      <motion.div
        layout
        className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5"
      >
        <AnimatePresence>
          {items.map((item, i) => (
            <motion.button
              key={item.id}
              type="button"
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={() => setLightbox(i)}
              className="group relative block w-full overflow-hidden rounded-2xl bg-ink-700"
            >
              <Img
                src={item.src}
                alt={item.alt}
                width={900}
                height={600}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="h-auto w-full object-cover group-hover:scale-105"
              />
              <span className="absolute inset-0 flex items-end bg-gradient-to-t from-ink-900/80 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="text-sm font-medium text-white">
                  {item.alt}
                </span>
              </span>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {openImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-900/95 p-4 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
          >
            <button
              type="button"
              aria-label="Close"
              className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-full glass text-white"
              onClick={() => setLightbox(null)}
            >
              <FiX size={24} />
            </button>

            <button
              type="button"
              aria-label="Previous image"
              className="absolute left-4 grid h-12 w-12 place-items-center rounded-full glass text-white sm:left-8"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
            >
              <FiChevronLeft size={26} />
            </button>

            <motion.div
              key={openImage.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative max-h-[85vh] w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={openImage.src}
                alt={openImage.alt}
                width={1400}
                height={933}
                className="mx-auto max-h-[85vh] w-auto rounded-2xl object-contain"
              />
              <p className="mt-4 text-center text-sm text-white/70">
                {openImage.alt}
              </p>
            </motion.div>

            <button
              type="button"
              aria-label="Next image"
              className="absolute right-4 grid h-12 w-12 place-items-center rounded-full glass text-white sm:right-8"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
            >
              <FiChevronRight size={26} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
