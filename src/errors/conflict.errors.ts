import SystemError from './system.error';

export default class ConflictError extends SystemError {
  constructor(message?: string) {
    super(400, message || 'Conflict Error');
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
