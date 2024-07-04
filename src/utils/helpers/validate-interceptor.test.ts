import { SimplrResponse } from '../../handlers/response.handler';
import { HttpMethodsEnum } from '../enums/http-methods.enum';
import { InterceptorByEnum } from '../enums/interceptor-by.enum';
import {
  IRequestInterceptor,
  IResponseInterceptor,
} from '../interfaces/interceptor-options.interface';
import { validateInterceptorOptions } from './validate-interceptor';

describe('Interceptor Validator', () => {
  it('should throw an error if both PATH and EXACT_PATH are in the by array', () => {
    const interception = (resp: SimplrResponse) => {
      resp.data = 'intercepted';
      return resp;
    }
    const config: IResponseInterceptor = {
      by: [InterceptorByEnum.PATH, InterceptorByEnum.EXACT_PATH],
      interception:interception
    };

    expect(() => validateInterceptorOptions(config)).toThrow(
      'Cannot have both PATH and EXACT_PATH in by array',
    );
  });

  it('should throw an error if path is used without PATH or EXACT_PATH', () => {
    const interception = (resp: SimplrResponse) => {
      resp.data = 'intercepted';
      return resp;
    }
    const config: IResponseInterceptor = {
      by: [InterceptorByEnum.METHOD],
      path: '/test',
      interception: interception
    };

    expect(() => validateInterceptorOptions(config)).toThrow(
      'Path must be used with PATH or EXACT_PATH',
    );
  });

  it('should throw an error if method is used without METHOD', () => {
    const config: IRequestInterceptor = {
      by: [InterceptorByEnum.PATH],
      methods: [HttpMethodsEnum.GET],
      interception: () => null,
    };

    expect(() => validateInterceptorOptions(config)).toThrow(
      'Method must be used with METHOD',
    );
  });

  it('should throw an error if params are used without PATH', () => {
    const config: IRequestInterceptor = {
      by: [InterceptorByEnum.METHOD],
      params: ['test'],
      interception: () => null,
    };

    expect(() => validateInterceptorOptions(config)).toThrow(
      'Params must be used with PATH',
    );
  });

  it('should throw an error if params are not rightly formatted in the path', () => {
    const config: IRequestInterceptor = {
      by: [InterceptorByEnum.PATH],
      params: ['test'],
      path: '/test',
      interception: () => null,
    };

    expect(() => validateInterceptorOptions(config)).toThrow(
      'Params must be formatted like {param}',
    );
  });
});
