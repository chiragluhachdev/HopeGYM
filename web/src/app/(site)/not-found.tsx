import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-radial-glow px-5">
      <div className="text-center">
        <p className="font-display text-[8rem] leading-none text-brand-gradient sm:text-[12rem]">
          404
        </p>
        <h1 className="font-display text-4xl uppercase tracking-wide text-white sm:text-5xl">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-md text-white/60">
          Looks like this page skipped leg day. Let&apos;s get you back on
          track.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button href="/">Back to Home</Button>
          <Button href="/membership" variant="outline">
            View Plans
          </Button>
        </div>
      </div>
    </section>
  );
}
