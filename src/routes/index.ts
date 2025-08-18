import { serverConfigs } from '../configs';
import { Router, Request, Response } from 'express';
import { systemMiddleware } from '../middleware/';
import { authMiddleware } from '../middleware/';
import authRoutes from './auth';
import postRoutes from './post.route';
import userRoutes from './user.route';
import commentRoute from './comment.route';

class Routes {
  public router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get('/', (req: Request, res: Response) => {
      res.status(200).json({
        message: 'Welcome to my Content Management System API',
        data: {
          environment: serverConfigs.NODE_ENV,
          version: '1.0.0'
        }
      });
    });

    this.router.use(systemMiddleware.formatRequestQuery);
    this.router.use('/auth', authRoutes);
    this.router.use('/user', userRoutes);

    // Middleware to validate user access for all routes after this point
    this.router.use(authMiddleware.validateUserAccess);
    this.router.use('/post', postRoutes);
    this.router.use('/post/:postId', commentRoute);
  }
}

export default new Routes().router;
