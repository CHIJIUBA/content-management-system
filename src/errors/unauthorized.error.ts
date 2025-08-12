import SystemError from './system.error';

export default class UnauthorizedError extends SystemError {
  constructor(message?: string) {
    super(400, message || 'Unauthorized Error');
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
