import { deflate } from 'zlib';

interface PostAttributeI {
  id: number;
  title: string;
  content: string;
  slug: string;
  status: string;
  authorId: number;
  createdAt?: Date;
}

export default PostAttributeI;
