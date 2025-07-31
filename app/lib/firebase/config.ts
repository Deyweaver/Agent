import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';

// Helper function to check environment variables availability
export const getFirebaseDebugInfo = () => {
  const envVars = {
    VITE_FIREBASE_API_KEY: import.meta.env.VITE_FIREBASE_API_KEY,
    VITE_FIREBASE_AUTH_DOMAIN: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    VITE_FIREBASE_PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    VITE_FIREBASE_STORAGE_BUCKET: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    VITE_FIREBASE_MESSAGING_SENDER_ID: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    VITE_FIREBASE_APP_ID: import.meta.env.VITE_FIREBASE_APP_ID,
    VITE_FIREBASE_MEASUREMENT_ID: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  };

  return {
    allEnvVars: Object.keys(import.meta.env).filter(key => key.startsWith('VITE_')),
    firebaseEnvVars: Object.keys(import.meta.env).filter(key => key.startsWith('VITE_FIREBASE')),
    configValues: Object.entries(envVars).map(([key, value]) => ({
      key,
      hasValue: !!value,
      valueLength: value?.length || 0,
      valuePreview: value ? `${value.substring(0, 10)}...` : 'undefined',
    })),
  };
};

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

// Debug logging to help diagnose configuration issues
const debugInfo = getFirebaseDebugInfo();
console.log('Firebase configuration debug info:', debugInfo);

// Validate that required configuration is present
const requiredKeys = ['apiKey', 'authDomain', 'projectId'];
const missingKeys = requiredKeys.filter((key) => !firebaseConfig[key as keyof typeof firebaseConfig]);

if (missingKeys.length > 0) {
  console.warn(`Firebase configuration missing required keys: ${missingKeys.join(', ')}`);
  console.warn('Debug info:', debugInfo);
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
