export type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
  tags: string[];
  category: string;
  createdAt: string;
  slug?: string;
};
