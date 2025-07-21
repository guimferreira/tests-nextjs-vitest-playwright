import { validateTodoDescription } from "./validate-todo-description";

describe('validateTodoDescription (unit)', () => {
    test('should return errors when the description is less than 4 characters', () => {
        const description = 'abc';
        const result = validateTodoDescription(description);

        expect(result.errors).toStrictEqual([
            'Descrição precisa ter mais de 3 caracteres'
        ]);
        expect(result.success).toBe(false);
    });

    test('should return success when the description is more than 3 characters', () => {
        const description = 'abcd';
        const result = validateTodoDescription(description);

        expect(result.errors).toStrictEqual([]);
        expect(result.success).toBe(true);
    });


})