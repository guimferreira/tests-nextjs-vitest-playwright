import { sanitizeStr } from "./sanitize-str";

describe('sanitizeStr (unit)', () => {
    test('return a empty string when receive a falsy value', () => {
        // @ts-expect-error : testando a função sem parâmetros
        expect(sanitizeStr()).toBe('');
    })

    test('return a empty string when receive a not string value', () => {
        // @ts-expect-error : testando a função tipagem incorreta
        expect(sanitizeStr(123)).toBe('');
    })

    test('execute trim of the string sent', () => {
        expect(sanitizeStr('   a    ')).toBe('a');
    })

    test('execute normilize of the string sent with NFC', () => {
        const original = 'e\u0301';
        const expected = 'é';
        expect(expected).toBe(sanitizeStr(original));
    })
})