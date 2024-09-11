import { generateFeed } from "../feed";
import { getPosts } from '@/api';
import { metadata } from '@/app/layout';

export async function GET() {
  const posts = await getPosts();
  const feed = generateFeed(posts, metadata);
  return new Response(feed.rss2());
}
