import { readdir } from 'node:fs/promises';
import { tryCatch } from '@/utils';
import matter from 'gray-matter';
import { readFileSync } from 'fs';

export interface Post {
  slug: string;
  metaData: {
    [key: string]: string;
  }
}

export const getPosts = async (): Promise<Post[]> => {
  const getDirectoryNames = async (path: string): Promise<null | Omit<Post, 'metaData'>[]> => {
    const [error, entries] = await tryCatch(readdir, path, {withFileTypes: true});

    if (error) {
      return null;
    }

    return entries.map((entry) => ({slug: entry.name}))
  }

  const getDirectoryMetaData = async (posts: null | Omit<Post, 'metaData'>[] ): Promise<Post[]> => {
    if (!posts) {
      return []
    }

    return posts.map(post => {
      const rawContent = readFileSync("./public/" + post.slug + "/index.md", "utf8")
      const {data: metaData} = matter(rawContent);

      return {
        ...post,
        metaData,
      }
    })
  }

  const dirNames = await getDirectoryNames('./public')
  const fullDirs = await getDirectoryMetaData(dirNames)

  // sort by date from latest post
  return fullDirs.sort((a, b) => Date.parse(a.metaData.date) < Date.parse(b.metaData.date) ? 1 : -1)
}