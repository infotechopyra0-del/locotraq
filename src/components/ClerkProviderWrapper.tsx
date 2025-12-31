'use client';

import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';

// Context consumers can check whether Clerk is available in the app.
export const ClerkAvailableContext = React.createContext(false);

export default function ClerkProviderWrapper({ children }: { children: React.ReactNode }) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  const isValidKey = typeof publishableKey === 'string' && publishableKey.length > 8 && !publishableKey.includes('xxxxx');

  if (!isValidKey) {
    // eslint-disable-next-line no-console
    console.warn('[Clerk] Missing or invalid publishable key; rendering without ClerkProvider.');
    return (
      <ClerkAvailableContext.Provider value={false}>
        {children}
      </ClerkAvailableContext.Provider>
    );
  }

  return (
    <ClerkAvailableContext.Provider value={true}>
      <ClerkProvider publishableKey={publishableKey}>{children}</ClerkProvider>
    </ClerkAvailableContext.Provider>
  );
}
