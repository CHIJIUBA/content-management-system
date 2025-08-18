import SystemError from './system.error';

export default class ValidationError extends SystemError {
  constructor(message?: string) {
    super(400, message || 'Bad Request');
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
