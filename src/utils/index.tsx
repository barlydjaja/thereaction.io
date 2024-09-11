import { readFileSync } from 'fs';
import matter from 'gray-matter';

function check<PromiseData>(cb: () => Promise<PromiseData>) {
  if (typeof cb !== 'function') {
    throw Error('fn should be a function!');

  }
}

export async function tryCatch<PromiseData, FnArgs extends unknown[] >(
  cb: (...args: FnArgs) => Promise<PromiseData>,
  ...args: FnArgs
): Promise<[Error] | [null, PromiseData]> {
  check(cb)

  try {
    return [null, await cb(...args)];
  } catch (error) {
    return [error as Error];
  }
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export function getMdxContent(slug: string): matter.GrayMatterFile<string> {
  const rawContent = readFileSync("./public/" + slug + "/index.mdx", "utf8")
  return matter(rawContent);
}