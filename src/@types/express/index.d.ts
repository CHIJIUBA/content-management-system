import { QueryOptions } from '../../interface/functions.interface';
import User from '../../db/models/user.model';
import Multer from 'multer';

declare module 'express' {
  export interface Request {
    queryOpts?: QueryOptions;
    file?: Multer.File;
    files?: Multer.File[];
    user?: User;
    paramIds?: {
      [key: string]: number;
    };
  }
}
