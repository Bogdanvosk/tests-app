import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';

import Auth from '@/components/pages/Auth/Auth';

const Page = () => {
  const [mode, setMode] = useLocalStorage('mode');
  const [user, setUser] = useLocalStorage('user');
  const router = useRouter();
  const { query } = router;

  const getModeFromUrl = () => {
    if (query.auth) return query.auth[0] === 'sign-in' ? 'signIn' : 'signUp';
  };

  useEffect(() => {
    query.auth && setMode(getModeFromUrl());
    if (user !== null) router.push('/test');
  }, []);

  if (
    query.auth &&
    (query.auth[0] === 'sign-in' || query.auth[0] === 'sign-up')
  ) {
    return <Auth />;
  }

  return null;
};

export default Page;
