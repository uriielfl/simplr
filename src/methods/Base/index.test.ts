import { Base } from './index';

describe('Base Class', () => {
    it('should return a new instance of Base', () => {
        const base = new Base('http://localhost:3000', '/test');
        expect(base).toBeInstanceOf(Base);
    });
});