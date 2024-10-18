import { useRouter } from 'next/router';
import { useEffect } from 'react';

import Auth from '@/components/pages/Auth/Auth';

const Page = () => {
  const { query } = useRouter();

  const getMode = () => {
    if (query.auth) return query.auth[0] === 'sign-in' ? 'signIn' : 'signUp';
  };

  useEffect(() => {
    query.auth && localStorage.setItem('mode', getMode());
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
