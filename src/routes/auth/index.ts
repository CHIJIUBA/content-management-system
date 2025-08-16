import { Router } from 'express';
import AuthController from '../../controllers/auth';
import { systemMiddleware } from '../../middleware';
import authValidator from '../../utils/auth.validator';

class AuthRoutes extends AuthController {
  public router: Router;

  constructor() {
    super();
    this.router = Router();
    this.routes();
  }

  private routes(): void {
    this.router
      .route('/login')
      .post(systemMiddleware.validateRequestBody(authValidator.login), this.login);

    this.router.route('/google').post(this.googleLogin);

    this.router
      .route('/register')
      .post(systemMiddleware.validateRequestBody(authValidator.register), this.register);

    this.router
      .route('/forgot-password')
      .post(
        systemMiddleware.validateRequestBody(authValidator.forgotPassword),
        this.forgotPassword
      );

    this.router
      .route('/reset-password')
      .post(systemMiddleware.validateRequestBody(authValidator.resetPassword), this.resetPassword);

    // this.router.route('/hello').get(this.hello);
  }
}

export default new AuthRoutes().router;
