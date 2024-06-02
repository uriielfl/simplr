import { IHeaderRequest } from "lightie-request/src/utils/interfaces/header.interface";
import { HttpMethodsEnum } from "../enums/http-methods.enum";

export interface IRequestConfig {
    url: string;
    path: string;
    headers?: IHeaderRequest;
    method: HttpMethodsEnum;
  }