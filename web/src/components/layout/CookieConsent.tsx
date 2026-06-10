'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { Button } from '@/components/ui/Button';

const STORAGE_KEY = 'hopegym-cookie-consent';

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        const t = setTimeout(() => setVisible(true), 1500);
        return () => clearTimeout(t);
      }
    } catch {
      /* storage unavailable — skip */
    }
  }, []);

  function decide(value: 'accepted' | 'declined') {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-2xl rounded-2xl glass-strong p-5 shadow-card sm:inset-x-auto sm:left-7"
        >
          <button
            type="button"
            aria-label="Dismiss"
            onClick={() => decide('declined')}
            className="absolute right-3 top-3 text-white/50 hover:text-white"
          >
            <FiX size={18} />
          </button>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <p className="flex-1 text-sm leading-relaxed text-white/70">
              🍪 We use cookies to enhance your experience, analyse traffic and
              personalise content. By clicking “Accept”, you agree to our use of
              cookies.
            </p>
            <div className="flex shrink-0 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => decide('declined')}
              >
                Decline
              </Button>
              <Button size="sm" onClick={() => decide('accepted')}>
                Accept
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
