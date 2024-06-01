import { Cache } from './handlers/cache.handler';
import { RequestInterceptor } from './interceptors/request';
import { ResponseInterceptor } from './interceptors/response';
import { Delete } from './methods/Delete';
import { Get } from './methods/Get';
import { Patch } from './methods/Patch';
import { Post } from './methods/Post';
import { Put } from './methods/Put';
import { HttpMethodsEnum } from './utils/enums/http-methods.enum';
import { InterceptorByEnum } from './utils/enums/interceptor-by.enum';
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
    const response = new Get(this.url, path, options);
    this.requestInterceptor.runInterceptor(
      options ?? {},
      path,
      HttpMethodsEnum.GET,
    );
    return this.responseInterceptor.runInterceptor(
      () => response.runIt(),
      path,
      HttpMethodsEnum.GET,
    );
  }

  async post(path: string = '', data?: any, options?: IRequestOptions) {
    this.requestInterceptor.runInterceptor(
        options ?? {},
        path,
        HttpMethodsEnum.POST,
    );

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
    this.requestInterceptor.runInterceptor(
        options ?? {},
        path,
        HttpMethodsEnum.PUT,
    );

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
    this.requestInterceptor.runInterceptor(
        options ?? {},
        path,
        HttpMethodsEnum.PATCH,
    );

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
    this.requestInterceptor.runInterceptor(
        options ?? {},
        path,
        HttpMethodsEnum.DELETE,
    );

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

// const api = simplr.init('https://jsonplaceholder.typicode.com');

// const options = {
//   headers: {
//     Header: 'Value',
//   },
// };

// const interceptFunction = (params: any) => {
//   return params
//     .then((response: any) => {
//       console.log('Essa rota existe');
//       response.data = 'intercepted';
//       return response;
//     })
//     .catch((error: any) => {
//       console.log('Essa não');
//       error.message = 'intercepted error';
//       return error;
//     });
// };

// const requestInterceptFunction = (params: IRequestOptions) => {
//   params.headers = {
//     ...params.headers,
//     intercepted: 'true',
//   };
//   return params;
// };

// api.requestInterceptor.add({
//   by: [InterceptorByEnum.METHOD],
//   interception: requestInterceptFunction,
//   methods: [HttpMethodsEnum.GET],
// });
// api.responseInterceptor.add({
//   by: [InterceptorByEnum.METHOD],
//   interception: interceptFunction,
//   methods: [HttpMethodsEnum.GET],
// });
// api
//   .get('/posts', options)
//   .then((response) => {
//     console.log(response);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// api
//   .get('/postsss', options)
//   .then((response) => {
//     console.log(response);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
