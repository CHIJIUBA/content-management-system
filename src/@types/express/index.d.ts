import { QueryOptions } from '../../interface/functions.interface';
import User from '../../db/models/user.model';

declare module 'express' {
  export interface Request {
    queryOpts?: QueryOptions;
    user?: User;
    paramIds?: {
      [key: string]: number;
    };
  }
}
