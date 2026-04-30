import type { MetadataRoute } from "next";
import { getPosts } from "@/api";

const SITE_URL = "https://thereaction.io";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/${post.slug}`,
    lastModified: post.metaData.date
      ? new Date(post.metaData.date)
      : new Date(),
    changeFrequency: "yearly",
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...postEntries,
  ];
}
