import User from '../db/models/user.model';

export interface DecodedToken {
  payload: User | null;
  expired: boolean | string | Error;
}
