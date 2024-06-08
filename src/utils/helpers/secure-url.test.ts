import { secureUrl } from './secure-url';

describe('Secure URL helper', () => {
  it('should secure URL', () => {
    const url = 'myurl.com';
    const path = 'path';
    const { URL, PATH } = secureUrl(url, path);
    expect(URL).toBe('http://myurl.com');
  });

  it('should secure PATH', () => {
    const url = 'myurl.com';
    const path = 'path';
    const { PATH } = secureUrl(url, path);
    expect(PATH).toBe('/path');
  });

  it('should slice url with it ends with a "/"', () => {
    const url = 'myurl.com/';
    const { URL } = secureUrl(url);
    expect(URL).toBe('http://myurl.com');
  });
});
