// TODO @dkchv: here should be token
export const ERROR_COMMON = 'Something went wrong. Please retry';

export function isNotFound(error) {
  return error && error.response && error.response.status >= 400 && error.response.status < 499;
}
