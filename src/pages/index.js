import { useRouter } from 'next/router';
import { useEffect } from 'react';

import HeadLayout from '@/components/common/HeadLayout/HeadLayout';
import useLocalStorage from '@/hooks/useLocalStorage';

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useLocalStorage('user');

  useEffect(() => {
    if (user !== null) router.push('/test');
    else router.push('/sign-in');
  }, []);
  return (
    <>
      <HeadLayout favicon='/favicon.png' title='Tests app' />
    </>
  );
}
