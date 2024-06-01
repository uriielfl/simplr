import { HttpMethodsEnum } from "../enums/http-methods.enum";
import { InterceptorByEnum } from "../enums/interceptor-by.enum";
import { ICacheOptions } from "./cache-options.interface";
import { IRequestHeaders } from "./headers.interface";
import { IRequestOptions } from "./request-options.interface";

export interface IRequestInterceptorOptions {
    by: InterceptorByEnum[];
    interception: (params: IRequestOptions) => any | void;
    path?: string;
    methods?: HttpMethodsEnum[];
    params?: string[];
}

export interface IResponseInterceptorOptions {
    by: InterceptorByEnum[];
    interception: (params: Promise<any>) => any;
    path?: string;
    methods?: HttpMethodsEnum[];
    params?: string[];
    cache?: ICacheOptions;
}