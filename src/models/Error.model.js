// TODO @dkchv: here should be token
export const ERROR_COMMON = 'Something went wrong. Please retry';
export const IN_REVIEW_MODE_ERROR = 'Cannot update verification running in review mode';

export function isNotFound(error) {
  return error && error.response && error.response.status >= 400 && error.response.status < 499;
}

export function isInReviewModeError(error) {
  return error?.response?.data?.message === IN_REVIEW_MODE_ERROR;
}
