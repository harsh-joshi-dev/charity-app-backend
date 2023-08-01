export interface SuccessResponse<T> {
  success: true;
  data: T;
  message: string;
}

export interface ErrorResponse {
  success: false;
  exitCode: number;
  message: string;
}

export function prepareSuccessResponse<T>(
  data: T,
  message: string,
): SuccessResponse<T> {
  return {
    success: true,
    data,
    message,
  };
}

export function prepareErrorResponse(
  exitCode: number,
  message: string,
): ErrorResponse {
  return {
    success: false,
    exitCode,
    message,
  };
}
