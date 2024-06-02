import { HttpMethodsEnum } from '../../utils/enums/http-methods.enum';
import { InterceptorByEnum } from '../../utils/enums/interceptor-by.enum';
import { validateInterceptorOptions } from '../../utils/helpers/validate-interceptor';
import { IRequestInterceptor } from '../../utils/interfaces/interceptor-options.interface';
import { IRequestConfig } from '../../utils/interfaces/request-config.interface';

export class RequestInterceptor {
  private interceptors: IRequestInterceptor[] = [];
  constructor() {}

  add(interceptor: IRequestInterceptor) {
    validateInterceptorOptions(interceptor);
    this.interceptors.push(interceptor);
  }

  private matchPath(interceptor: IRequestInterceptor, path: string): boolean {
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
      const matchesMethod = interceptor.methods?.includes(method) && interceptor.by.includes(InterceptorByEnum.METHOD);
      const matchesPath = this.matchPath(interceptor, path);
      if (matchesMethod && matchesPath) {
        return true;
      }

      if (matchesPath) {
        return true;
      }
      
      if(matchesMethod) {
        return true;
      }

      return false;
    });
  }

  runInterceptor(config: IRequestConfig): void {
    const interceptor = this.findInterceptors(config.path, config.method);
    return interceptor?.interception(config);
  }
}
