import { HttpMethodsEnum } from '../../utils/enums/http-methods.enum';
import { IRequestHeaders } from '../../utils/interfaces/headers.interface';

export interface IRequestConfig {
  path: string;
  headers?: IRequestHeaders;
  method: HttpMethodsEnum;
}
