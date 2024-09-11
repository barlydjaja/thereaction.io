import { Feed } from "feed";
import { Post } from '@/api';
import { Metadata } from 'next';

export function generateFeed(posts: Post[], metadata: Metadata) {
  const site_url = "https://thereaction.io/";

  const feed = new Feed({
    author: {
      name: "Barly Djaja",
      email: "barlydjaja@gmail.com",
      link: site_url,
    },
    description: metadata.description || 'A Personal Blog - Barly',
    favicon: `${site_url}/favicon.ico`,
    feedLinks: { atom: `${site_url}atom.xml`, rss: `${site_url}rss.xml` },
    generator: "Feed for Node.js",
    id: site_url,
    image: "https://github.com/barlydjaja.png",
    link: site_url,
    title: metadata.title as string,
    copyright: "MIT"
  });

  for (const post of posts) {
    feed.addItem({
      date: new Date(post.metaData.date),
      description: post.metaData.desc,
      id: `${site_url}${post.slug}/`,
      link: `${site_url}${post.slug}/`,
      title: post.metaData.title,
    });
  }

  return feed;
}
