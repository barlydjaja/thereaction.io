import HomeLink from '@/components/HomeLink';
import { ReactNode } from 'react';

interface SlugLayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: SlugLayoutProps) {
  return (
    <>
      {children}
      <footer className="mt-12">
        <HomeLink />
      </footer>
    </>
  );
}
