import 'isomorphic-fetch';
import { SimplrCache } from './cache.handler';
import { SimplrResponse } from './response.handler';

const mockCache = {
  put: jest.fn(),
  match: jest.fn(),
  delete: jest.fn(),
  keys: jest.fn().mockReturnValue([]),
};

global.caches = {
  open: jest.fn().mockResolvedValue({
    ...mockCache,
    keys: jest.fn().mockResolvedValue([]),
  }),
  delete: jest.fn(),
  has: jest.fn(),
  keys: jest.fn(),
  match: jest.fn(),
};

describe('Cache', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should set a value in the cache', async () => {
    const cache = new SimplrCache();
    const key = 'testKey';
    const value = 'testValue';
    const ttl = { seconds: 60};
    const rsp = new SimplrResponse(200, value, 'OK');
    await cache.set(key, rsp, ttl);

    expect(global.caches.open).toHaveBeenCalledWith('simplr');
    expect(mockCache.put).toHaveBeenCalledWith(key, expect.any(Response));
  });

  it('should get a value from the cache', async () => {
    const cache = new SimplrCache();
    const key = 'testKey';
    const value = 'testValue';
    const ttl = { seconds: 60};

    mockCache.match.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ value, expirationDate: Date.now() + ttl.seconds * 1000 }),
    });

    const result = await cache.get(key);
    expect(global.caches.open).toHaveBeenCalledWith('simplr');
    expect(mockCache.match).toHaveBeenCalledWith(key);
    expect(result).toEqual(value);
  });

  it('should return null if the cached value is expired', async () => {
    const cache = new SimplrCache();

    const key = 'testKey';
    const value = 'testValue';

    mockCache.match.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ value, expirationDate: Date.now() - 1000 }),
    });

    const result = await cache.get(key);

    expect(global.caches.open).toHaveBeenCalledWith('simplr');
    expect(mockCache.match).toHaveBeenCalledWith(key);
    expect(mockCache.delete).toHaveBeenCalledWith(key);
    expect(result).toBeNull();
  });

  it('should listen a request and cache the response', async () => {
    const cache = new SimplrCache();

    const key = 'testKey';
    const value = { data: 'testValue' };
    const request = jest.fn().mockResolvedValue(value);
    const expirestAt = { minutes: 5 };

    mockCache.match.mockResolvedValueOnce({
      ok: true,
      json: async () => value,
    });
    await cache.listenAndCache(key, request, expirestAt);
  });

  it('should return null when the cache does not exist', async () => {
    const cache = new SimplrCache();

    const key = 'testKey';

    mockCache.match.mockResolvedValueOnce({
      ok: false,
      json: async () => null,
    });

    const result = await cache.get(key);
    expect(result).toBeNull();
  });

  it('should update request if expired on listenAndCache', async () => {
    const cache = new SimplrCache();

    const key = 'testKey';
    const value = { data: 'testValue' };

    const request = jest.fn().mockResolvedValue(value);
    const expirestAt = { minutes: 5 };

    mockCache.match.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ value, expirationDate: Date.now() - 1000 }),
    });
    await cache.listenAndCache(key, request, expirestAt);

    expect(request).toHaveBeenCalled();
    expect(mockCache.put).toHaveBeenCalledWith(`/${key}`, expect.any(Response));
  });

  it('should save cache for 5 seconds by default on listenAndCache', async () => {
    const cache = new SimplrCache();

    const key = 'testKey';
    const value = { data: 'testValue' };

    const request = jest.fn().mockResolvedValue(value);

    mockCache.match.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ value, expirationDate: Date.now() - 1000 }),
    });
    await cache.listenAndCache(key, request);

    expect(request).toHaveBeenCalled();
    expect(mockCache.put).toHaveBeenCalledWith(`/${key}`, expect.any(Response));
  });

  it('should remove cache by key', async () => {
    const cache = new SimplrCache();

    const key = 'testKey';
    const value = { data: 'testValue' };
    const request = jest.fn().mockResolvedValue(value);
    const expirestAt = { minutes: 5 };

    mockCache.match.mockResolvedValueOnce({
      ok: true,
      json: async () => value,
    });
    await cache.listenAndCache(key, request, expirestAt);
    await cache.remove(key);

    expect(global.caches.open).toHaveBeenCalledWith('simplr');
    expect(mockCache.delete).toHaveBeenCalledWith(key);
  });

  it('clear should delete all keys in the cache', async () => {
    const cache = new SimplrCache();
    const key = 'testKey';
    const value = 'testValue';
    const ttl = { seconds: 60};
    const cacheStorage = await caches.open('simplr');

    cacheStorage.keys = jest.fn().mockResolvedValueOnce([key]);

    mockCache.match.mockResolvedValueOnce(async () => [key]);
    const rsp = new SimplrResponse(200, value, 'OK');
    await cache.set(key, rsp, ttl);
    await cache.clear();
    expect(cacheStorage.keys).toHaveBeenCalled();
    expect(cacheStorage.delete).toHaveBeenCalledTimes(1);
    expect(cacheStorage.delete).toHaveBeenCalledWith('testKey');
  });

  it('should save cache for 5 seconds by default on set', async () => {
    const cache = new SimplrCache();
    const key = 'testKey';
    const value = 'testValue';
    const rsp = new SimplrResponse(200, value, 'OK');
    await cache.set(key, rsp);

    expect(global.caches.open).toHaveBeenCalledWith('simplr');
    expect(mockCache.put).toHaveBeenCalledWith(key, expect.any(Response));
  });
});
