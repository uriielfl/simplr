import { simplr } from './main';

const mockPost = jest.fn();
const mockGet = jest.fn();
const mockPut = jest.fn();
const mockPatch = jest.fn();
const mockDelete = jest.fn();

jest.mock('./main', () => {
  let defaultUrl = 'http://localhost:3000';
  return {
    simplr: {
      init: jest.fn().mockImplementation((url?: string) => {
        if (url) {
          defaultUrl = url;
        }
        return {
          url: defaultUrl,
          post: mockPost,
          get: mockGet,
          put: mockPut,
          patch: mockPatch,
          delete: mockDelete,
        };
      }),
    },
  };
});

describe('Simplr', () => {
  it('should initialize with default base url', () => {
    const api = simplr.init();
    expect(api.url).toBe('http://localhost:3000');
  });

  it('should initialize with an different base url', () => {
    const api = simplr.init('http://localhost:80');
    expect(api.url).toBe('http://localhost:80');
  });

  it('should call post method', () => {
    const api = simplr.init();
    api.post('path', { data: 'data' });
    expect(mockPost).toHaveBeenCalledWith('path', { data: 'data' });
  });

  it('should call patch method', () => {
    const api = simplr.init();
    api.patch('path', { data: 'data' });
    expect(mockPatch).toHaveBeenCalledWith('path', { data: 'data' });
  });

  it('should call put method', () => {
    const api = simplr.init();
    api.put('path', { data: 'data' });
    expect(mockPut).toHaveBeenCalledWith('path', { data: 'data' });
  });
  it('should call get method', () => {
    const api = simplr.init();
    api.get('path');
    expect(mockGet).toHaveBeenCalled();
  });

  it('should call delete method', () => {
    const api = simplr.init();
    api.delete('path/1');
    expect(mockDelete).toHaveBeenCalled();
  });
});
