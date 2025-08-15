import { Request, Response, NextFunction } from 'express';
import Post from '../db/models/post.model';
import { serverConfigs } from '../configs';
import NotFoundError from '../errors/notFound.error';
import postsService from '../services/posts.service';

class PostController {
  /**
   * Create a new post
   * @param req - Express request object
   * @param res - Express response object
   */
  public async addPost(req: Request, res: Response) {
    const postData: Partial<Post> = {
      title: req.body.title,
      content: req.body.content,
      authorId: req.user.id
    };
    try {
      const post = await postsService.createPost(postData);
      if (!post) {
        res.status(400).json({ error: 'Failed to create post' });
      }
      res.status(201).json({
        message: 'Post created successfully',
        post
      });
    } catch (error) {
      console.error(`Error creating post: ${error}`);
      res.status(400).json({ error: 'Failed to create post' });
    }
  }
  /**
   * Get all posts
   * @param req - Express request object
   * @param res - Express response object
   */
  public async getPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const posts = await Post.findAll({
        where: { authorId: req.user.id },
        order: [['createdAt', 'DESC']]
      });
      res.status(200).json({
        message: 'Posts retrieved successfully',
        posts
      });
    } catch (error) {
      console.error(`Error retrieving posts: ${error}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  /**
   * Get a single post by ID
   * @param req - Express request object
   * @param res - Express response object
   */
  public async getPost(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const post = await postsService.getUserPost(parseInt(id), req.user.id);
      if (!post) {
        res.status(404).json({ error: 'No post with this user id found' });
      }
      res.status(200).json({
        message: 'Post retrieved successfully',
        post
      });
    } catch (error) {
      console.error(`Error retrieving post: ${error}`);
      res.status(404).json({ error: 'No post with this user id found' });
    }
  }

  // public async uploadFile(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     // console.log('req body name', req.body.name);
  //     console.log('req file', req.file);
  //     res.json({ message: 'Successfully uploaded files' });
  //   } catch (error) {
  //     console.error(`Error retrieving post: ${error}`);
  //     res.status(404).json({ error: 'No post with this user id found' });
  //   }
  // }

  /**
   * Update a post by ID
   * @param req - Express request object
   * @param res - Express response object
   */
  public async updatePost(req: Request, res: Response) {
    const { id } = req.params;
    const { title, content, status } = req.body;
    try {
      const result = await postsService.updatePost(parseInt(id), {
        title,
        content,
        status,
        authorId: req.user.id
      });
      if (!result) {
        res.status(404).json({ error: 'Post not found or not authorized to update' });
      }

      res.status(200).json({
        message: 'Post updated successfully',
        result
      });
    } catch (error) {
      console.error(`Error updating post: ${error}`);
      res.status(404).json({ error: 'Post not found or not authorized to update' });
    }
  }
  /**
   * Delete a post by ID
   * @param req - Express request object
   * @param res - Express response object
   */
  public async deletePost(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const post = await postsService.deletePost(parseInt(id), req.user.id);
      if (!post) {
        res.status(404).json({ error: 'Unable to delete post' });
      }
      // If the post was successfully deleted, send a success response
      res.status(200).json({
        message: 'Post deleted successfully'
      });
    } catch (error) {
      console.error(`Error deleting post: ${error}`);
      res.status(404).json({ error: 'Unable to delete post' });
    }
  }

  /**
   * A simple sum function for testing purposes
   * @param a - First number
   * @param b - Second number
   */
  public async sayHello(req: Request, res: Response) {
    try {
      res.status(200).json({
        message: 'Hello'
      });
    } catch (error) {
      console.error(`Error deleting post: ${error}`);
      res.status(404).json({ error: 'Unable to delete post' });
    }
  }

  public async viewMe() {
    try {
      return 'Hello';
    } catch (error) {
      console.error(`Error deleting post: ${error}`);
    }
  }
}

const postController = new PostController();
export default postController;
