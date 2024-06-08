import { SimplrError } from '../../handlers/error.handler';
import { Delete } from './index';
import 'isomorphic-fetch';

global.fetch = jest.fn(() =>
  Promise.resolve(
    new Response(JSON.stringify({ message: 'Success' }), { status: 200 }),
  ),
);

describe('Delete method model', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });
  
  it('should return status and message on successful delete request with custom headers', async () => {
    const method = new Delete('http://localhost:3000', 'posts/1', {
      headers: { key: 'value' },
    });
    const response = await method.runIt();
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ message: 'Success' });

    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/posts/1', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        key: 'value',
      },
    });
  });

  it('should throw an error when the response is not ok', async () => {
    const method = new Delete('http://localhost:3000', 'posts/1');
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
