import Link from 'next/link';
import { getPosts } from '@/api';
import Card from '@/components/Home/Card';

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="relative -top-[10px] flex flex-col gap-5 flex-wrap-reverse">
      {posts.map(({slug, metaData}) => (
        <Link
          key={slug}
          className="block hover:scale-[1.005]"
          href={slug}
        >
          <Card metaData={metaData} slug={slug} />
        </Link>
      ))}
    </div>
  );
}
