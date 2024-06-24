import { Get } from './index';
import 'isomorphic-fetch';

global.fetch = jest.fn(() =>
  Promise.resolve(
    new Response(JSON.stringify({ message: 'Success' }), { status: 200 }),
  ),
);

describe('Get method model', () => {
  it('should return status and message on successful get request with custom headers', async () => {
    const method = new Get('http://localhost:3000', '/posts', {
      headers: { key: 'value' },
    });
    const response = await method.runIt();
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ message: 'Success' });

    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/posts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        key: 'value',
      },
    });
  });

});
