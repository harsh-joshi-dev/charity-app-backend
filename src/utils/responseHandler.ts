type SuccessResponse<T> = {
  success: true;
  data: T;
  message: string;
}

type ErrorResponse = {
  success: false;
  exitCode: number;
  message: string;
}

function prepareSuccessResponse<T> (data: T, message: string): SuccessResponse<T> {
return {
  success: true,
  data,
  message
}
}

function prepareErrorResponse (exitCode: number, message: string): ErrorResponse {
return {
  success: false,
  exitCode: exitCode,
  message
}
}

export {
prepareSuccessResponse,
prepareErrorResponse
}
