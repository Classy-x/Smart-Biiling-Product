import {
  addDoc,
  collection,
  serverTimestamp,
} from 'firebase/firestore';

import { db } from '../firebase/config';
import type { Bill, CartItem } from '../types/billing';

export const saveBill = async (
  items: CartItem[],
  bill: Bill,
) => {
  const order = {
    items,
    subtotalPaise: bill.subtotalPaise,
    savingsPaise: bill.savingsPaise,
    totalPaise: bill.totalPaise,
    appliedOffers: bill.appliedOffers,
    createdAt: serverTimestamp(),
  };
  
  const document = await addDoc(
    collection(db, 'orders'),
    order,
  );

  return document.id;
};
