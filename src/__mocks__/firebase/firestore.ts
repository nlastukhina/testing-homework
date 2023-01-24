const MockFirestore = {
  getFirestore: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn().mockResolvedValue({
    exists: jest.fn(),
    data: jest.fn(),
    id: jest.fn(),
  }),
  getDocs: jest.fn(),
  collection: jest.fn(),
  query: jest.fn(),
  orderBy: jest.fn(),
};

export const getFirestore = MockFirestore.getFirestore;
export const doc = MockFirestore.doc;
export const getDoc = MockFirestore.getDoc;
export const getDocs = MockFirestore.getDocs;
export const collection = MockFirestore.collection;
export const query = MockFirestore.query;
export const orderBy = MockFirestore.orderBy;

export default MockFirestore;
