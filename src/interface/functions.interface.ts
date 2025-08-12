import { ValidationResult } from 'joi';
import { Request } from 'express';

interface QueryOptions {
  limit: number;
  offset: number;
  search: string;
}

type RequestValidator = (req: Request) => ValidationResult;

export { QueryOptions, RequestValidator };
