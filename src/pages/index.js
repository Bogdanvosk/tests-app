import { useRouter } from 'next/router';
import { useEffect } from 'react';

import useLocalStorage from '@/hooks/useLocalStorage';

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useLocalStorage('user');

  useEffect(() => {
    if (user !== null) {
      if (user.is_admin) router.push('/test');
      else router.push('/tests');
    }
  }, [router, user]);

  return null;
}
