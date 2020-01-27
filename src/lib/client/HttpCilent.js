import axios from 'axios';

export class HttpClient {
  /**
   * @type {string|null}
   */
  token = null;

  /**
   * @type {AxiosInstance|null}
   */
  client = null;

  constructor(options) {
    this.client = axios.create(options);
  }

  setToken(token) {
    this.token = token;
  }

  getAuthHeader() {
    return !this.token ? null : {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };
  }

  getConfig(config = {}, isPrivate) {
    return isPrivate
      ? {
        ...this.getAuthHeader(),
        ...config,
      }
      : config;
  }

  get(url, config, isPrivate = true) {
    return this.client.get(url, this.getConfig(config, isPrivate));
  }

  getAuthorized(url) {
    // public request
    return this.client.get(this.authorizedUrlFrom(url));
  }

  authorizedUrlFrom(url) {
    return `${url}?access_token=${this.token}`;
  }

  post(url, data, config, isPrivate = true) {
    return this.client.post(url, data, this.getConfig(config, isPrivate));
  }

  patch(url, data, config, isPrivate = true) {
    return this.client.patch(url, data, this.getConfig(config, isPrivate));
  }

  put(url, data, config, isPrivate = true) {
    return this.client.put(url, data, this.getConfig(config, isPrivate));
  }

  delete(url, config, isPrivate = true) {
    return this.client.delete(url, this.getConfig(config, isPrivate));
  }
}
