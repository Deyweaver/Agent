import React, { useState } from 'react';
import { Link } from '@remix-run/react';
import { useAuth } from '~/lib/firebase/auth';
import { toast } from 'react-toastify';

export const UserMenu: React.FC = () => {
  const { currentUser, logout, firebaseEnabled } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Successfully logged out');
    } catch {
      toast.error('Failed to log out');
    }
    setIsOpen(false);
  };

  // Don't show authentication UI if Firebase is not configured
  if (!firebaseEnabled) {
    return null;
  }

  if (!currentUser) {
    return (
      <div className="flex items-center gap-2">
        <Link
          to="/login"
          className="px-3 py-2 text-sm font-medium text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary transition-colors"
        >
          Sign In
        </Link>
        <Link
          to="/register"
          className="px-3 py-2 text-sm font-medium bg-bolt-elements-button-primary-background hover:bg-bolt-elements-button-primary-backgroundHover text-white rounded-md transition-colors"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-bolt-elements-textPrimary hover:text-bolt-elements-textSecondary transition-colors"
      >
        <div className="w-8 h-8 bg-bolt-elements-button-primary-background rounded-full flex items-center justify-center text-white text-sm">
          {currentUser.email?.charAt(0).toUpperCase()}
        </div>
        <span className="hidden sm:block">{currentUser.email}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-48 bg-bolt-elements-background-depth-2 rounded-md shadow-lg border border-bolt-elements-borderColor z-20">
            <div className="py-1">
              <div className="px-4 py-2 text-sm text-bolt-elements-textSecondary border-b border-bolt-elements-borderColor">
                Signed in as
                <div className="font-medium text-bolt-elements-textPrimary truncate">{currentUser.email}</div>
              </div>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-bolt-elements-textPrimary hover:bg-bolt-elements-background-depth-3 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
