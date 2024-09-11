import React from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { formatDate, getMdxContent } from '@/utils';
import Thumbnail from '@/components/Home/Card/components/Thumbnail';
import thumbnail from '@/components/Home/Card/components/Thumbnail';
import Image from 'next/image';

interface BlogProps {
  params: {
    slug: string;
  }
}

const Blog = async ({params}: BlogProps) => {
  const {content, data: metaData} = getMdxContent(params.slug)
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
