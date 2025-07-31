import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Validate that required configuration is present
const requiredKeys = ['apiKey', 'authDomain', 'projectId'];
const missingKeys = requiredKeys.filter((key) => !firebaseConfig[key as keyof typeof firebaseConfig]);

if (missingKeys.length > 0) {
  console.warn(`Firebase configuration missing required keys: ${missingKeys.join(', ')}`);
}

// Initialize Firebase only if we have the required configuration
let app: any = null;
let auth: any = null;
let googleProvider: GoogleAuthProvider | null = null;
let githubProvider: GithubAuthProvider | null = null;

try {
  if (firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);

    // Initialize OAuth providers
    googleProvider = new GoogleAuthProvider();
    githubProvider = new GithubAuthProvider();

    // Add scopes for GitHub provider
    githubProvider.addScope('user:email');
  } else {
    console.warn('Firebase configuration incomplete. Authentication will be disabled.');
  }
} catch (error) {
  console.error('Error initializing Firebase:', error);
}

export { auth, googleProvider, githubProvider };
export default app;
