import { RequestInterceptor } from './interceptors/request';
import { ResponseInterceptor } from './interceptors/response';
import { Delete } from './methods/Delete';
import { Get } from './methods/Get';
import { Patch } from './methods/Patch';
import { Post } from './methods/Post';
import { Put } from './methods/Put';
import { HttpMethodsEnum } from './utils/enums/http-methods.enum';
import { IRequestHeaders } from './utils/interfaces/headers.interface';
import { IRequestOptions } from './utils/interfaces/request-options.interface';
import { IResponse } from './utils/interfaces/response.interface';

export class Simplr {
  protected url: string = 'http://localhost:3000';
  protected headers!: IRequestHeaders;
  public responseInterceptor = new ResponseInterceptor();
  public requestInterceptor = new RequestInterceptor();

  constructor() {}

  init(url: string) {
    this.url = url;
    return this;
  }

  async get(path: string = '', options?: IRequestOptions): Promise<IResponse> {
    const config = {
      url: this.url,
      path,
      headers: options?.headers,
      method: HttpMethodsEnum.GET,
    };
    
    this.requestInterceptor.runInterceptor(config);
  
    const response = new Get(this.url, config.path, {...options, headers: config.headers});

    return await this.responseInterceptor.runInterceptor(
      () => response.runIt(),
      path,
      HttpMethodsEnum.GET,
    );
  }

  async post(path: string = '', data?: any, options?: IRequestOptions) {
    const config = {
      url: this.url,
      path,
      headers: options?.headers,
      method: HttpMethodsEnum.POST,
    };

    this.requestInterceptor.runInterceptor(config);

    const response = new Post(this.url, path, {
      body: data,
      headers: options?.headers,
    });

    return this.responseInterceptor.runInterceptor(
        () => response.runIt(),
        path,
        HttpMethodsEnum.POST,
    );
  }

  async put(path: string = '', data?: any, options?: IRequestOptions) {
    const config = {
      url: this.url,
      path,
      headers: options?.headers,
      method: HttpMethodsEnum.PUT,
    };

    this.requestInterceptor.runInterceptor(config);

    const response = new Put(this.url, path, {
      body: data,
      headers: options?.headers,
    });

    return this.responseInterceptor.runInterceptor(
        () => response.runIt(),
        path,
        HttpMethodsEnum.PUT,
    );
  }
  
  async patch(path: string = '', data?: any, options?: IRequestOptions) {
    const config = {
      url: this.url,
      path,
      headers: options?.headers,
      method: HttpMethodsEnum.PATCH,
    };

    this.requestInterceptor.runInterceptor(config);
 
    const response = new Patch(this.url, path, {
      body: data,
      headers: options?.headers,
    });

    return this.responseInterceptor.runInterceptor(
        () => response.runIt(),
        path,
        HttpMethodsEnum.PATCH,
    );
  }

  async delete(path: string = '', data?: any, options?: IRequestOptions) {
    const config = {
      url: this.url,
      path,
      headers: options?.headers,
      method: HttpMethodsEnum.DELETE,
    };

    this.requestInterceptor.runInterceptor(config);

    const response = new Delete(this.url, path, {
      body: data,
      headers: options?.headers,
    });

    return this.responseInterceptor.runInterceptor(
        () => response.runIt(),
        path,
        HttpMethodsEnum.DELETE,
    );
  }
}

export const simplr = new Simplr();