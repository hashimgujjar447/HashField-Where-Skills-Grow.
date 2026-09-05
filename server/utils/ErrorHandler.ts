class ErrorHandler extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);

    this.name = "ErrorHandler";
    this.statusCode = statusCode;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ErrorHandler);
    }
  }
}

export default ErrorHandler;
