import { SimplrCache } from './handlers/cache.handler';
import { SimplrError } from './handlers/error.handler';
import { SimplrResponse } from './handlers/response.handler';
import { RequestInterceptor } from './interceptors/request';
import { ResponseInterceptor } from './interceptors/response';
import { Delete } from './methods/Delete';
import { Get } from './methods/Get';
import { Patch } from './methods/Patch';
import { Post } from './methods/Post';
import { Put } from './methods/Put';
import { HttpMethodsEnum } from './utils/enums/http-methods.enum';
import { secureUrl } from './utils/helpers/secure-url';
import { IExpiresAt } from './utils/interfaces/expires-at.interface';
import { IRequestHeaders } from './utils/interfaces/headers.interface';
import {
  IRequestInterceptor,
  IResponseInterceptor,
} from './utils/interfaces/interceptor-options.interface';
import { IRequestOptions } from './utils/interfaces/request-options.interface';

export class Simplr {
  private _url: string = 'http://localhost:3000';
  protected headers!: IRequestHeaders;
  protected responseInterceptor = new ResponseInterceptor();
  protected requestInterceptor = new RequestInterceptor();
  protected simplrCache = new SimplrCache();

  public interceptor = {
    response: {
      add: this.addResponseInterceptor.bind(this),
    },
    request: {
      add: this.addRequestInterceptor.bind(this),
    },
  };

  protected listenAndCache = async (
    key: string,
    request: () => Promise<SimplrResponse>,
    expirestAt?: IExpiresAt,
  ) => {
    const resp = await this.simplrCache.listenAndCache(
      key,
      request,
      expirestAt,
    );
    return new SimplrResponse(resp.status, resp.data, resp.statusText);
  };

  public cache = {
    set: this.simplrCache.set,
    get: this.simplrCache.get,
    clear: this.simplrCache.clear,
    remove: this.simplrCache.remove,
    listenAndCache: this.listenAndCache,
  };

  constructor() {}

  init(url?: string) {
    if (url) {
      this._url = url;
    }
    return this;
  }

  protected addResponseInterceptor(interceptor: IResponseInterceptor) {
    this.responseInterceptor.add(interceptor);
  }

  protected addRequestInterceptor(interceptor: IRequestInterceptor) {
    this.requestInterceptor.add(interceptor);
  }

  get url() {
    return this._url;
  }

  async get(
    path: string = '',
    options?: IRequestOptions,
  ): Promise<SimplrResponse> {
    const { URL, PATH } = secureUrl(this._url, path);
    const config = {
      url: URL,
      path: PATH,
      headers: options?.headers,
      method: HttpMethodsEnum.GET,
    };

    this.requestInterceptor.runInterceptor(config);

    const getInstance = new Get(URL, config.path, {
      ...options,
      headers: config.headers,
    });

    const resp = await this.responseInterceptor.runInterceptor(
      () => getInstance.runIt(),
      config.path,
      HttpMethodsEnum.GET,
    );
    if (resp.ok) {
      return new SimplrResponse(resp.status, resp.data, resp.statusText);
    }
    throw new SimplrError(resp.status, resp.statusText, resp.data);
  }

  async post(
    path: string = '',
    data?: any,
    options?: IRequestOptions,
  ): Promise<SimplrResponse> {
    const { URL, PATH } = secureUrl(this._url, path);
    const config = {
      url: URL,
      path: PATH,
      headers: options?.headers,
      method: HttpMethodsEnum.POST,
    };

    this.requestInterceptor.runInterceptor(config);

    const postInstance = new Post(this._url, path, {
      body: data,
      headers: options?.headers,
    });

    const resp = await this.responseInterceptor.runInterceptor(
      () => postInstance.runIt(),
      config.path,
      HttpMethodsEnum.POST,
    );
    if (resp.ok) {
      return new SimplrResponse(resp.status, resp.data, resp.statusText);
    }
    throw new SimplrError(resp.status, resp.statusText, resp.data);
  }

  async put(path: string = '', data?: any, options?: IRequestOptions) {
    const { URL, PATH } = secureUrl(this._url, path);
    const config = {
      url: URL,
      path: PATH,
      headers: options?.headers,
      method: HttpMethodsEnum.PUT,
    };

    this.requestInterceptor.runInterceptor(config);

    const putInstance = new Put(this._url, path, {
      body: data,
      headers: options?.headers,
    });

    const resp = await this.responseInterceptor.runInterceptor(
      () => putInstance.runIt(),
      path,
      HttpMethodsEnum.PUT,
    );
    if (resp.ok) {
      return new SimplrResponse(resp.status, resp.data, resp.statusText);
    }
    throw new SimplrError(resp.status, resp.statusText, resp.data);
  }

  async patch(path: string = '', data?: any, options?: IRequestOptions) {
    const { URL, PATH } = secureUrl(this._url, path);
    const config = {
      url: URL,
      path: PATH,
      headers: options?.headers,
      method: HttpMethodsEnum.PATCH,
    };

    this.requestInterceptor.runInterceptor(config);

    const patchInstance = new Patch(this._url, path, {
      body: data,
      headers: options?.headers,
    });

    const resp = await this.responseInterceptor.runInterceptor(
      () => patchInstance.runIt(),
      path,
      HttpMethodsEnum.PATCH,
    );

    if (resp.ok) {
      return new SimplrResponse(resp.status, resp.data, resp.statusText);
    }
    throw new SimplrError(resp.status, resp.statusText, resp.data);
  }

  async delete(path: string = '', data?: any, options?: IRequestOptions) {
    const { URL, PATH } = secureUrl(this._url, path);
    const config = {
      url: URL,
      path: PATH,
      headers: options?.headers,
      method: HttpMethodsEnum.DELETE,
    };

    this.requestInterceptor.runInterceptor(config);
    const deleteInstance = new Delete(this._url, path, {
      body: data,
      headers: options?.headers,
    });

    const resp = await this.responseInterceptor.runInterceptor(
      () => deleteInstance.runIt(),
      path,
      HttpMethodsEnum.DELETE,
    );
    if (resp.ok) {
      return new SimplrResponse(resp.status, resp.data, resp.statusText);
    }

    throw new SimplrError(resp.status, resp.statusText, resp.data);
  }
}

export const simplr = new Simplr();
