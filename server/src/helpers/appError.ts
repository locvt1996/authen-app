export interface AppErrorInterface extends Error {
  statusCode: number;
  status: string;
  isOperation?: boolean;
  code?: number;
  path?: string;
  value?: string;
  keyValue?: any;
  errors?: any;
}

class AppError extends Error {
  public statusCode: number;
  public status: string;
  public isOperation: boolean;

  constructor(message: string, statusCode: number) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperation = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
