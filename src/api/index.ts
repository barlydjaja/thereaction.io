import { readdir } from 'node:fs/promises';
import { getMdxContent, tryCatch } from '@/utils';

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

  const getDirectoryMetaData = (posts: null | Omit<Post, 'metaData'>[] ): Promise<Post[]> => {
    if (!posts) {
      return Promise.resolve([])
    }

    return Promise.all(posts.map(async post => {
      const {data: metaData} = await getMdxContent(post.slug)

      return {
        ...post,
        metaData,
      }
    }))
  }

  const dirNames = await getDirectoryNames('./public')
  const fullDirs = await getDirectoryMetaData(dirNames)

  // sort by date from latest post
  return fullDirs.sort((a, b) => Date.parse(a.metaData.date) < Date.parse(b.metaData.date) ? 1 : -1)
}