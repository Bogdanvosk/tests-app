import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import useLocalStorage from '@/hooks/useLocalStorage';
import { clearCurrentUser } from '@/store/features/auth';

import Test from '@/components/pages/Test/Test';

const Page = () => {
  const { value: user } = useLocalStorage('user');
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
