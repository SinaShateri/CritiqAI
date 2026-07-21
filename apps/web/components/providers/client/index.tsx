'use client';

import { SessionProvider } from 'next-auth/react';
import React, { Suspense } from 'react';

const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={null}>
      <SessionProvider>{children}</SessionProvider>;
    </Suspense>
  );
};

export default ClientProvider;
