import React from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { formatDate, getMdxContent } from '@/utils';
import Image from 'next/image';
import { readdir } from 'node:fs/promises';
import cx from 'classnames';
import { sans } from '@/app/fonts';
import remarkSmartpants from "remark-smartypants";
import rehypePrettyCode from 'rehype-pretty-code';

import '@/app/markdown.css'

interface BlogProps {
  params: {
    slug: string;
  }
}

export async function generateMetadata({params}: BlogProps) {
  const {data: metaData} = await getMdxContent(params.slug)

  return {
    title: metaData.title,
    description: metaData.desc,
  }
}

export async function generateStaticParams() {
  const entries = await readdir("./public/", { withFileTypes: true });
  const dirs = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
  return dirs.map((dir) => ({ slug: dir }));
}

const Blog = async ({params}: BlogProps) => {
  const {content, data: metaData} = await getMdxContent(params.slug)
  return (
    <article>
      <h1 className={cx(
        sans.className,
        'text-4xl font-bold text-[--text] leading-[52px]'
      )}>
        {metaData.title}
      </h1>

      <p className='text-md'>
        {formatDate(metaData.date)}
      </p>

      <div className='w-full h-80 relative my-5'>
        <Image priority fill alt='thumbnail' src={`/${params.slug}/${metaData.thumbnail}`} sizes='40rem, 20rem' className='rounded object-cover'/>
      </div>

      <section className='mt10 markdown'>
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
