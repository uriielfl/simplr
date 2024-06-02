export { simplr } from './src/main';

// ENUMS
export {InterceptorByEnum} from './src/utils/enums/interceptor-by.enum';
export {HttpMethodsEnum} from './src/utils/enums/http-methods.enum';

// INTERFACES
export type { IRequestConfig } from './src/utils/interfaces/request-config.interface';
export type { IRequestHeaders } from './src/utils/interfaces/headers.interface';
export type { IRequestInterceptor, IResponseInterceptor } from './src/utils/interfaces/interceptor-options.interface';
export type { IResponse } from './src/utils/interfaces/response.interface';
export type { ICacheOptions } from './src/utils/interfaces/cache-options.interface';
export type { IRequestOptions } from './src/utils/interfaces/request-options.interface';

// HANDLERS
export { SimplrError } from './src/handlers/error.handler';
export { SimplrResponse } from './src/handlers/response.handler';
