// import { serverConfigs } from '../configs';
// import BadRequestError from '../errors/badRequest.error';
// import UnauthorizedError from '../errors/unauthorized.error';
// import authService from '../services/auth/auth.service';
// import userService from '../services/user.service';
// import { NextFunction, Request, Response } from 'express';
// import User from '../db/models/user.model';

// class AuthenticationMiddleware {
//   public async validateUserAccess(req: Request, res: Response, next: NextFunction): Promise<void> {
//     try {
//       const { authorization } = req.headers;

//       if (!authorization) {
//         throw new BadRequestError('No token provided.');
//       }

//       let token: string;

//       if (authorization.startsWith('Bearer ')) {
//         [, token] = authorization.split(' ');
//       } else {
//         token = authorization;
//       }

//       if (!token) {
//         throw new BadRequestError('No token provided');
//       }

//       const { payload, expired } = authService.verifyToken(token);

//       if (expired) {
//         throw new UnauthorizedError('Please provide a valid token');
//       }

//       const { id: userId } = payload as User;
//       const thisUser = await userService.getUser(userId);
//       req.user = thisUser;

//       return next();
//     } catch (error) {
//       serverConfigs.DEBUG(
//         `Error in authentication middleware validate user access method ${error}`
//       );
//       next(error);
//     }
//   }
// }

// export default new AuthenticationMiddleware();
