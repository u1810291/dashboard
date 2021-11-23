export enum ErrorMessages {
  ERROR_COMMON = 'Something went wrong. Please retry',
  IN_REVIEW_MODE_ERROR = 'Cannot update verification running in review mode'
}

export enum ErrorTypes {
  SystemError = 'SystemError'
}

export enum ErrorStatuses {
  WrongCredentials = 401,
  BlockedByMerchant = 403,
  TooManyRequests = 429,
  error400 = 400,
  error404 = 404,
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
  return error && error.response && error.response.status >= ErrorStatuses.error400 && error.response.status < 499;
}

export function isInReviewModeError(error: ErrorType) {
  return error?.response?.data?.message === ErrorMessages.IN_REVIEW_MODE_ERROR;
}
