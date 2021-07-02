import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ApiResponse } from 'models/Client.model';

export class HttpClient {
  token: string = null;
  client: AxiosInstance = null;

  constructor(options: AxiosRequestConfig) {
    this.client = axios.create(options);
  }

  setToken(token: string) {
    this.token = token;
  }

  getAuthHeader(): AxiosRequestConfig {
    return !this.token ? null : {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };
  }

  getConfig(config: AxiosRequestConfig = {}, isPrivate: boolean): AxiosRequestConfig {
    return isPrivate
      ? {
        ...this.getAuthHeader(),
        ...config,
      }
      : config;
  }

  get(url, config?: AxiosRequestConfig, isPrivate = true) {
    return this.client.get(url, this.getConfig(config, isPrivate));
  }

  getAuthorized<T>(url: string): Promise<T> {
    // public request
    return this.client.get(this.authorizedUrlFrom(url));
  }

  authorizedUrlFrom(url: string): string {
    return `${url}?access_token=${this.token}`;
  }

  post<T>(url: string, data: any, config?: AxiosRequestConfig, isPrivate = true): Promise<ApiResponse<T>> {
    return this.client.post(url, data, this.getConfig(config, isPrivate));
  }

  patch<T>(url: string, data: any, config?: AxiosRequestConfig, isPrivate = true): Promise<ApiResponse<T>> {
    return this.client.patch(url, data, this.getConfig(config, isPrivate));
  }

  put<T>(url: string, data: any, config?: AxiosRequestConfig, isPrivate = true): Promise<ApiResponse<T>> {
    return this.client.put(url, data, this.getConfig(config, isPrivate));
  }

  delete<T>(url: string, config?: AxiosRequestConfig, isPrivate = true): Promise<ApiResponse<T>> {
    return this.client.delete(url, this.getConfig(config, isPrivate));
  }
}
