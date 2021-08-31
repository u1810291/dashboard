import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ApiResponse, CLIENT_CSRF_HEADER_NAME, CLIENT_CSRF_URL, ClientCSRFResponse, ClientMethodTypes, ClientPrivateMethodList } from 'models/Client.model';

export class HttpClient {
  private bearerToken: string = null;
  private csrf: string = null;
  private client: AxiosInstance = null;

  constructor(options: AxiosRequestConfig) {
    this.client = axios.create(options);
  }

  setBearerToken(token: string) {
    this.bearerToken = token;
  }

  async getHeaders(method: ClientMethodTypes, isPrivate: boolean) {
    const headers: any = {};
    if (isPrivate && this.bearerToken) {
      headers.Authorization = `Bearer ${this.bearerToken}`;
    }
    if (ClientPrivateMethodList.includes(method)) {
      headers[CLIENT_CSRF_HEADER_NAME] = await this.getCSRFToken();
    }
    return headers;
  }

  async getCSRFToken() {
    try {
      this.csrf = this.csrf || await this.resolveCSRFToken();
    } catch (e) {
      // eslint-disable-next-line
      console.error('CSRF token error', (e as any).message)
      this.csrf = null;
    }
    return this.csrf;
  }

  async resolveCSRFToken(): Promise<string> {
    const { data } = await this.get<ClientCSRFResponse>(CLIENT_CSRF_URL, null, false);
    return data?.token;
  }

  // TODO @dkchv: !!! remove any
  async get<T = any>(url: string, config?: AxiosRequestConfig, isPrivate = true): Promise<ApiResponse<T>> {
    return this.client.request({
      url,
      ...config,
      method: ClientMethodTypes.GET,
      headers: await this.getHeaders(ClientMethodTypes.GET, isPrivate),
      withCredentials: true,
    });
  }

  async post<T>(url: string, data: any, config?: AxiosRequestConfig, isPrivate = true): Promise<ApiResponse<T>> {
    return this.client.request({
      ...config,
      url: this.getCorsURL(url),
      data,
      method: ClientMethodTypes.POST,
      headers: await this.getHeaders(ClientMethodTypes.POST, isPrivate),
      withCredentials: true,
    });
  }

  async patch<T>(url: string, data: any, config?: AxiosRequestConfig, isPrivate = true): Promise<ApiResponse<T>> {
    return this.client.request({
      ...config,
      url: this.getCorsURL(url),
      data,
      method: ClientMethodTypes.PATCH,
      headers: await this.getHeaders(ClientMethodTypes.PATCH, isPrivate),
      withCredentials: true,
    });
  }

  async put<T>(url: string, data: any, config?: AxiosRequestConfig, isPrivate = true): Promise<ApiResponse<T>> {
    return this.client.request({
      ...config,
      url: this.getCorsURL(url),
      data,
      method: ClientMethodTypes.PUT,
      headers: await this.getHeaders(ClientMethodTypes.PUT, isPrivate),
      withCredentials: true,
    });
  }

  async delete<T>(url: string, config?: AxiosRequestConfig, isPrivate = true): Promise<ApiResponse<T>> {
    return this.client.request({
      ...config,
      url: this.getCorsURL(url),
      method: ClientMethodTypes.DELETE,
      headers: await this.getHeaders(ClientMethodTypes.DELETE, isPrivate),
      withCredentials: true,
    });
  }

  private getCorsURL(path: string): string {
    return process.env.REACT_APP_CORS_URL
      ? `${process.env.REACT_APP_CORS_URL}${process.env.REACT_APP_CORS_PATH}${path}`
      : path;
  }
}
