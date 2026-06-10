'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';

const faqs = [
  {
    q: 'Do you provide personal trainers?',
    a: 'Yes — certified personal trainers are available at every branch to guide your form, build your program and keep you accountable.',
  },
  {
    q: 'Can beginners join?',
    a: 'Absolutely. We welcome members of every level and create customized plans designed specifically for beginners.',
  },
  {
    q: 'Are diet plans included?',
    a: 'Nutrition guidance is available depending on your membership package, so you get the right plan to match your goals.',
  },
  {
    q: 'Do you offer trial sessions?',
    a: 'Yes — free or paid trial sessions can be offered by each branch. Walk in or message us on WhatsApp to book yours.',
  },
  {
    q: 'Does my membership work at all branches?',
    a: 'Half-Yearly and Annual members enjoy all-access across our branches. Monthly and Quarterly plans are tied to your home branch.',
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto mt-12 max-w-3xl space-y-3">
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div
            key={faq.q}
            className="overflow-hidden rounded-2xl glass transition-colors"
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="text-base font-semibold text-white sm:text-lg">
                {faq.q}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand/15 text-brand"
              >
                <FiPlus size={18} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="px-6 pb-5 text-sm leading-relaxed text-white/60">
                    {faq.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
