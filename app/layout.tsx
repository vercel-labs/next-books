import Link from 'next/link';
import { Geist, Geist_Mono } from 'next/font/google';
import { Suspense } from 'react';
import { BookMark } from '@/components/book-mark';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { Crossfade } from '@/components/ui/crossfade';
import { GitHubIcon } from '@/components/ui/github-icon';
import ErrorBoundary from '@/components/ui/error-boundary';
import { BookFilters, BookFiltersFallback } from '@/features/book/components/book-filters';
import { BookSearch } from '@/features/book/components/book-search';
import { CatalogSize, CatalogSizeSkeleton } from '@/features/book/components/catalog-size';
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

const geistSans = Geist({
  display: 'block',
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

const geistMono = Geist_Mono({
  display: 'block',
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

const description =
  'Browse two million Goodreads books with Next.js 16.3 Instant Navigations, streaming search, and URL-driven filters.';

export const viewport: Viewport = {
  themeColor: [
    { color: '#fafafa', media: '(prefers-color-scheme: light)' },
    { color: '#121212', media: '(prefers-color-scheme: dark)' },
  ],
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  description,
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL ??
      (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : 'http://localhost:3000'),
  ),
  openGraph: {
    description,
    siteName: 'NextBooks',
    title: 'NextBooks',
    type: 'website',
  },
  title: { default: 'NextBooks', template: '%s · NextBooks' },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html className={`${geistSans.variable} ${geistMono.variable}`} lang="en" suppressHydrationWarning>
      <body className="bg-surface dark:bg-surface-dark text-black antialiased dark:text-white">
        <ThemeProvider>
          <div className="group flex min-h-dvh">
            <aside
              style={{ viewTransitionName: 'sidebar' }}
              className="border-divider bg-surface dark:border-divider-dark dark:bg-surface-dark sticky top-0 hidden h-dvh w-72 shrink-0 flex-col border-r px-5 py-5 md:flex"
            >
              <div className="flex items-center justify-between gap-2">
                <Link
                  aria-label="NextBooks home"
                  className="inline-flex items-center gap-2 text-base font-semibold tracking-tight"
                  href="/"
                >
                  <BookMark className="text-action size-5" />
                  NextBooks
                </Link>
              </div>
              <div className="border-divider dark:border-divider-dark mt-6 border-b pb-5">
                <ErrorBoundary compact title="Catalog size unavailable">
                  <Suspense fallback={<CatalogSizeSkeleton />}>
                    <Crossfade>
                      <CatalogSize />
                    </Crossfade>
                  </Suspense>
                </ErrorBoundary>
              </div>
              <p className="text-muted mt-5 mb-4 text-xs font-semibold tracking-wide uppercase">Filters</p>
              <ErrorBoundary compact title="Filters unavailable">
                <Suspense fallback={<BookFiltersFallback />}>
                  <BookFilters />
                </Suspense>
              </ErrorBoundary>
              <div className="border-divider dark:border-divider-dark mt-4 flex items-center justify-between gap-2 border-t pt-4">
                <ThemeToggle variant="inline" />
                <a
                  aria-label="View source on GitHub"
                  className="text-muted rounded-full p-1.5 transition-colors hover:text-black dark:hover:text-white"
                  href="https://github.com/vercel-labs/next-books"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <GitHubIcon className="size-4" />
                </a>
              </div>
            </aside>

            <div className="flex min-w-0 flex-1 flex-col">
              <header
                style={{ viewTransitionName: 'site-header' }}
                className="border-divider bg-surface/80 dark:border-divider-dark dark:bg-surface-dark/80 sticky top-0 z-20 flex items-center gap-3 border-b px-4 py-3 backdrop-blur-md backdrop-saturate-150 sm:px-6"
              >
                <Link aria-label="NextBooks home" className="md:hidden" href="/">
                  <BookMark className="text-action size-5" />
                </Link>
                <BookSearch />
                <div className="md:hidden">
                  <ThemeToggle variant="inline" />
                </div>
              </header>

              <main className="flex min-w-0 flex-1 flex-col">{children}</main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
