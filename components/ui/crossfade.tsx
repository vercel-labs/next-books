import { ViewTransition } from 'react';
import type { ReactNode } from 'react';

export function Crossfade({ children }: { children: ReactNode }) {
  return (
    <div>
      <ViewTransition default="none" enter="auto">
        {children}
      </ViewTransition>
    </div>
  );
}
