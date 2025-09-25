'use client';

import { useEffect, useState, useMemo } from 'react';
import { doc, onSnapshot, type DocumentData } from 'firebase/firestore';
import { useFirestore } from '@/firebase';

export function useDoc<T>(collectionName: string, docId: string) {
  const firestore = useFirestore();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  const memoizedDocRef = useMemo(() => doc(firestore, collectionName, docId), [firestore, collectionName, docId]);

  useEffect(() => {
    const unsubscribe = onSnapshot(memoizedDocRef, (doc) => {
      if (doc.exists()) {
        setData({ id: doc.id, ...doc.data() } as T);
      } else {
        setData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [memoizedDocRef]);

  return { data, loading };
}
