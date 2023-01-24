import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  addDoc,
  Timestamp,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { CardsAPI, CardColor } from '@features/cards/types';
import { OperationAPI, OperationType } from '@features/operations/types';

export const initializeAPI = (): void => {
  initializeApp({
    apiKey: 'AIzaSyDLkGjeYnYK3qDnZ2EKk9uT_DoU4m929D0',
    authDomain: 'karpov-money.firebaseapp.com',
    projectId: 'karpov-money',
    storageBucket: 'karpov-money.appspot.com',
    messagingSenderId: '427808791805',
    appId: '1:427808791805:web:71cd683b8122c433077294',
  });

  getFirestore();
};

export const apiGetCard = async (id: string): Promise<CardsAPI | null> => {
  const db = getFirestore();

  try {
    const querySnapshot = await getDoc(doc(db, 'cards', id));

    if (querySnapshot.exists()) {
      const data = querySnapshot.data() as Omit<CardsAPI, 'id'>;

      return {
        id: querySnapshot.id,
        ...data,
      };
    } else {
      throw Error('No card');
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export const apiGetCards = async (): Promise<CardsAPI[]> => {
  const result: CardsAPI[] = [];
  const db = getFirestore();

  try {
    const q = query(collection(db, 'cards'), orderBy('created', 'desc'));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<CardsAPI, 'id'>;

      result.push({
        id: doc.id,
        ...data,
      });
    });
  } catch (error) {
    return Promise.reject(error);
  }

  return result;
};

export interface CardSaveData {
  number: string;
  balance: number;
  color: CardColor;
}

export const apiSaveNewCard = async (data: CardSaveData): Promise<CardsAPI | null> => {
  const newDoc: Omit<CardsAPI, 'id'> = {
    ...data,
    created: Timestamp.now(),
  };
  const db = getFirestore();

  try {
    const docRef = await addDoc(collection(db, 'cards'), newDoc);
    const doc = await apiGetCard(docRef.id);

    if (doc !== null) {
      return doc;
    }
  } catch (error) {
    //
  }

  return null;
};

export const apiUpdateCard = async (id: string, data: Partial<CardSaveData>): Promise<CardsAPI | null> => {
  const db = getFirestore();

  try {
    await updateDoc(doc(db, 'cards', id), {
      ...data,
    });
    const updatedDoc = await apiGetCard(id);

    if (doc !== null) {
      return updatedDoc;
    }
  } catch (error) {
    //
  }

  return null;
};

export const apiDeleteCard = async (id: string): Promise<void> => {
  const db = getFirestore();

  try {
    await deleteDoc(doc(db, 'cards', id));
  } catch (error) {
    //
  }
};

export const apiGetOperation = async (id: string): Promise<OperationAPI | null> => {
  const db = getFirestore();

  try {
    const querySnapshot = await getDoc(doc(db, 'transactions', id));

    if (querySnapshot.exists()) {
      const data = querySnapshot.data() as Omit<OperationAPI, 'id'>;

      return {
        id: querySnapshot.id,
        ...data,
      };
    } else {
      throw Error('No operation');
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export const apiGetOperations = async (): Promise<OperationAPI[]> => {
  const result: OperationAPI[] = [];
  const db = getFirestore();

  try {
    const q = query(collection(db, 'transactions'), orderBy('created', 'desc'));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<OperationAPI, 'id'>;

      result.push({
        id: doc.id,
        ...data,
      });
    });
  } catch (error) {
    return Promise.reject(error);
  }

  return result;
};

export interface OperationSaveData {
  name: string;
  value: number;
  type: OperationType;
  cardNumber: string;
}

export const apiSaveNewOperation = async (data: OperationSaveData): Promise<OperationAPI | null> => {
  const newDoc: Omit<OperationAPI, 'id'> = {
    ...data,
    created: Timestamp.now(),
  };
  const db = getFirestore();

  try {
    const docRef = await addDoc(collection(db, 'transactions'), newDoc);
    const doc = await apiGetOperation(docRef.id);

    if (doc !== null) {
      return doc;
    }
  } catch (error) {
    //
  }

  return null;
};

export const apiUpdateOperation = async (
  id: string,
  data: Partial<OperationSaveData>
): Promise<OperationAPI | null> => {
  const db = getFirestore();

  try {
    await updateDoc(doc(db, 'transactions', id), {
      ...data,
    });
    const updatedDoc = await apiGetOperation(id);

    if (doc !== null) {
      return updatedDoc;
    }
  } catch (error) {
    //
  }

  return null;
};

export const apiDeleteOperation = async (id: string): Promise<void> => {
  const db = getFirestore();

  try {
    await deleteDoc(doc(db, 'transactions', id));
  } catch (error) {
    //
  }
};
