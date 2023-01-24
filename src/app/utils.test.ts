import { convertingAmount } from './utils';

describe('convertingAmount', () => {
  test('Возвращает целое число если переданы цифры', () => {
    const setup = '123';
    const result = convertingAmount(setup);
    expect(result).toBe(123);
  });
  test('Возвращает целое число если переданы цифры c точкой', () => {
    const setup = '123.23';
    const result = convertingAmount(setup);
    expect(result).toBe(123);
  });
  test('Возвращает целое число если переданы цифры c запятой', () => {
    const setup = '123,23';
    const result = convertingAmount(setup);
    expect(result).toBe(123);
  });
  test('Возвращает 0 если строка начинается с буквы', () => {
    const setup = 'a12w323';
    const result = convertingAmount(setup);
    expect(result).toBe(0);
  });
  test('Возвращает целое число если передана строка с символами + в начале', () => {
    const setup = '+123.23';
    const result = convertingAmount(setup);
    expect(result).toBe(123);
  });
  test('Возвращает целое число если передана строка с символами - в начале', () => {
    const setup = '-123.23';
    const result = convertingAmount(setup);
    expect(result).toBe(123);
  });
  test('Возвращает целое число если передана строка с пробелами', () => {
    const setup = '  123 23 ';
    const result = convertingAmount(setup);
    expect(result).toBe(12323);
  });
});
