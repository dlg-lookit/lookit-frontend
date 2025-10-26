import React from 'react';
import { AppProvider } from './components/AppContext';
import { MobileApp } from './components/MobileApp';

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gradient-to-br from-stone-100 via-neutral-50 to-zinc-100 flex items-center justify-center p-4">
        {/* Header */}
        <div className="absolute top-8 left-0 right-0 text-center z-10">
          <h1 className="text-3xl mb-2 bg-gradient-to-r from-rose-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Lookit Fashion App
          </h1>
          <p className="text-sm text-muted-foreground">
            Interactive Mobile Prototype - Signup or Login to start exploring
          </p>
        </div>

        {/* Mobile App Container */}
        <div className="relative mt-20">
          <MobileApp />
        </div>

        {/* Instructions */}
        <div className="absolute bottom-8 left-0 right-0 text-center">
          <p className="text-xs text-muted-foreground max-w-lg mx-auto px-4">
            Create an account with the two-step signup flow or use the login. Navigate between screens using the bottom navigation. Use the logout button in your profile to test again.
          </p>
        </div>
      </div>
    </AppProvider>
  );
}