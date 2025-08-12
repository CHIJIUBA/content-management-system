import { Request, Response, NextFunction } from 'express';
import User from '../db/models/user.model';
import { serverConfigs } from '../configs';
import NotFoundError from '../errors/notFound.error';
import userService from '../services/user.service';
import { number } from 'joi';
// import formatRequestParamId from '../middleware/system.middleware';

class UserController {
  /**
   * Create a new post
   * @param req - Express request object
   * @param res - Express response object
   */
  public async getUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const user = await userService.getUser(parseInt(id));
      if (!user) {
        res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json({
        message: 'User retrieved successfully',
        user
      });
    } catch (error) {
      console.error(`Error creating post: ${error}`);
      res.status(400).json({ error: 'Failed to create post' });
    }
  }

  /**
   * UserController instance
   * @type {UserController}
   * This instance is used to handle user-related requests.
   */
  public sum(a: number, b: number) {
    return a + b;
  }
}
const userController = new UserController();
export default userController;
