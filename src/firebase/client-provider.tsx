
'use client';

import { useMemo, type PropsWithChildren } from 'react';

import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';

import { initializeFirebase, FirebaseProvider } from '@/firebase';

export function FirebaseClientProvider({ children }: PropsWithChildren) {
  const { firebaseApp, auth, firestore } = useMemo(initializeFirebase, []);

  return <FirebaseProvider>{children}</FirebaseProvider>;
}
