import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/cn';

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Hope Gym & Spa home"
      className={cn('group flex items-center', className)}
    >
      <Image
        src="/logo.png"
        alt="Hope Gym & Spa"
        width={662}
        height={250}
        priority
        className="h-10 w-auto sm:h-12"
      />
    </Link>
  );
}
