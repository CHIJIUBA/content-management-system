import express from 'express';
import systemMiddleware from '../middleware/system.middleware';
import { authorizationMiddleware } from '../middleware';
import commentController from '../controllers/comment.controller';
import postsValidator from '../utils/posts.validator';

const commentRoute = express.Router();

commentRoute.post('/', commentController.addComment);
commentRoute.get('/:id/:postId', commentController.getComment);
commentRoute.patch('/:id/:postId', commentController.updateComment);

export default commentRoute;
