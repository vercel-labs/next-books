import { Suspense } from 'react';
import { Crossfade } from '@/components/ui/crossfade';
import ErrorBoundary from '@/components/ui/error-boundary';
import { getBookById } from '@/features/book/book-queries';
import { BackToBooksLink } from '@/features/book/components/back-to-books-link';
import { BookDetail, BookDetailSkeleton } from '@/features/book/components/book-detail';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: PageProps<'/[id]'>): Promise<Metadata> {
  const { id } = await params;
  const book = await getBookById(id);
  if (!book) return { title: 'Book not found' };
  return { description: book.description ?? undefined, title: book.title };
}

export default function Page({ params }: PageProps<'/[id]'>) {
  return (
    <div className="flex flex-1 flex-col px-4 py-5 sm:px-6">
      <BackToBooksLink className="mb-6" />
      <ErrorBoundary body="We couldn't load this book's details." title="Can't load book">
        <Suspense fallback={<BookDetailSkeleton />}>
          <Crossfade>
            {params.then(({ id }) => (
              <BookDetail id={id} />
            ))}
          </Crossfade>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
