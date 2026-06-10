import { CountUp } from '@/components/ui/CountUp';
import { Reveal } from '@/components/ui/Reveal';
import { getStats } from '@/lib/api';

export async function StatsBand() {
  const stats = await getStats();
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-ink-800 py-16">
      <div className="absolute inset-0 bg-radial-glow" />
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 sm:px-8 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.id} delay={i * 0.1} className="text-center">
            <p className="font-display text-5xl text-white sm:text-6xl">
              <CountUp end={s.value} prefix={s.prefix} suffix={s.suffix} />
            </p>
            <div className="mx-auto mt-2 h-0.5 w-10 bg-brand" />
            <p className="mt-3 text-sm uppercase tracking-wide text-white/55">
              {s.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
