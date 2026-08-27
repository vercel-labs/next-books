import { ViewTransition } from 'react';
import type { ReactNode } from 'react';

export function Crossfade({ children }: { children: ReactNode }) {
  return (
    <ViewTransition default="none" enter="auto">
      <div>{children}</div>
    </ViewTransition>
  );
}
