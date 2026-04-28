import { getPosts } from '@/api';
import FeedHeader from '@/components/Home/HeroSection';
import AnimatedFeed from '@/components/Home/AnimatedFeed';

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="relative -top-[10px] flex flex-col w-full">
      <FeedHeader />
      <AnimatedFeed posts={posts} />
    </div>
  );
}
