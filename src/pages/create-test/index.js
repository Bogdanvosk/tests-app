import { useRouter } from 'next/router';
import { useEffect } from 'react';

import useLocalStorage from '@/hooks/useLocalStorage';

import Test from '@/components/pages/Test/Test';
import { useDispatch } from 'react-redux';
import { clearCurrentUser } from '@/store/features/auth';

const Page = () => {
  const [user, setUser] = useLocalStorage('user');
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCurrentUser());
  }, []);

  useEffect(() => {
    if (!user.is_admin) router.push('/test-list');
  }, [user]);
  return <Test />;
};

export default Page;
