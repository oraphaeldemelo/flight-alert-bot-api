import { AppError } from './app-error';

export class ValidationError extends AppError {
  constructor(message = 'ValidationError') {
    super({ message, statusCode: 400, code: 'VALIDATION_ERROR' });
  }
}
