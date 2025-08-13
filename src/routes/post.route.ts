import express from 'express';
import PostController from '../controllers/post.controller';
import systemMiddleware from '../middleware/system.middleware';
import postsValidator from '../utils/posts.validator';
import fileuploadsMiddleware from '../middleware/fileuploads.middleware';

const postRouter = express.Router();

postRouter.post(
  '/',
  systemMiddleware.validateRequestBody(postsValidator.addPost),
  PostController.addPost
);

postRouter.post('/hello', PostController.sayHello);

// postRouter.post(
//   '/file',
//   fileuploadsMiddleware.singleUpload('singleFile'), // middleware to handle file upload
//   PostController.uploadFile
// );

postRouter.patch(
  '/:id',
  systemMiddleware.formatRequestParamId('id'),
  systemMiddleware.validateRequestBody(postsValidator.updatePost),
  PostController.updatePost
);
postRouter.get('/:id', systemMiddleware.formatRequestParamId('id'), PostController.getPost);
postRouter.delete('/:id', systemMiddleware.formatRequestParamId('id'), PostController.deletePost);
export default postRouter;
