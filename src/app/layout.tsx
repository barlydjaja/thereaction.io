import { ReactNode } from 'react';
import type { Metadata } from "next";
import "./globals.css";
import { serif } from '@/app/fonts';
import HomeLink from '@/components/HomeLink';
import PersonalLink from '@/components/PersonalLink';
import { GoogleAnalytics } from '@next/third-parties/google'
import SmoothScrollProvider from '@/components/Providers/SmoothScrollProvider';
import PageTransition from '@/components/ui/PageTransition';

export const metadata: Metadata = {
  title: "The Reaction - A Blog by Barly",
  description: "A personal blog by Barly Djaja",
  alternates: {
    types: {
      "application/atom+xml": "https://thereaction.io/atom.xml",
      "application/rss+xml": "https://thereaction.io/rss.xml",
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
