'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';
import { FiArrowUp } from 'react-icons/fi';
import { siteConfig, whatsappLink } from '@/lib/site';

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-center gap-3 sm:bottom-7 sm:right-7">
      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="grid h-12 w-12 place-items-center rounded-full glass-strong text-white shadow-card transition-colors hover:text-brand"
          >
            <FiArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      <a
        href={siteConfig.contact.phoneHref}
        aria-label="Call us"
        className="grid h-12 w-12 place-items-center rounded-full bg-white text-ink shadow-card transition-transform hover:scale-105"
      >
        <FaPhoneAlt size={17} />
      </a>

      <a
        href={whatsappLink('Hi Hope Gym & Spa! I would like to know more about membership.')}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-card transition-transform hover:scale-105"
      >
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-[#25D366]" />
        <FaWhatsapp size={28} className="relative" />
      </a>
    </div>
  );
}
