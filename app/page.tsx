import { Suspense } from 'react';
import { Crossfade } from '@/components/ui/crossfade';
import ErrorBoundary from '@/components/ui/error-boundary';
import { BookCatalog, BookCatalogSkeleton } from '@/features/book/components/book-catalog';
import { parseSearchParams } from '@/lib/url-state';

export default function Page({ searchParams }: PageProps<'/'>) {
  return (
    <ErrorBoundary
      body="The catalog query failed. Check your database connection and try again."
      title="Can't load books"
    >
      <Suspense fallback={<BookCatalogSkeleton />}>
        <Crossfade>
          {searchParams.then(sp => (
            <BookCatalog searchParams={parseSearchParams(sp)} />
          ))}
        </Crossfade>
      </Suspense>
    </ErrorBoundary>
  );
}
