import { serverConfigs } from '../configs';
import { Response, Request, NextFunction, ErrorRequestHandler } from 'express';
import SystemError from '../errors/system.error';
import { RequestValidator } from '../interface/functions.interface';
import rateLimit from 'express-rate-limit';
import Joi from 'joi';

class SystemMiddleware {
  public errorHandler(): ErrorRequestHandler {
    return (error, req: Request, res: Response, next: NextFunction) => {
      const isProduction = serverConfigs.NODE_ENV === 'production';

      const errorCode =
        error.code != null && Number(error.code) >= 100 && Number(error.code) <= 599
          ? error.code
          : 500;

      let errorMessage: SystemError | object = {};

      if (res.headersSent) {
        next(error);
      }

      if (!isProduction) {
        serverConfigs.DEBUG(error.stack);
        errorMessage = error;
      }

      if (serverConfigs.NODE_ENV === 'development') console.log(error);

      if (error instanceof Joi.ValidationError) {
        res.status(400).json({
          message: 'validation error',
          error: error.details.map((detail) => detail.message)
        });
      }

      if (errorCode === 500 && isProduction) {
        res.status(500).json({
          message: 'An unexpected error occurred. Please try again later'
        });
      }

      res.status(errorCode).json({
        message: error.message,
        error: {
          ...(error.errors && { error: error.errors }),
          ...(!isProduction && { trace: errorMessage })
        }
      });
    };
  }

  public validateRequestBody(validator: RequestValidator) {
    return (req: Request, res: Response, next: NextFunction) => {
      const { error, value } = validator(req);
      if (error) throw error;
      req.body = value;

      next();
    };
  }

  public rateLimitRequest(numberOfRequests: number, timeWindow: number) {
    const limiter = rateLimit({
      windowMs: timeWindow * 60 * 1000, // number of minutes to milliseconds
      message: `Too many requests, please try again after ${timeWindow} minutes`,
      max: numberOfRequests, // Limit each IP to 100 requests per windowMs
      standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
      legacyHeaders: false // Disable the `X-RateLimit-*` headers
    });

    return (req: Request, res: Response, next: NextFunction) => {
      return limiter(req, res, next);
    };
  }

  public formatRequestQuery(req: Request, _res: Response, next: NextFunction) {
    try {
      const {
        query: { limit, offset, search }
      } = req;
      req.queryOpts = {
        limit: limit ? Number(limit) : 10,
        offset: Number(offset) ? Number(offset) : 0,
        search: search ? (search as string) : ''
      };
      return next();
    } catch (error) {
      serverConfigs.DEBUG(`Error in system middleware format request query:${error}`);
    }
  }

  public formatRequestParamId(param: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const { params, paramIds } = req;
        req.paramIds = { ...paramIds };
        req.paramIds[`${param}`] = Number(params[param]);
        if (isNaN(req.paramIds[`${param}`]) || req.paramIds[`${param}`] <= 0) {
          throw new SystemError(400, `Invalid ${param} parameter`);
        }
        return next();
      } catch (error) {
        console.log(error);
        serverConfigs.DEBUG(`Error in system middleware validate request param Id ${error}`);
        next(error);
      }
    };
  }
}

export default new SystemMiddleware();
