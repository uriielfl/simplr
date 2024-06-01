import { HttpMethodsEnum } from '../../utils/enums/http-methods.enum';
import { InterceptorByEnum } from '../../utils/enums/interceptor-by.enum';
import { validateInterceptorOptions } from '../../utils/helpers/validate-interceptor';
import { IResponseInterceptorOptions } from '../../utils/interfaces/interceptor-options.interface';
import { Cache } from '../../handlers/cache.handler';

export class ResponseInterceptor {
  private interceptors: IResponseInterceptorOptions[] = [];
  private cache = new Cache();
  constructor() {}

  add(interceptor: IResponseInterceptorOptions) {
    validateInterceptorOptions(interceptor);
    this.interceptors.push(interceptor);
  }

  private matchPath(
    interceptor: IResponseInterceptorOptions,
    path: string,
  ): boolean {
    if (!interceptor.path) {
      return false;
    }

    if (interceptor.by.includes(InterceptorByEnum.EXACT_PATH)) {
      return interceptor.path === path;
    }

    if (interceptor.by.includes(InterceptorByEnum.PATH)) {
      const regexPath = new RegExp(
        '^' + interceptor.path.replace(/\{.*?\}/g, '.*') + '$',
      );
      return regexPath.test(path);
    }

    return false;
  }

  private findInterceptors(path: string, method: HttpMethodsEnum) {
    return this.interceptors.find((interceptor) => {
      const matchesMethod =
        interceptor.methods?.includes(method) &&
        interceptor.by.includes(InterceptorByEnum.METHOD);
      const matchesPath = this.matchPath(interceptor, path);
      if (matchesMethod && matchesPath) {
        return true;
      }
      if (matchesPath) {
        return true;
      }
      if (matchesMethod) {
        return true;
      }
      return false;
    });
  }

  async runInterceptor(
    req: () => Promise<any>,
    path: string,
    method: HttpMethodsEnum,
  ) {
    const interceptor = this.findInterceptors(path, method);
    const cacheKey = `/${path}:${method}`;
    const cacheData = await this.cache.get(cacheKey);
    if(interceptor?.cache?.cacheResponse) {
      if(!!cacheData) {
        return cacheData;
      } else {
        const response = await interceptor?.interception(await req());
        await this.cache.set(cacheKey, response, interceptor.cache.expiresAt ?? 0);
        return response;
      }
    }
    return await interceptor?.interception(await req());
  }
}
