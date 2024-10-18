import { useRouter } from 'next/router';
import { useEffect } from 'react';

import HeadLayout from '@/components/common/HeadLayout/HeadLayout';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/sign-in');
  }, []);
  return (
    <>
      <HeadLayout favicon='/favicon.png' title='Tests app' />
    </>
  );
}
