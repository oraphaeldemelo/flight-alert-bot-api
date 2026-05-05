export type AppErroProps = {
  message: string;
  statusCode?: number;
  code?: string;
};

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;

  constructor({ message, statusCode = 400, code = 'APP_ERROR' }: AppErroProps) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.code = code;
  }
}
