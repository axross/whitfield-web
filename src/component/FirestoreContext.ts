import { firestore } from 'firebase';
import { createContext } from 'react';

export default createContext<firestore.Firestore>(undefined as any);
