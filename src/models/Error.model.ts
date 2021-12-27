// TODO: @ggrigorev remove deprecated
/**
 * @deprecated
 * Use {intl.formatMessage({ id: 'Error.common' })} instead
 */
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
  PasswordInvalid= 422,
  TooManyRequests = 429,
  Locked = 423,
  error500 = 500,
}

export enum PasswordInvalidErrorCodes {
  PasswordUsedBefore = 'password.usedBefore',
  PasswordWeak = 'password.weak',
}

export interface ErrorTypeData {
  code: string;
  type: ErrorTypes;
  message: ErrorMessages;
}

export interface ErrorType<T = ErrorTypeData> {
  response?: {
    status: ErrorStatuses;
    data: T;
  };
}

export interface BaseError<T = Record<string, any>> {
  name: string;
  status: number;
  message: string;
  details?: T;
}

export function isNotFound(error: ErrorType) {
  return error && error.response && error.response.status >= ErrorStatuses.ValidationError && error.response.status < 499;
}

export function isInReviewModeError(error: ErrorType) {
  return error?.response?.data?.message === ErrorMessages.IN_REVIEW_MODE_ERROR;
}
