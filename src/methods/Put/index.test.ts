import { Put } from '.';
import 'isomorphic-fetch';
import { SimplrError } from '../../handlers/error.handler';

const MOCK_DATA = {
  key: 'value',
};

global.fetch = jest.fn(() =>
  Promise.resolve(
    new Response(JSON.stringify({ message: 'Success' }), { status: 200 }),
  ),
);

describe('Put method model', () => {
  let method: Put;

  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
    method = new Put('http://localhost:3000', 'posts', {
      headers: { key: 'value' },
      body: MOCK_DATA,
    });
  });

  it('should return status and message on successful put request with custom headers', async () => {
    const response = await method.runIt();
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ message: 'Success' });

    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/posts', {
      method: 'PUT',
      body: JSON.stringify(MOCK_DATA),
      headers: {
        'Content-Type': 'application/json',
        key: 'value',
      },
    });
  });

  it('should return status and message on successful put request without custom headers', async () => {
    const methodWithoutHeaders = new Put('http://localhost:3000', 'posts');

    const response = await methodWithoutHeaders.runIt();
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ message: 'Success' });

    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/posts', {
      method: 'PUT',
      body: JSON.stringify(undefined),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });

  it('should handle error on put request', async () => {
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error('Network error')),
    );

    try {
      await method.runIt();
    } catch (error) {
      expect(error).toEqual(new Error('Network error'));
    }
  });

  it('should throw an error when the response is not ok', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce(
      new Response(JSON.stringify({ message: 'Bad Request' }), {
        status: 400,
        statusText: 'Bad Request',
      }),
    );

    try {
      await method.runIt();
    } catch (error) {
      expect(error).toEqual(
        new SimplrError(400, 'Bad Request', { message: 'Bad Request' }),
      );
    }
  });
});