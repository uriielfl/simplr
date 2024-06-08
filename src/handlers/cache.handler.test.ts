import { Cache } from './cache.handler';

// Mock the global caches object
const mockCache = {
  put: jest.fn(),
  match: jest.fn(),
  delete: jest.fn(),
};

global.caches = {
  open: jest.fn().mockResolvedValue(mockCache),
  delete: jest.fn(),
  has: jest.fn(),
  keys: jest.fn(),
  match: jest.fn(),
};


describe('Cache', () => {
  let cache: Cache;

  beforeEach(() => {
    cache = new Cache();
  });

  it('should set a value in the cache', async () => {
    const key = 'testKey';
    const value = 'testValue';
    const ttl = 60;

    await cache.set(key, value, ttl);

    expect(global.caches.open).toHaveBeenCalledWith('simplr');
    expect(mockCache.put).toHaveBeenCalledWith(key, expect.any(Response));
  });
  it('should get a value from the cache', async () => {
    const key = 'testKey';
    const value = 'testValue';
    const ttl = 60;
  
    mockCache.match.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ value, expirationDate: Date.now() + ttl * 1000 }),
    });
  
    const result = await cache.get(key);
    expect(global.caches.open).toHaveBeenCalledWith('simplr');
    expect(mockCache.match).toHaveBeenCalledWith(key);
    expect(result).toEqual(value);
  });
  
  it('should return null if the cached value is expired', async () => {
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
});