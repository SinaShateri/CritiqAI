import VerifyEmailSent from '@/components/pages/auth/verify-email-sent';
import { Suspense } from 'react';

const Page = () => {
  return (
    <Suspense fallback={null}>
      <VerifyEmailSent />
    </Suspense>
  );
};

export default Page;
