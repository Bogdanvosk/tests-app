import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useLocalStorage from 'hooks/useLocalStorage';

import Auth from 'components/pages/Auth/Auth';

const Page = () => {
  const [mode, setMode] = useLocalStorage('mode');
  const [user, setUser] = useLocalStorage('user');
  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    const getModeFromUrl = () => {
      if (query.auth) return query.auth[0] === 'sign-in' ? 'signIn' : 'signUp';
    };

    query.auth && setMode(getModeFromUrl());
    if (user !== null) {
      if (user.is_admin) router.push('/test');
      else router.push('/tests');
    }
  }, [user]);

  if (
    query.auth &&
    (query.auth[0] === 'sign-in' || query.auth[0] === 'sign-up')
  ) {
    return <Auth />;
  }

  return null;
};

export default Page;
