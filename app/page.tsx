import { AnimatedSuspense } from '@/components/ui/animated-suspense';
import ErrorBoundary from '@/components/ui/error-boundary';
import { BookCatalog, BookCatalogSkeleton } from '@/features/book/components/book-catalog';
import { parseSearchParams } from '@/lib/url-state';

export default function Page({ searchParams }: PageProps<'/'>) {
  return (
    <ErrorBoundary
      body="The catalog query failed. Check your database connection and try again."
      title="Can't load books"
    >
      <AnimatedSuspense fallback={<BookCatalogSkeleton />}>
        {searchParams.then(sp => (
          <BookCatalog searchParams={parseSearchParams(sp)} />
        ))}
      </AnimatedSuspense>
    </ErrorBoundary>
  );
}
