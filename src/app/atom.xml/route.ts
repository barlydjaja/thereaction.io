import { generateFeed } from "../feed";
import { metadata } from '@/app/layout';
import { getPosts } from '@/api';

export async function GET() {
  const posts = await getPosts();
  const feed = generateFeed(posts, metadata);
  return new Response(feed.atom1());
}
