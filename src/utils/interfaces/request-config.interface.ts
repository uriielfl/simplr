import { IRequestHeaders } from "../interfaces/headers.interface";
import { HttpMethodsEnum } from "../enums/http-methods.enum";

export interface IRequestConfig {
    url: string;
    path: string;
    headers?: IRequestHeaders;
    method: HttpMethodsEnum;
  }