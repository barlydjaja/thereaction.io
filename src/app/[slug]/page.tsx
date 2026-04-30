import React from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getMdxContent, isValidMdPath } from '@/utils';
import { formatDate } from '@/utils/date';
import Image from 'next/image';
import { readdir } from 'node:fs/promises';
import cx from 'classnames';
import { sans } from '@/app/fonts';
import remarkSmartpants from "remark-smartypants";
import rehypePrettyCode from 'rehype-pretty-code';
import type { Metadata } from 'next';

import '@/app/markdown.css'
import { notFound } from 'next/navigation';
import { metadata } from '@/app/layout';

const SITE_URL = 'https://thereaction.io';

interface BlogProps {
  params: Promise<{
    slug: string;
  }>
}

const Blog = async ({params}: BlogProps) => {
  const { slug } = await params;

  if (!isValidMdPath(slug)) {
    notFound()
  }

  const {content, data: metaData} = await getMdxContent(slug)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: metaData.title,
    description: metaData.desc,
    datePublished: metaData.date,
    dateModified: metaData.date,
    author: {
      "@type": "Person",
      name: "Barly Djaja",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: "Barly Djaja",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/${slug}`,
    },
    ...(metaData.thumbnail && {
      image: `${SITE_URL}/${slug}/${metaData.thumbnail}`,
    }),
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className={cx(
        sans.className,
        'text-4xl font-bold text-[--text] leading-[52px]'
      )}>
        {metaData.title}
      </h1>

      <p className='text-base'>
        {formatDate(metaData.date)}
      </p>

      {
        metaData.thumbnail && (
          <div className='w-full h-80 relative my-10'>
            <Image
              priority
              fill
              alt={metaData.title}
              src={`/${slug}/${metaData.thumbnail}`}
              sizes='(max-width: 768px) 100vw, 40rem'
              className='rounded object-contain'
            />
          </div>
        )
      }

      <section className={cx(
        sans.className,
        'mt10 markdown'
      )}>
        <MDXRemote
          source={content}
          options={{
            mdxOptions: {
              useDynamicImport: true,
              remarkPlugins: [remarkSmartpants],
              rehypePlugins: [rehypePrettyCode],
            }
          }}
        />
      </section>
    </article>
  );
};

export default Blog;

export async function generateMetadata({params}: BlogProps): Promise<Metadata> {
  const { slug } = await params;

  if (!isValidMdPath(slug)) {
    return {
      title: typeof metadata.title === 'string' ? metadata.title : undefined,
      description: metadata.description ?? undefined,
    }
  }

  const {data: metaData} = await getMdxContent(slug)
  const url = `${SITE_URL}/${slug}`;
  const ogImage = metaData.thumbnail
    ? `${SITE_URL}/${slug}/${metaData.thumbnail}`
    : 'https://github.com/barlydjaja.png';

  return {
    title: metaData.title,
    description: metaData.desc,
    authors: [{ name: 'Barly Djaja', url: SITE_URL }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'article',
      title: metaData.title,
      description: metaData.desc,
      url,
      siteName: 'The Reaction',
      publishedTime: metaData.date,
      authors: ['Barly Djaja'],
      images: [
        {
          url: ogImage,
          alt: metaData.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaData.title,
      description: metaData.desc,
      images: [ogImage],
      creator: '@barlydjaja',
    },
  }
}

export async function generateStaticParams() {
  const entries = await readdir("./public/", { withFileTypes: true });
  const dirs = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
  return dirs.map((dir) => ({ slug: dir }));
}
