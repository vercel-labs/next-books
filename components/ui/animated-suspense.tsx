import { Suspense, useId, ViewTransition } from 'react';
import type { ReactNode } from 'react';

type AnimatedSuspenseProps = {
  children: ReactNode;
  fallback: ReactNode;
};

export function AnimatedSuspense({ children, fallback }: AnimatedSuspenseProps) {
  const name = useId();

  return (
    <Suspense
      fallback={
        <ViewTransition default="none" name={name} share="auto">
          <div>{fallback}</div>
        </ViewTransition>
      }
    >
      <ViewTransition default="none" name={name} share="auto">
        <div>{children}</div>
      </ViewTransition>
    </Suspense>
  );
}
