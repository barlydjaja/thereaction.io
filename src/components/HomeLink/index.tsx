"use client";

import Link from 'next/link';
import { sans } from '@/app/fonts';
import cx from 'classnames';

const HomeLink = () => {
  return (
    <Link
      href="/"
      className={cx(
        sans.className,
        "inline-block text-2xl font-black hover:scale-[1.02]",
      )}
    >
      <span className='font-bold'>PeakPerformanceCode</span>
    </Link>
  );
};

export default HomeLink;