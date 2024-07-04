import { SimplrError } from './error.handler';

describe('Error handler', () => {
  it('should throw an error', () => {
    const error = new SimplrError(
      400,
      {
        message: 'Bad Request',
      },
      'Bad Request',
    );
    expect(error).toEqual(
      new SimplrError(400, { message: 'Bad Request' }, 'Bad Request'),
    );
  });

  it('should handle when no message is provided', () => {
    const error = new SimplrError(400, 'Bad Request');
    expect(error).toEqual(new SimplrError(400, 'Bad Request', 'Bad Request'));
  });

  it('should handle unkown status param', () => {
    const error = new SimplrError(999);
    expect(error).toEqual(
      new SimplrError(999, 'No message provided', 'Unknown Status'),
    );
  });
});
