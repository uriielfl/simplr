import { HttpMethodsEnum } from '../../utils/enums/http-methods.enum';
import { InterceptorByEnum } from '../../utils/enums/interceptor-by.enum';
import { RequestInterceptor } from './index';

describe('RequestInterceptor', () => {
  let interceptor: RequestInterceptor;

  beforeEach(() => {
    interceptor = new RequestInterceptor();
  });

  it('should add an interceptor', () => {
    const interceptorOptions = {
      by: [InterceptorByEnum.METHOD],
      methods: [HttpMethodsEnum.GET],
      interception: jest.fn(),
    };

    interceptor.add(interceptorOptions);

    expect(interceptor['interceptors']).toContain(interceptorOptions);
  });

  it('should match only method', () => {
    const interceptorOptions1 = {
      by: [InterceptorByEnum.METHOD],
      methods: [HttpMethodsEnum.GET],
      interception: jest.fn(),
    };

    const interceptorOptions2 = {
      by: [InterceptorByEnum.METHOD],
      methods: [HttpMethodsEnum.POST],
      interception: jest.fn(),
    };

    interceptor.add(interceptorOptions1);
    interceptor.add(interceptorOptions2);

    const config = {
      path: '/test',
      method: HttpMethodsEnum.GET,
      url: 'http://localhost:3000',
    };

    interceptor.runInterceptor(config);

    expect(interceptorOptions1.interception).toHaveBeenCalledWith(config);
    expect(interceptorOptions2.interception).not.toHaveBeenCalled();
  });
  it('should match only exact path', () => {
    const interceptorOptions = {
      by: [InterceptorByEnum.EXACT_PATH],
      path: '/test',
      interception: jest.fn(),
    };

    interceptor.add(interceptorOptions);

    const config = {
      path: '/test',
      method: HttpMethodsEnum.GET,
      url: 'http://localhost:3000',
    };

    interceptor.runInterceptor(config);

    expect(interceptorOptions.interception).toHaveBeenCalledWith(config);
  });

  it('should not match exact path', () => {
    const interceptorOptions = {
      by: [InterceptorByEnum.EXACT_PATH, InterceptorByEnum.METHOD],
      path: '/test',
      methods: [HttpMethodsEnum.GET],
      interception: jest.fn(),
    };

    interceptor.add(interceptorOptions);

    const config = {
      path: '/test/extra',
      method: HttpMethodsEnum.GET,
    };

    interceptor.runInterceptor(config);

    expect(interceptorOptions.interception).not.toHaveBeenCalled();
  });

  it('should match path with method', () => {
    const interceptorOptions = {
      by: [InterceptorByEnum.PATH, InterceptorByEnum.METHOD],
      path: '/test/{id}',
      params: ['id'],
      methods: [HttpMethodsEnum.GET],
      interception: jest.fn(),
    };

    interceptor.add(interceptorOptions);

    const config = {
      path: '/test/123',
      method: HttpMethodsEnum.GET,
      url: 'http://localhost:3000',
    };

    interceptor.runInterceptor(config);

    expect(interceptorOptions.interception).toHaveBeenCalledWith(config);
  });

  it('should not match exact path with method', () => {
    const interceptorOptions = {
      by: [InterceptorByEnum.EXACT_PATH, InterceptorByEnum.METHOD],
      path: '/tests',
      methods: [HttpMethodsEnum.POST],
      interception: jest.fn(),
    };

    interceptor.add(interceptorOptions);

    const config = {
      path: '/test/123',
      method: HttpMethodsEnum.GET,
    };
    interceptor.runInterceptor(config);

    expect(interceptorOptions.interception).not.toHaveBeenCalled();
  });
  it('should match only path ', () => {
    const interceptorOptions = {
      by: [InterceptorByEnum.PATH],
      path: '/tests/{id}',
      params: ['id'],
      interception: jest.fn(),
    };

    interceptor.add(interceptorOptions);

    const config = {
      path: '/tests/123',
      method: HttpMethodsEnum.GET,
    };
    interceptor.runInterceptor(config);

    expect(interceptorOptions.interception).toHaveBeenCalled();
  });
});
