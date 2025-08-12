import Post from '../db/models/post.model';
import NotFoundError from '../errors/notFound.error';

class PostService {
  constructor(private PostModel = Post) {}

  public async createPost(data: Partial<Post>) {
    const { title, content, authorId } = data;
    if (!title || !content || !authorId) {
      throw new NotFoundError('Title, content, and author ID are required to create a post');
    }
    // Check if the post with the same title already exists
    const existingPost = await this.PostModel.findOne({
      where: { title, authorId }
    });
    if (existingPost) {
      throw new NotFoundError(`Post with title "${title}" already exists for this author`);
    }
    // Create a new post
    const post = await this.PostModel.create({
      title,
      content,
      slug: title.toLowerCase().replace(/\s+/g, '-'), // Simple slug generation
      status: 'draft', // Default status
      authorId
    });

    return post;
  }

  public async updatePost(id: number, data: Partial<Post>): Promise<Post> {
    const { title, content, authorId, status } = data;
    const post = await this.getUserPost(id, authorId);
    if (!post) {
      throw new NotFoundError(`Post with ID ${id} not found`);
    }
    // Update the post with provided data
    post.title = title || post.title;
    post.content = content || post.content;
    post.slug = title ? title.toLowerCase().replace(/\s+/g, '-') : post.slug;
    post.status = status || post.status;
    await post.save();
    return post;
  }

  public async getPost(id: number): Promise<Post> {
    // Fetch the post by ID
    if (!id) {
      throw new NotFoundError('Post ID is required');
    }
    const post = await Post.findOne({
      where: { id }
    });

    if (!post) {
      throw new NotFoundError('No post with this user id found');
    }

    return post;
  }

  public async getUserPost(id: number, authorId: number): Promise<Post> {
    // Fetch the post by ID and authorId
    if (!id || !authorId) {
      throw new NotFoundError('Post ID and Author ID are required');
    }
    const post = await Post.findOne({
      where: { id, authorId }
    });

    if (!post) {
      throw new NotFoundError('No post with this user id found');
    }
    return post;
  }

  public async deletePost(id: number, authorId: number): Promise<boolean> {
    // Delete the post by ID and authorId
    if (!id || !authorId) {
      throw new NotFoundError('Post ID and Author ID are required');
    }
    const post = await this.getUserPost(id, authorId);
    if (!post) {
      throw new NotFoundError(`Post with ID ${id} not found`);
    }
    await post.destroy();
    return true;
  }
}

export default new PostService();
