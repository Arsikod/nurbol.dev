import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { PostData } from './posts.types';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectoryPath = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
  // get file names under /posts
  const fileNames = fs.readdirSync(postsDirectoryPath);
  const allPostsData = fileNames.map((fileName) => {
    // remove .md from file to get id
    const id = fileName.replace(/\.md$/, '');

    // read md file as string
    const fullPath = path.join(postsDirectoryPath, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // use gray-matter to parse post metadata section
    const {
      data: { date, title },
    } = matter(fileContents);

    return {
      id,
      date,
      title,
    };
  });

  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectoryPath);

  return fileNames.map((fileName) => ({ params: { id: fileName.replace(/\.md$/, '') } }));
}

export async function getPostData(id: string): Promise<PostData> {
  const fullPath = path.join(postsDirectoryPath, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const {
    data: { date, title },
    content,
  } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    id,
    date,
    title,
    contentHtml,
  };
}
