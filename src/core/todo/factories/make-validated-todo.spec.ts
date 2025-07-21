import * as sanitizeStrMod from "../../utils/sanitize-str";
import * as validateTodoDescriptionMod from "../schemas/validate-todo-description";
import * as makeNewTodoMod from "./make-new-todo";
import { InvalidTodo, makeValidatedTodo, ValidTodo } from "./make-validated-todo";

describe('makeValidatedTodo (unit)', () => {
    test('should call the sinitizeStr function with the correct value', () => {
        // Arrenge
        const { description, sanitizeStrSpy } = makeMocks();

        // Act
        makeValidatedTodo(description);

        // Assert
        expect(sanitizeStrSpy).toHaveBeenCalledExactlyOnceWith(description);
        expect(sanitizeStrSpy).toHaveBeenCalledTimes(1);
        expect(sanitizeStrSpy).toHaveBeenCalledWith(description);
    });

    test('should call the validateTodoDescription function with the return of the function sinitizeStr', () => {
        // Arrange
        const { description, sanitizeStrSpy, validateTodoDescriptionSpy } = makeMocks(); // Pegando os spies
        // Variável que será o retorno da sanitizeStr
        const sanitizeStrReturn = 'retorno da sanitizeStr';
        // Mock o retorno da sanitizeStr
        sanitizeStrSpy.mockReturnValue(sanitizeStrReturn);

        // Act
        const result = makeValidatedTodo(description);
        console.log(result)

        // Assert
        expect(validateTodoDescriptionSpy).toHaveBeenCalledExactlyOnceWith(sanitizeStrReturn);
    });

    test('should call the makeNewTodo is validateTodoDescription returned success', () => {
        // Arrenge
        const { description } = makeMocks(); // Pegando os spies

        // Act
        const result = makeValidatedTodo(description) as ValidTodo;

        // Assert
        expect(result.success).toBe(true);
        expect(result.data).toStrictEqual({
            id: 'any-id',
            description: 'abcd',
            createdAt: 'any-date',
        });
        expect(result.data.id).toBe('any-id');
        expect(result.data.description).toBe('abcd');
        expect(result.data.createdAt).toBe('any-date');
    });

    test('should return validateTodoDescription.erros if validation fail', () => {
        // Arrange
        const { errors, description, validateTodoDescriptionSpy } = makeMocks();
        validateTodoDescriptionSpy.mockReturnValue({errors,success: false,});

        // Act
        const result = makeValidatedTodo(description) as InvalidTodo;

        // Assert
        expect(result).toStrictEqual({"errors": ["any", "error"],"success": false});
    });
});

const makeMocks = (description = 'abcd') => {
    const errors = ['any', 'error'];

    const todo = {
        id: 'any-id',
        description,
        createdAt: 'any-date',
    }

    const sanitizeStrSpy = vi
        .spyOn(sanitizeStrMod, 'sanitizeStr')
        .mockReturnValue(description);

    const validateTodoDescriptionSpy = vi
        .spyOn(validateTodoDescriptionMod, 'validateTodoDescription')
        .mockReturnValue({
            errors: [],
            success: true,
        });

    const makeNewTodoSpy = vi
        .spyOn(makeNewTodoMod, 'makeNewTodo')
        .mockReturnValue(todo);

    return {
        errors,
        todo,
        description,
        sanitizeStrSpy,
        validateTodoDescriptionSpy,
        makeNewTodoSpy
    };
};