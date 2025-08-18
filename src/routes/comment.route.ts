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
commentRoute.get(
  '/:postId/comment/:commentId',
  systemMiddleware.formatRequestParamId('postId'),
  systemMiddleware.formatRequestParamId('commentId'),
  commentController.getComment
);
commentRoute.patch(
  '/:postId/comment/:commentId',
  systemMiddleware.formatRequestParamId('postId'),
  systemMiddleware.formatRequestParamId('commentId'),
  systemMiddleware.validateRequestBody(commentsValidator.updateComment),
  commentController.updateComment
);

commentRoute.delete(
  '/:postId/comment/:commentId',
  systemMiddleware.formatRequestParamId('postId'),
  systemMiddleware.formatRequestParamId('commentId'),
  commentController.deletePost
);

export default commentRoute;
