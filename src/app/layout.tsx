import { ReactNode } from 'react';
import type { Metadata } from "next";
import "./globals.css";
import { serif } from '@/app/fonts';
import HomeLink from '@/components/HomeLink';
import PersonalLink from '@/components/PersonalLink';
import { GoogleAnalytics } from '@next/third-parties/google'
import SmoothScrollProvider from '@/components/Providers/SmoothScrollProvider';
import PageTransition from '@/components/ui/PageTransition';

const SITE_URL = "https://thereaction.io";
const SITE_NAME = "The Reaction";
const SITE_DESCRIPTION =
  "Musings on software engineering, life, and everything in between by Barly Djaja.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — A Blog by Barly`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Barly Djaja", url: SITE_URL }],
  creator: "Barly Djaja",
  publisher: "Barly Djaja",
  keywords: [
    "Barly Djaja",
    "The Reaction",
    "software engineering blog",
    "frontend engineering",
    "web development",
    "personal blog",
  ],
  alternates: {
    canonical: "/",
    types: {
      "application/atom+xml": `${SITE_URL}/atom.xml`,
      "application/rss+xml": `${SITE_URL}/rss.xml`,
    },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — A Blog by Barly`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    locale: "en_US",
    images: [
      {
        url: "https://github.com/barlydjaja.png",
        width: 460,
        height: 460,
        alt: "Barly Djaja",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — A Blog by Barly`,
    description: SITE_DESCRIPTION,
    creator: "@barlydjaja",
    images: ["https://github.com/barlydjaja.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

interface RootLayoutProps {
  readonly children: ReactNode;
}

export default function RootLayout({children}: RootLayoutProps) {
  const env = process.env.NODE_ENV || 'production';

  return (
    <html lang="en" className={serif.className}>
      <body className='antialiased mx-auto max-w-screen-md bg-[--bg] px-5 py-12 text-[--text] selection:bg-neutral-800 selection:text-white'>
        <SmoothScrollProvider>
          <header className="mb-14 flex flex-row place-content-between flex-wrap items-center relative z-10">
            <HomeLink/>
            <PersonalLink/>
          </header>

          <main className="relative z-10">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
        </SmoothScrollProvider>
      </body>

      {env === 'production' && <GoogleAnalytics gaId="G-NHKG3QM6ZP" />}
    </html>
  );
}
