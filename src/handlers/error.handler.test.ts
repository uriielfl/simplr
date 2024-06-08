import { SimplrError } from "./error.handler";

describe('Error handler', () => {
    it('should throw an error', () => {
        const error = new SimplrError(400, 'Bad Request', { message: 'Bad Request' });
        expect(error).toEqual(new SimplrError(400, 'Bad Request', { message: 'Bad Request' }));
    });

    it('should handle when no message is provided', () => {
        const error = new SimplrError(400, 'Bad Request');
        expect(error).toEqual(new SimplrError(400, 'Bad Request', 'No message provided',));
    });

    it('should handle unkown status param', () => {
        const error = new SimplrError(999);
        expect(error).toEqual(new SimplrError(999, 'Unknown Status', 'No message provided',));
    });
});
