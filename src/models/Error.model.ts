export enum ErrorMessages {
  ERROR_COMMON = 'Something went wrong. Please retry',
  IN_REVIEW_MODE_ERROR = 'Cannot update verification running in review mode'
}

export enum ErrorTypes {
  SystemError = 'SystemError'
}

export enum ErrorStatuses {
  ValidationError = 400,
  WrongCredentials = 401,
  BlockedByMerchant = 403,
  error404 = 404,
  PasswordWasUsedBefore= 422,
  TooManyRequests = 429,
  error500 = 500,
}

export interface ErrorType {
  response?: {
    status: ErrorStatuses;
    data: {
      code: string;
      type: ErrorTypes;
      message: ErrorMessages;
    };
  };
}

export function isNotFound(error: ErrorType) {
  return error && error.response && error.response.status >= ErrorStatuses.ValidationError && error.response.status < 499;
}

export function isInReviewModeError(error: ErrorType) {
  return error?.response?.data?.message === ErrorMessages.IN_REVIEW_MODE_ERROR;
}
