import { HttpMethodsEnum } from '../../utils/enums/http-methods.enum';
import { InterceptorByEnum } from '../../utils/enums/interceptor-by.enum';
import { ResponseInterceptor } from './index';

describe('ResponseInterceptor', () => {
  let responseInterceptor: ResponseInterceptor;

  beforeEach(() => {
    responseInterceptor = new ResponseInterceptor();
  });

  it('should run the correct interceptor if method matchs', async () => {
    const interceptor = {
      by: [InterceptorByEnum.METHOD],
      methods: [HttpMethodsEnum.GET],
      interception: jest.fn().mockResolvedValue('intercepted'),
    };

    responseInterceptor.add(interceptor);

    const req = jest.fn().mockResolvedValue('original');
    const result = await responseInterceptor.runInterceptor(
      req,
      '/test',
      HttpMethodsEnum.GET,
    );

    expect(interceptor.interception).toHaveBeenCalled();
    expect(req).toHaveBeenCalled();
    expect(result).toBe('intercepted');
  });

  it('should run the original request if method does not matches', async () => {
    const interceptor = {
      by: [InterceptorByEnum.METHOD],
      methods: [HttpMethodsEnum.POST],
      interception: jest.fn().mockResolvedValue('intercepted'),
    };

    responseInterceptor.add(interceptor);

    const req = jest.fn().mockResolvedValue('original');
    const result = await responseInterceptor.runInterceptor(
      req,
      '/test',
      HttpMethodsEnum.GET,
    );

    expect(interceptor.interception).not.toHaveBeenCalled();
    expect(req).toHaveBeenCalled();
    expect(result).toBe('original');
  });

  it('should run the correct interceptor if method and exact path matchs', async () => {
    const interceptor = {
      by: [InterceptorByEnum.METHOD, InterceptorByEnum.EXACT_PATH],
      methods: [HttpMethodsEnum.GET],
      path: '/test',
      interception: jest.fn().mockResolvedValue('intercepted'),
    };

    responseInterceptor.add(interceptor);

    const req = jest.fn().mockResolvedValue('original');
    const result = await responseInterceptor.runInterceptor(
      req,
      '/test',
      HttpMethodsEnum.GET,
    );

    expect(interceptor.interception).toHaveBeenCalled();
    expect(req).toHaveBeenCalled();
    expect(result).toBe('intercepted');
  });
  it('should run the correct interceptor if exact path matches', async () => {
    const interceptor = {
      by: [InterceptorByEnum.EXACT_PATH],
      path: '/test',
      interception: jest.fn().mockResolvedValue('intercepted'),
    };

    responseInterceptor.add(interceptor);

    const req = jest.fn().mockResolvedValue('original');
    const result = await responseInterceptor.runInterceptor(
      req,
      '/test',
      HttpMethodsEnum.GET,
    );

    expect(interceptor.interception).toHaveBeenCalled();
    expect(req).toHaveBeenCalled();
    expect(result).toBe('intercepted');
  });

  it('should not run the interceptor if exact path does not match', async () => {
    const interceptor = {
      by: [InterceptorByEnum.EXACT_PATH],
      path: '/test',
      interception: jest.fn().mockResolvedValue('intercepted'),
    };

    responseInterceptor.add(interceptor);

    const req = jest.fn().mockResolvedValue('original');
    const result = await responseInterceptor.runInterceptor(
      req,
      '/teste/1',
      HttpMethodsEnum.GET,
    );

    expect(interceptor.interception).not.toHaveBeenCalled();
    expect(req).toHaveBeenCalled();
    expect(result).toBe('original');
  });
  it('should run the correct interceptor if dynamic path matches', async () => {
    const interceptor = {
      by: [InterceptorByEnum.PATH],
      path: '/test/{id}',
      params: ['id'],
      interception: jest.fn().mockResolvedValue('intercepted'),
    };

    responseInterceptor.add(interceptor);

    const req = jest.fn().mockResolvedValue('original');
    const result = await responseInterceptor.runInterceptor(
      req,
      '/test/1',
      HttpMethodsEnum.GET,
    );

    expect(interceptor.interception).toHaveBeenCalled();
    expect(req).toHaveBeenCalled();
    expect(result).toBe('intercepted');
  });

  it('should not run the interceptor if dynamic path does not match', async () => {
    const interceptor = {
      by: [InterceptorByEnum.PATH],
      path: '/test/{id}',
      params: ['id'],
      interception: jest.fn().mockResolvedValue('intercepted'),
    };

    responseInterceptor.add(interceptor);

    const req = jest.fn().mockResolvedValue('original');
    const result = await responseInterceptor.runInterceptor(
      req,
      '/tests/1',
      HttpMethodsEnum.GET,
    );

    expect(interceptor.interception).not.toHaveBeenCalled();
    expect(req).toHaveBeenCalled();
    expect(result).toBe('original');
  });
  test('should return false if the path does not match the interceptor path and the interceptor is set to intercept by path', async () => {
    const interceptor = new ResponseInterceptor();
    interceptor.add({
      path: '/test',
      by: [InterceptorByEnum.PATH],
      interception: async (req) => req,
    });

    const result = await interceptor.runInterceptor(
      () => Promise.resolve({ data: 'test' }),
      '/not-matching-path',
      HttpMethodsEnum.GET,
    );

    expect(result).toEqual({ data: 'test' });
  });
  test('should run the interceptor and cache the result if cache is enabled but there is no cache data', async () => {
    const interceptor = new ResponseInterceptor();
    interceptor.add({
      path: '/test',
      by: [InterceptorByEnum.EXACT_PATH],
      interception: async (req) => ({ data: 'intercepted' }),
    });

    const result = await interceptor.runInterceptor(
      () => Promise.resolve({ data: 'test' }),
      '/test',
      HttpMethodsEnum.GET,
    );

    expect(result).toEqual({ data: 'intercepted' });
  });
});
