export interface IError {
  message: string;
}

export class CustomError extends Error {
  success = false;
  error: string;
  statusCode: number;
  constructor(
    error: string,
    statusCode: number = 400,
    private readonly _raw?: any,
  ) {
    console.log('🚀 ~ file: custom-error.ts:11 ~ CustomError ~ raw:', _raw);
    super(error);
    this.error = error;
    this.statusCode = statusCode;
  }

  getRaw() {
    return this._raw;
  }
}
