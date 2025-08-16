import { serverConfigs } from '../../configs';
import { NextFunction, Request, Response } from 'express';
import authService from '../../services/auth/auth.service';
import User from '../../db/models/user.model';

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

  protected async googleLogin(req: Request, res: Response, next: NextFunction) {
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
      const registerData: Partial<User> = {
        email,
        password,
        firstName,
        lastName,
        isVerified: req.body.isVerified || false // Default to false if not provided
      };
      const data = await authService.registerUser(registerData);
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
