
'use client';

import { 
  getAuth,
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  type AuthError
} from 'firebase/auth';

// Helper function to get a user-friendly error message
const getFirebaseAuthErrorMessage = (error: AuthError): string => {
  switch (error.code) {
    case 'auth/invalid-email':
      return "L'adresse e-mail n'est pas valide.";
    case 'auth/user-disabled':
      return 'Ce compte utilisateur a été désactivé.';
    case 'auth/user-not-found':
      return 'Aucun utilisateur trouvé avec cet e-mail.';
    case 'auth/wrong-password':
      return 'Le mot de passe est incorrect.';
    case 'auth/email-already-in-use':
      return 'Cette adresse e-mail est déjà utilisée par un autre compte.';
    case 'auth/weak-password':
      return 'Le mot de passe doit comporter au moins 6 caractères.';
    case 'auth/operation-not-allowed':
        return "L'authentification par e-mail/mot de passe n'est pas activée. Veuillez l'activer dans la console Firebase.";
    case 'auth/unauthorized-domain':
        return "Ce domaine n'est pas autorisé pour les opérations d'authentification. Veuillez l'ajouter dans la console Firebase.";
    default:
      return error.message || "Une erreur d'authentification inconnue s'est produite. Veuillez réessayer.";
  }
};

// Sign up function
export const signUp = async (email: string, password: string) => {
  const auth = getAuth();
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw new Error(getFirebaseAuthErrorMessage(error as AuthError));
  }
};

// Sign in function
export const signIn = async (email: string, password: string) => {
  const auth = getAuth();
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw new Error(getFirebaseAuthErrorMessage(error as AuthError));
  }
};

// Sign out function
export const signOutUser = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
    } catch (error) {
       console.error("Erreur lors de la déconnexion:", error);
       throw new Error("Impossible de se déconnecter. Veuillez réessayer.");
    }
}
