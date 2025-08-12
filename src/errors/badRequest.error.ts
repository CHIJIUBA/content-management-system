import SystemError from './system.error';

export default class BadRequestError extends SystemError {
  constructor(message?: string) {
    super(400, message || 'Bad Request Error');
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
