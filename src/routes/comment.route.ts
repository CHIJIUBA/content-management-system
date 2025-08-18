import express from 'express';
import systemMiddleware from '../middleware/system.middleware';
import commentController from '../controllers/comment.controller';
import commentsValidator from '../utils/comments.validator';

const commentRoute = express.Router();

commentRoute.post(
  '/:postId/comment',
  systemMiddleware.validateRequestBody(commentsValidator.addComment),
  systemMiddleware.formatRequestParamId('postId'),
  commentController.addComment
);
commentRoute.get('/:id/:postId', commentController.getComment);
commentRoute.patch('/:id/:postId', commentController.updateComment);

export default commentRoute;
