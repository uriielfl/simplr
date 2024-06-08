import { IRequestHeaders } from "@/utils/interfaces/headers.interface";
import { HttpMethodsEnum } from "@/utils/enums/http-methods.enum";

export interface IRequestConfig {
    path: string;
    headers?: IRequestHeaders;
    method: HttpMethodsEnum;
  }