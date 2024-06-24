import { HttpMethodsEnum } from '../../utils/enums/http-methods.enum';
import { InterceptorByEnum } from '../../utils/enums/interceptor-by.enum';
import { ICacheOptions } from './cache-options.interface';
import { IRequestConfig } from './request-config.interface';

export interface IRequestInterceptor {
  by: InterceptorByEnum[];
  interception: (config: IRequestConfig) => any;
  path?: string;
  methods?: HttpMethodsEnum[];
  params?: string[];
}

export interface IResponseInterceptor {
  by: InterceptorByEnum[];
  interception?: (response: Promise<any>) => any;
  path?: string;
  methods?: HttpMethodsEnum[];
  params?: string[];
  // cache?: ICacheOptions;
}
