import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { goToPage } from 'lib/url';
import { ApiResponse, CLIENT_CSRF_HEADER_NAME, CLIENT_CSRF_URL, ClientCSRFResponse, ClientErrorTypes, ClientMethodTypes, ClientPrivateMethodList } from 'models/Client.model';
import { devWarn } from 'lib/console';
import { ErrorStatuses } from 'models/Error.model';
import { Routes } from 'models/Router.model';

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
    const headers: any = {
      'x-mati-app': `platform=dashboard; version=${process.env.REACT_APP_VERSION}`,
    };

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
    devWarn('New CSRF token:', data?.token);
    return data?.token;
  }

  async createRequest<T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      return await this.client.request(config);
    } catch (error: any) {
      const type = error?.response?.data?.details?.type;
      if (error?.response?.data?.status === ErrorStatuses.BlockedByMerchant && !window.location.pathname.startsWith(Routes.auth.signIn)) {
        this.csrf = null;
        goToPage(Routes.auth.signIn);
      }
      if (type === ClientErrorTypes.CSRFTokenNotFound || type === ClientErrorTypes.CSRFTokenNotValid) {
        // eslint-disable-next-line
        console.error('CSRF error:', error?.message);
        this.csrf = null;
      }
      throw error;
    }
  }

  // TODO @dkchv: !!! remove any
  async get<T = any>(url: string, config?: AxiosRequestConfig, isPrivate = true): Promise<ApiResponse<T>> {
    return this.createRequest<T>({
      url: this.getCorsURL(url),
      ...config,
      method: ClientMethodTypes.GET,
      headers: await this.getHeaders(ClientMethodTypes.GET, isPrivate),
      withCredentials: true,
    });
  }

  async post<T>(url: string, data: any, config?: AxiosRequestConfig, isPrivate = true): Promise<ApiResponse<T>> {
    return this.createRequest<T>({
      ...config,
      url: this.getCorsURL(url),
      data,
      method: ClientMethodTypes.POST,
      headers: await this.getHeaders(ClientMethodTypes.POST, isPrivate),
      withCredentials: true,
    });
  }

  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig, isPrivate = true): Promise<ApiResponse<T>> {
    return this.createRequest<T>({
      ...config,
      url: this.getCorsURL(url),
      data,
      method: ClientMethodTypes.PATCH,
      headers: await this.getHeaders(ClientMethodTypes.PATCH, isPrivate),
      withCredentials: true,
    });
  }

  async put<T>(url: string, data: any, config?: AxiosRequestConfig, isPrivate = true): Promise<ApiResponse<T>> {
    return this.createRequest<T>({
      ...config,
      url: this.getCorsURL(url),
      data,
      method: ClientMethodTypes.PUT,
      headers: await this.getHeaders(ClientMethodTypes.PUT, isPrivate),
      withCredentials: true,
    });
  }

  async delete<T>(url: string, config?: AxiosRequestConfig, isPrivate = true): Promise<ApiResponse<T>> {
    return this.createRequest<T>({
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
