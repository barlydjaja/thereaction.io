import { ReactNode } from 'react';
import type { Metadata } from "next";
import "./globals.css";
import { serif } from '@/app/fonts';
import HomeLink from '@/components/HomeLink';

export const metadata: Metadata = {
  title: "PeakPerformanceCode - A Blog",
  description: "A personal blog by Barly Djaja",
  alternates: {
    types: {
      "application/atom+xml": "https://peakperformancecode.io/atom.xml",
      "application/rss+xml": "https://peakperformancecode.io/rss.xml",
    },
  },
};

interface RootLayoutProps {
  readonly children: ReactNode;
}

export default function RootLayout({children}: RootLayoutProps) {
  return (
    <html lang="en" className={serif.className}>
      <body className='antialiased mx-auto max-w-2xl bg-[--bg] px-5 py-12 text-[--text]'>
        <header className="mb-14 flex flex-row place-content-between">
          <HomeLink />

          <span>me  here</span>
        </header>

        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
