import React from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { formatDate, getMdxContent } from '@/utils';
import Image from 'next/image';
import { readdir } from 'node:fs/promises';

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
    <div>
      <div>
        {metaData.title}
      </div>
      <div>
        {formatDate(metaData.date)}
      </div>
      <div className='w-full h-80 relative'>
        <Image priority fill alt='thumbnail' src={`/${params.slug}/${metaData.thumbnail}`} sizes='10rem, 6rem' className='rounded object-cover'/>
      </div>

      <MDXRemote source={content}/>
    </div>
  );
};

export default Blog;
