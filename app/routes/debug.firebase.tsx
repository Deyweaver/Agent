import type { MetaFunction } from '@remix-run/cloudflare';
import { ClientOnly } from 'remix-utils/client-only';
import { getFirebaseDebugInfo } from '~/lib/firebase/config';

export const meta: MetaFunction = () => {
  return [{ title: 'Firebase Debug | CODO' }, { name: 'description', content: 'Debug Firebase configuration' }];
};

function FirebaseDebugComponent() {
  const debugInfo = getFirebaseDebugInfo();

  return (
    <div className="min-h-screen bg-bolt-elements-background-depth-1 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-bolt-elements-textPrimary">Firebase Configuration Debug</h1>
          <p className="text-bolt-elements-textSecondary mt-2">
            This page helps debug Firebase environment variable configuration
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-bolt-elements-background-depth-2 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-bolt-elements-textPrimary mb-4">
              All VITE_ Environment Variables
            </h2>
            <div className="text-sm text-bolt-elements-textSecondary font-mono">
              {debugInfo.allEnvVars.length === 0 ? (
                <p className="text-red-400">No VITE_ environment variables found</p>
              ) : (
                <ul className="space-y-1">
                  {debugInfo.allEnvVars.map((envVar) => (
                    <li key={envVar} className="border-l-2 border-green-500 pl-2">
                      {envVar}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="bg-bolt-elements-background-depth-2 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-bolt-elements-textPrimary mb-4">
              Firebase Environment Variables
            </h2>
            <div className="text-sm text-bolt-elements-textSecondary font-mono">
              {debugInfo.firebaseEnvVars.length === 0 ? (
                <p className="text-red-400">No Firebase environment variables found</p>
              ) : (
                <ul className="space-y-1">
                  {debugInfo.firebaseEnvVars.map((envVar) => (
                    <li key={envVar} className="border-l-2 border-blue-500 pl-2">
                      {envVar}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="bg-bolt-elements-background-depth-2 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-bolt-elements-textPrimary mb-4">
              Firebase Configuration Status
            </h2>
            <div className="space-y-3">
              {debugInfo.configValues.map(({ key, hasValue, valueLength, valuePreview }) => (
                <div key={key} className="flex items-center justify-between p-3 bg-bolt-elements-background-depth-3 rounded">
                  <span className="font-mono text-sm text-bolt-elements-textPrimary">{key}</span>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2 py-1 rounded ${hasValue ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'}`}>
                      {hasValue ? 'SET' : 'MISSING'}
                    </span>
                    {hasValue && (
                      <span className="text-xs text-bolt-elements-textSecondary font-mono">
                        {valueLength} chars | {valuePreview}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-bolt-elements-background-depth-2 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-bolt-elements-textPrimary mb-4">
              Troubleshooting Steps
            </h2>
            <div className="text-sm text-bolt-elements-textSecondary space-y-3">
              <div>
                <h3 className="font-semibold text-bolt-elements-textPrimary">For Cloudflare Pages:</h3>
                <ol className="list-decimal list-inside space-y-1 mt-2 ml-4">
                  <li>Go to Cloudflare Dashboard → Pages → Your project</li>
                  <li>Navigate to Settings → Environment variables</li>
                  <li>Ensure all variables are set for the "Production" environment</li>
                  <li>Variable names must match exactly (case-sensitive)</li>
                  <li>Save and trigger a new deployment</li>
                </ol>
              </div>
              <div>
                <h3 className="font-semibold text-bolt-elements-textPrimary">For Local Development:</h3>
                <ol className="list-decimal list-inside space-y-1 mt-2 ml-4">
                  <li>Create a .env file in the project root</li>
                  <li>Add the Firebase environment variables with VITE_ prefix</li>
                  <li>Restart the development server</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a
            href="/login"
            className="inline-block px-4 py-2 text-sm font-medium text-bolt-elements-link hover:text-bolt-elements-linkActive"
          >
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}

export default function FirebaseDebug() {
  return <ClientOnly fallback={<div>Loading debug info...</div>}>{() => <FirebaseDebugComponent />}</ClientOnly>;
}