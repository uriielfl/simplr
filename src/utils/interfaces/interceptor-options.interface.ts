import { SimplrResponse } from '../../handlers/response.handler';
import { HttpMethodsEnum } from '../../utils/enums/http-methods.enum';
import { InterceptorByEnum } from '../../utils/enums/interceptor-by.enum';
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
  interception?: (response: SimplrResponse) => SimplrResponse;
  path?: string;
  methods?: HttpMethodsEnum[];
  params?: string[];
}
