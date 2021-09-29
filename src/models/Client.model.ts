export interface ApiResponse<T> {
  data: T;
}

export interface ClientCSRFResponse {
  token: string;
}

export enum ClientErrorTypes {
  CSRFTokenNotFound = 'csrf_token_not_found',
  CSRFTokenNotValid = 'csrf_token_not_valid',
}

export const CLIENT_CSRF_HEADER_NAME = 'X-CSRF-TOKEN';
export const CLIENT_CSRF_URL = '/api/v1/security/csrf';

export enum ClientMethodTypes {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export const ClientPrivateMethodList = [
  ClientMethodTypes.POST,
  ClientMethodTypes.PUT,
  ClientMethodTypes.PATCH,
  ClientMethodTypes.DELETE,
];
