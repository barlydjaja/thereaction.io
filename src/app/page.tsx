import Link from 'next/link';
import Title from '@/components/Home/Title';
import CreatedDate from '@/components/Home/CreatedDate';
import Description from '@/components/Home/Description';
import { getPosts } from '@/api';

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="relative -top-[10px] flex flex-col gap-8">
      {posts.map(({slug, metaData}) => (
        <Link
          key={slug}
          className="block py-4 hover:scale-[1.005]"
          href={slug}
        >
          <article>
            <Title text={metaData.title} />
            <CreatedDate date={metaData.date} />
            <Description text={metaData.desc} />
          </article>
        </Link>
      ))}
    </div>
  );
}
