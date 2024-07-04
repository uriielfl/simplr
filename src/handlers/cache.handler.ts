import { SimplrResponse } from '../..';
import { convertTimeToMiliseconds } from '../utils/helpers/convert-time-to-miliseconds';
import { getExpirationDate } from '../utils/helpers/get-expiration-date';
import { IExpiresAt } from '../utils/interfaces/expires-at.interface';

const STORAGE_INDEX = 'simplr';

export class SimplrCache {
  constructor() {}

  set = async (key: string, value: SimplrResponse,     expirestAt: IExpiresAt = { minutes: 5 },) => {
    const cacheStorage = await caches.open(STORAGE_INDEX);

    const expirationInMs = convertTimeToMiliseconds(expirestAt);
    const expirationDate = getExpirationDate(expirationInMs);
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
      await cacheStorage.delete(key);
      return null;
    }
    return value;
  };

  listenAndCache = async (
    key: string,
    request: () => Promise<SimplrResponse>,
    expirestAt: IExpiresAt = { minutes: 5 },
  ) => {
    const cacheStorage = await caches.open(STORAGE_INDEX);
    const cacheResponse = await cacheStorage.match(key);
    const expirationDate = convertTimeToMiliseconds(expirestAt);

    let cacheData;
    if (cacheResponse) {
      const responseData = await cacheResponse.json();
      cacheData = responseData;
    }

    if (cacheData && Date.now() > cacheData.expirationDate) {
      await cacheStorage.delete(key);
      cacheData = null;
    }

    if (cacheData) {
      return cacheData.value;
    }

    const response = await request();
    const payload = {
      value: response,
      expirationDate: getExpirationDate(expirationDate),
    };
    const resp = new Response(JSON.stringify(payload), {
      headers: { 'Content-Type': 'application/json' },
    });

    await cacheStorage.put(`/${key}`, resp);
    return payload.value;
  };

  remove = async (key: string) => {
    const cacheStorage = await caches.open(STORAGE_INDEX);
    return await cacheStorage.delete(key);
  };

  clear = async () => {
    const cacheStorage = await caches.open(STORAGE_INDEX);
    return await cacheStorage.keys().then((keys) => {
      keys.forEach(async (request) => {
        await cacheStorage.delete(request);
      });
    });
  };
}
