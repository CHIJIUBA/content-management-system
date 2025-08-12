import express from 'express';
import UserController from '../controllers/users.controller';
import systemMiddleware from '../middleware/system.middleware';
import postsValidator from '../utils/posts.validator';

const userRouter = express.Router();

userRouter.get('/:id', systemMiddleware.formatRequestParamId('id'), UserController.getUser);
export default userRouter;
