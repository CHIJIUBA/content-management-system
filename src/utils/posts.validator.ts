import Joi, { ValidationResult } from 'joi';
import { Request } from 'express';

import BaseValidator from '.';

class PostValidatorUtil extends BaseValidator {
  public addPost = (req: Request): ValidationResult => {
    const schema = Joi.object().keys({
      title: Joi.string().min(3).required().label('Title'),
      content: Joi.string().min(10).required().label('Content'),
      status: Joi.string().valid('draft', 'published').default('draft').label('Status')
    });
    return this.validate(schema, req.body);
  };

  public updatePost = (req: Request): ValidationResult => {
    const schema = Joi.object().keys({
      title: Joi.string().min(3).label('Title'),
      content: Joi.string().min(10).label('Content'),
      status: Joi.string().valid('draft', 'published').default('draft').label('Status')
    });
    return this.validate(schema, req.body);
  };
}

export default new PostValidatorUtil();
