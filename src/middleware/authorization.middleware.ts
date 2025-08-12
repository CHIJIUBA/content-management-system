import { serverConfigs } from '../configs';
// import BadRequestError from '../errors/badRequest.error';
import UnauthorizedError from '../errors/unauthorized.error';
// import authService from '../services/auth/auth.service';
// import userService from '../services/user.service';
import { NextFunction, Request, Response } from 'express';
// import User from '../db/models/user.model';

class AuthorizationMiddleware {
  private accessMatrix = {
    admin: ['create', 'edit', 'delete'],
    editor: ['edit'],
    user: ['view'],
    guest: []
  };

  /**
   * Middleware to authorize viewing a post.
   * This checks if the user is logged in and has the right permissions to view the post.
   * @param req - Express request object
   * @param res - Express response object
   * @param next - Next function to call the next middleware
   */
  public async authorizeViewPost(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userRole = req.user.role;
      if (userRole === 'guest') {
        throw new UnauthorizedError('guest are not allowed to view posts');
      }
      return next();
    } catch (error) {
      serverConfigs.DEBUG(`Error in authorization middleware authorize view post method ${error}`);
      next(error);
    }
  }

  /**
   * Middleware to authorize creating a post.
   * This checks if the user is logged in and has the right permissions to create a post.
   * @param req - Express request object
   * @param res - Express response object
   * @param next - Next function to call the next middleware
   */
  public async authorizeRoles(...allowedRoles) {
    return (req, res, next) => {
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      next();
    };
  }
}

export default new AuthorizationMiddleware();
