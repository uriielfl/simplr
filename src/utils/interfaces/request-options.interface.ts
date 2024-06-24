import { IRequestHeaders } from './headers.interface';

export interface IRequestOptions {
  headers?: IRequestHeaders;
  body?: BodyInit | any;
}
