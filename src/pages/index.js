import { useRouter } from 'next/router';
import { useEffect } from 'react';

import useLocalStorage from '@/hooks/useLocalStorage';

export default function Home() {
  const router = useRouter();
  const { value: user } = useLocalStorage('user');

  useEffect(() => {
    user !== null ? router.push('/test-list') : router.push('/sign-in');
  }, [router, user]);

  return null;
}
