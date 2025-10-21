
'use client';

import { useEffect, useState, useMemo } from 'react';
import {
  collection,
  onSnapshot,
  query,
  where,
  type DocumentData,
  type Query,
} from 'firebase/firestore';
import { useFirestore } from '@/firebase';

export function useCollection<T>(collectionName: string, field?: string, value?: string) {
  const firestore = useFirestore();
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  const memoizedQuery = useMemo(() => {
    if (field && value) {
      return query(collection(firestore, collectionName), where(field, '==', value));
    }
    return collection(firestore, collectionName);
  }, [firestore, collectionName, field, value]);

  useEffect(() => {
    const unsubscribe = onSnapshot(memoizedQuery as Query<DocumentData>, (snapshot) => {
      const result: T[] = [];
      snapshot.forEach((doc) => {
        result.push({ id: doc.id, ...doc.data() } as T);
      });
      setData(result);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [memoizedQuery]);

  return { data, loading };
}
