import { apiGetCard, apiGetOperation } from '@app/api';
import { getDoc } from '../__mocks__/firebase/firestore';
import { cardAPIStub } from '@features/cards/stubs';
import { operationAPIStub } from '@features/operations/stubs';

describe('apiGetCard', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('Возвращает карточку по id после загрузки', async () => {
    const id = '1';
    getDoc.mockResolvedValue({
      exists: () => true,
      data: () => cardAPIStub,
      id,
    } as any);

    const card = await apiGetCard(id);
    expect(card).toEqual({
      id: '1',
      ...cardAPIStub,
    });
  });
  test('Возвращает ошибку, если карточку c заданным id нет', async () => {
    const id = '1';
    getDoc.mockResolvedValue({
      exists: () => false,
      data: () => null,
      id,
    } as any);

    const article = apiGetCard(id);

    await expect(article).rejects.toThrowError();
  });
});

describe('apiGetOperation', () => {
  test('Возвращает операцию по id после загрузки', async () => {
    const id = '1';
    getDoc.mockResolvedValue({
      exists: () => true,
      data: () => operationAPIStub,
      id,
    } as any);

    const operation = await apiGetOperation(id);
    expect(operation).toEqual({
      id: '1',
      ...operationAPIStub,
    });
  });
  test('Возвращает ошибку, если операцию c заданным id нет', async () => {
    const id = '1';
    getDoc.mockResolvedValue({
      exists: () => false,
      data: () => null,
      id,
    } as any);

    const operation = apiGetOperation(id);

    await expect(operation).rejects.toThrowError();
  });
});
