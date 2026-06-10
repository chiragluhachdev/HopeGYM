import { FaCheck, FaMinus } from 'react-icons/fa';
import { comparisonFeatures } from '@/data/plans';
import type { MembershipPlan } from '@/types';
import { Reveal } from '@/components/ui/Reveal';

function Cell({ value }: { value: boolean | string }) {
  if (value === true)
    return (
      <span className="mx-auto grid h-7 w-7 place-items-center rounded-full bg-brand/15 text-brand">
        <FaCheck size={12} />
      </span>
    );
  if (value === false)
    return (
      <span className="mx-auto grid h-7 w-7 place-items-center rounded-full bg-white/5 text-white/25">
        <FaMinus size={12} />
      </span>
    );
  return <span className="text-sm font-medium text-white/80">{value}</span>;
}

export function ComparisonTable({ plans }: { plans?: MembershipPlan[] }) {
  // Use provided plans or fall back to a derived set from comparison features
  const displayPlans = plans || [];
  const intervals: MembershipPlan['interval'][] = ['monthly', 'quarterly', 'half-yearly', 'annual'];

  return (
    <Reveal className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-separate border-spacing-0">
        <thead>
          <tr>
            <th className="sticky left-0 z-10 bg-ink px-5 py-5 text-left font-display text-lg uppercase tracking-wide text-white/70">
              Features
            </th>
            {displayPlans.length > 0
              ? displayPlans.map((plan) => (
                  <th
                    key={plan.id}
                    className="px-5 py-5 text-center font-display text-xl uppercase tracking-wide text-white"
                  >
                    {plan.name}
                    {plan.highlighted && (
                      <span className="mt-1 block text-[10px] font-semibold tracking-normal text-brand">
                        Most Popular
                      </span>
                    )}
                  </th>
                ))
              : intervals.map((iv) => (
                  <th
                    key={iv}
                    className="px-5 py-5 text-center font-display text-xl uppercase tracking-wide text-white"
                  >
                    {iv}
                  </th>
                ))}
          </tr>
        </thead>
        <tbody>
          {comparisonFeatures.map((feature, i) => (
            <tr
              key={feature.label}
              className={i % 2 === 0 ? 'bg-white/[0.02]' : ''}
            >
              <td className="sticky left-0 z-10 bg-ink px-5 py-4 text-sm font-medium text-white/70">
                {feature.label}
              </td>
              {(displayPlans.length > 0
                ? displayPlans.map((p) => p.interval)
                : intervals
              ).map((iv) => (
                <td key={iv} className="px-5 py-4 text-center">
                  <Cell value={feature.values[iv]} />
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <td className="sticky left-0 z-10 bg-ink px-5 py-4 text-sm font-medium text-white/70">
              Price
            </td>
            {displayPlans.length > 0
              ? displayPlans.map((plan) => (
                  <td
                    key={plan.id}
                    className="px-5 py-4 text-center font-display text-2xl text-white"
                  >
                    {plan.currency}
                    {plan.price.toLocaleString('en-IN')}
                    <span className="block text-xs font-sans font-normal text-white/45">
                      {plan.period}
                    </span>
                  </td>
                ))
              : intervals.map((iv) => (
                  <td key={iv} className="px-5 py-4 text-center text-white/40">
                    —
                  </td>
                ))}
          </tr>
        </tbody>
      </table>
    </Reveal>
  );
}

