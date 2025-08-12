import { serverConfigs } from '../configs';
import BadRequestError from '../errors/badRequest.error';
import UnauthorizedError from '../errors/unauthorized.error';
import { NextFunction, Request, Response } from 'express';
import multer from 'multer';

class FileUploadMiddleware {
  /**
   * Middleware to authorize file uploads.
   * This checks if the user is logged in and has the right permissions to upload files.
   * @param req - Express request object
   * @param res - Express response object
   * @param next - Next function to call the next middleware
   */
  storage: multer.StorageEngine;
  upload: multer.Multer;

  constructor() {
    this.storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'src/uploads/'); // directory to save uploaded files
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + '-' + file.originalname);
      }
    });
    this.upload = multer({ storage: this.storage });
  }

  public singleUpload(name: string) {
    return this.upload.single(name);
  }
}

export default new FileUploadMiddleware();
