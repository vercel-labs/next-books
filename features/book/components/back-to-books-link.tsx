'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

const linkClass =
  'text-muted hover:bg-card dark:hover:bg-card-dark -ml-1.5 inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-colors hover:text-black dark:hover:text-white';

export function BackToBooksLink({ className }: { className?: string }) {
  const router = useRouter();

  return (
    <button
      className={cn(linkClass, className)}
      onClick={() => (window.navigation?.canGoBack ? router.back() : router.push('/'))}
      type="button"
    >
      <ArrowLeft aria-hidden className="size-4" />
      Back to books
    </button>
  );
}
