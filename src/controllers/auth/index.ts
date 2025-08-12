import { serverConfigs } from '../../configs';
import { NextFunction, Request, Response } from 'express';
import authService from '../../services/auth/auth.service';

class AuthController {
  protected async login(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        body: { email, password }
      } = req;

      const userPasswordCheck = await authService.checkUserExistAndPasswordMatch(email, password);
      if (userPasswordCheck) {
        res.status(401).send({
          message: userPasswordCheck
        });
      } else {
        const user = await authService.getUserForLogin(email, password);

        const data = await authService.login(user);
        res.status(200).send({
          message: 'Logged in successful',
          data
        });
      }
    } catch (error) {
      serverConfigs.DEBUG(`Error in authenticate create controller method:${error}`);
      next(error);
    }
  }

  protected async resetPassword() {}
  protected async forgotPassword() {}

  protected async register(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        body: { email, password, firstName, lastName }
      } = req;
      const isVerified = false;
      const role = 'user'; // default role
      // create the user in the database
      const data = await authService.registerUser({
        email,
        password,
        firstName,
        lastName,
        isVerified,
        role
      });
      if (data.message) {
        res.status(409).json({
          message: data.message
        });
      } else {
        res.status(201).json({
          message: 'User created successfully',
          data
        });
      }
    } catch (error) {
      serverConfigs.DEBUG(`Error in authenticate create controller method:${error}`);
      next(error);
    }
  }
}

export default AuthController;
