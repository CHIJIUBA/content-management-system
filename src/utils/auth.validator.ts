import Joi, { ValidationResult } from 'joi';
import { Request } from 'express';

import BaseValidator from '.';

class AuthValidatorUtil extends BaseValidator {
  public login = (req: Request): ValidationResult => {
    const schema = Joi.object().keys({
      email: Joi.string().email().required().label('Email'),
      password: Joi.string().required().label('Password'),
    });

    return this.validate(schema, req.body);
  };

  public register = (req: Request): ValidationResult => {
    const schema = Joi.object().keys({
      email: Joi.string().email().required().label('Email'),
      password: Joi.string().min(6).required().label('Password'),
      firstName: Joi.string().required().label('First Name'),
      lastName: Joi.string().required().label('Last Name'),
    });

    return this.validate(schema, req.body);
  };

  public forgotPassword(req: Request): ValidationResult {
    const schema = Joi.object().keys({
      email: Joi.string().email().required().label('Email'),
    });

    return this.validate(schema, req.body);
  }

  public changePassword(req: Request): ValidationResult {
    const schema = Joi.object().keys({
      currentPassword: Joi.string().required().min(8).label('Current Password'),

      password: Joi.string()
        .required()
        .regex(this.patterns.password)
        .label('Password')
        .min(8)
        .messages({
          'string.pattern.base':
            'Password must contain at least one lowercase letter, one uppercase letter, one digit and one special character',
        }),

      confirmPassword: Joi.string()
        .required()
        .label('Confirm Password')
        .min(8)
        .valid(Joi.ref('password'))
        .messages({
          'any.only': 'Passwords does not match',
        }),
    });

    return this.validate(schema, req.body);
  }

  public resetPassword(req: Request): ValidationResult {
    const schema = Joi.object().keys({
      password: Joi.string()
        .min(8)
        .regex(this.patterns.password)
        .required()
        .label('Password')
        .messages({
          'string.pattern.base':
            'Password must contain at least one lowercase letter, one uppercase letter, one digit and one special characters',
        }),

      confirmPassword: Joi.string()
        .valid(Joi.ref('password'))
        .min(8)
        .required()
        .label('Confirm Password')
        .messages({
          'any.only': 'Passwords does not match',
        }),
    });

    return this.validate(schema, req.body);
  }
}

export default new AuthValidatorUtil();
