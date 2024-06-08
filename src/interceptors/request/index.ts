import { HttpMethodsEnum } from '@/utils/enums/http-methods.enum';
import { InterceptorByEnum } from '@/utils/enums/interceptor-by.enum';
import { validateInterceptorOptions } from '@/utils/helpers/validate-interceptor';
import { IRequestInterceptor } from '@/utils/interfaces/interceptor-options.interface';
import { IRequestConfig } from '@/utils/interfaces/request-config.interface';

export class RequestInterceptor {
  private interceptors: IRequestInterceptor[] = [];
  constructor() {}

  add(interceptor: IRequestInterceptor) {
    validateInterceptorOptions(interceptor);
    this.interceptors.push(interceptor);
  }

  private matchPath(interceptor: IRequestInterceptor, path: string): boolean {
    if (interceptor.by.includes(InterceptorByEnum.EXACT_PATH)) {
      return interceptor.path === path;
    }
    if (interceptor.by.includes(InterceptorByEnum.PATH)) {
      let regexPath = '^' + interceptor.path + '$';
      if (interceptor.params) {
        for (const param of interceptor.params) {
          regexPath = regexPath.replace(`{${param}}`, '.*');
        }
      }
      const regex = new RegExp(regexPath);
      return regex.test(path);
    }

    return false;
  }

  private findInterceptors(path: string, method: HttpMethodsEnum) {
    return this.interceptors.find((interceptor) => {
      const matchesMethod =
        interceptor.methods?.includes(method) &&
        interceptor.by.includes(InterceptorByEnum.METHOD);
      const matchesPath = this.matchPath(interceptor, path);
      const shouldMatchMethod =
        interceptor.by.length === 1 &&
        interceptor.by[0] === InterceptorByEnum.METHOD;
      const shouldMatchPath =
        interceptor.by.length === 1 &&
        interceptor.by[0] === InterceptorByEnum.PATH;
      const shouldMatchExactPath =
        interceptor.by.length === 1 &&
        interceptor.by[0] === InterceptorByEnum.EXACT_PATH;
      const shouldMatchMethodAndPath =
        interceptor.by.length === 2 &&
        interceptor.by.includes(InterceptorByEnum.METHOD) &&
        (interceptor.by.includes(InterceptorByEnum.PATH) ||
          interceptor.by.includes(InterceptorByEnum.EXACT_PATH));
      if (shouldMatchMethodAndPath) {
        return matchesMethod && matchesPath;
      }

      if (shouldMatchMethod) {
        return matchesMethod;
      }

      if (shouldMatchPath) {
        return matchesPath;
      }

      if (shouldMatchExactPath) {
        return matchesPath;
      }
    });
  }

  runInterceptor(config: IRequestConfig): void {
    const interceptor = this.findInterceptors(config.path, config.method);
    return interceptor?.interception(config);
  }
}
