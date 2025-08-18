import { Request, Response, NextFunction } from 'express';
import Comment from '../db/models/comment.model';
import { serverConfigs } from '../configs';
import NotFoundError from '../errors/notFound.error';
import postsService from '../services/posts.service';
import commentService from '../services/comment.service';

class CommentController {
  /**
   * Get all posts
   * @param req - Express request object
   * @param res - Express response object
   */
  public async addComment(req: Request, res: Response, next: NextFunction) {
    try {
      const commentData: Partial<Comment> = {
        content: req.body.content,
        postId: req.params.postId ? parseInt(req.params.postId) : null,
        userId: req.user.id
      };
      const comment = await commentService.createComment(commentData);
      if (comment) {
        res.status(201).json({ success: 'Comment created successfully', comment });
      } else {
        res.status(400).json({ message: 'an error occured was not able to create comment' });
      }
    } catch (error) {
      console.error(`Error adding comment: ${error}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  /**
   * Get all posts
   * @param req - Express request object
   * @param res - Express response object
   */
  public async getComment(req: Request, res: Response, next: NextFunction) {
    try {
      const { commentId, postId } = req.params;
      const commentData: Partial<Comment> = {
        id: parseInt(commentId),
        userId: req.user.id,
        postId: parseInt(postId)
      };
      const comment = await commentService.getUserComment(commentData);
      res.status(200).json({
        message: 'comments retrieved successfully',
        comment
      });
    } catch (error) {
      console.error(`Error retrieving comments: ${error}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  /**
   * Update a post by ID
   * @param req - Express request object
   * @param res - Express response object
   */
  public async updateComment(req: Request, res: Response) {
    const { commentId, postId } = req.params;
    const { content } = req.body;
    const commentData: Partial<Comment> = {
      id: parseInt(commentId),
      userId: req.user.id,
      postId: parseInt(postId),
      content
    };
    try {
      const result = await commentService.updateComment(commentData);
      if (!result) {
        res.status(404).json({ error: 'Comment not found or not authorized to update' });
      }

      res.status(200).json({
        message: 'Comment updated successfully',
        result
      });
    } catch (error) {
      console.error(`Error updating comment: ${error}`);
      res.status(404).json({ error: 'Comment not found or not authorized to update' });
    }
  }
  /**
   * Delete a post by ID
   * @param req - Express request object
   * @param res - Express response object
   */
  public async deletePost(req: Request, res: Response) {
    const { commentId, postId } = req.params;
    const commentData: Partial<Comment> = {
      id: parseInt(commentId),
      userId: req.user.id,
      postId: parseInt(postId)
    };
    try {
      const comment = await commentService.deleteComment(commentData);
      if (!comment) {
        res.status(404).json({ error: 'Unable to delete post' });
      }
      // If the post was successfully deleted, send a success response
      res.status(200).json({
        message: 'Post deleted successfully'
      });
    } catch (error) {
      console.error(`Error deleting comment: ${error}`);
      res.status(404).json({ error: 'Unable to delete post' });
    }
  }
}

const commentController = new CommentController();
export default commentController;
