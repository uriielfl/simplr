import { getStatusCodeGroup } from '../utils/helpers/get-status-code-group';
import { SimplrResponse } from './response.handler';

describe('Response Handler', () => {
  it('should return a formatted response', async () => {
    const response = new Response('{"foo":"bar"}', {
      status: 200,
      statusText: 'OK',
      headers: { 'Content-Type': 'application/json' },
    });

    const simplrResponse = new SimplrResponse(
      response.status,
      await response.json(),
      response.statusText,
    );

    expect(simplrResponse).toBeInstanceOf(SimplrResponse);
    expect(simplrResponse.status).toBe(200);
    expect(simplrResponse.statusText).toBe('OK');
  });
});
