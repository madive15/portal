import { marked } from 'marked';

export const parseMarkdown = (data: string) => {
  return marked.parse(data);
};
