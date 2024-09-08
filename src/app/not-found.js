import React from 'react';
import cx from "classnames";
import {sans} from "./fonts";
import Link from "next/link";
import './markdown.css';

const NotFound = () => {
  return (
    <article className="markdown">
      <h1
        className={cx(
          sans.className,
          "text-[40px] font-black leading-[44px] text-[--title]")}
      >
        Not Found :(
      </h1>

      <div className="markdown mt-10">
        <p>This page doesn&apos;t exist (yet?)</p>
        <p>
          I recently rewrote the site so maybe something broke. Please&nbsp;
          <Link href="https://github.com/barlydjaja/peakperformancecode.io" target="_blank" rel="noopener noreferrer">
            complain here.
          </Link>
        </p>
        <p>Hope you&apos;ll find what you&apos;re looking for. :)</p>
      </div>
    </article>
  );
};

export default NotFound;
