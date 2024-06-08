import { getExpirationDate } from '@/utils/helpers/get-expiration-date';

const STORAGE_INDEX = 'simplr'

export class Cache {
  constructor() {}

  set = async (key: string, value: any, ttl = 5000) => {
    const cacheStorage = await caches.open(STORAGE_INDEX);
    const expirationDate = getExpirationDate(ttl);
    const dataToCache = JSON.stringify({ value, expirationDate });
    const response = new Response(dataToCache, {
      headers: { 'Content-Type': 'application/json' },
    });
    return await cacheStorage.put(key, response);
  };

  get = async (key: string) => {
    const cacheStorage = await caches.open(STORAGE_INDEX);
    const cachedResponse = await cacheStorage.match(key);
    if (!cachedResponse || !cachedResponse.ok) {
      return null;
    }
  
    const cachedData = await cachedResponse.json();
    const { value, expirationDate } = cachedData;
  
    if (Date.now() > expirationDate) {
      await cacheStorage.delete(key); // Remove o item expirado do cache
      return null;
    }
    return value;
  }
}
