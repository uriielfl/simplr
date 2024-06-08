import { getExpirationDate } from './get-expiration-date';

describe('getExpirationDate', () => {
  it('should return a date in the future', () => {
    const data = getExpirationDate(1000);
    expect(data).toBeGreaterThan(Date.now());
  });
});
