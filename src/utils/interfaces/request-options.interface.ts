import { ICacheOptions } from "./cache-options.interface";
import { IRequestHeaders } from "./headers.interface";

export interface IRequestOptions {
    headers?: IRequestHeaders;
    body?: BodyInit | any;

}