import Comment from '../db/models/comment.model';
import NotFoundError from '../errors/notFound.error';

class CommentService {
  constructor(private CommentModel = Comment) {}

  public async createComment(data: Partial<Comment>) {
    const { content, postId, userId } = data;
    const comment = await Comment.create({
      content,
      postId,
      userId
    });
    return comment;
  }

  public async updatePost(data: Partial<Comment>): Promise<Comment> {
    const { id, userId, postId, content } = data;
    const comment = await this.getUserComment(data);
    if (comment) {
      throw new NotFoundError(`user comment with id: ${id} not found`);
    }
    // Update the post with provided data
    comment.content = content || comment.content;
    await comment.save();
    return comment;
  }

  public async getComment(id: number): Promise<Comment> {
    // Fetch the post by ID
    if (!id) {
      throw new NotFoundError('Comment ID is required');
    }
    const comment = await Comment.findOne({
      where: { id }
    });

    if (!comment) {
      throw new NotFoundError('No comment with this user id found');
    }

    return comment;
  }

  public async getUserComment(commentData: Partial<Comment>): Promise<Comment> {
    const { id, userId, postId } = commentData;
    // Fetch the comment by ID and userId
    if (!id || !userId) {
      throw new NotFoundError('Comment ID and User ID are required');
    }
    const comment = await Comment.findOne({
      where: { id, userId, postId }
    });

    if (!comment) {
      throw new NotFoundError('No comment with this user id and post id found');
    }
    return comment;
  }

  //   public async deleteComment(id: number, userId: number, postId: number): Promise<boolean> {
  //     // Delete the post by ID and authorId
  //     if (!id || !userId) {
  //       throw new NotFoundError('Post ID and Author ID are required');
  //     }
  //     const post = await this.getUserComment(id, userId, postId);
  //     if (!post) {
  //       throw new NotFoundError(`Post with ID ${id} not found`);
  //     }
  //     await post.destroy();
  //     return true;
  //   }
}

export default new CommentService();
