import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import useLocalStorage from '@/hooks/useLocalStorage';
import { clearCurrentUser } from '@/store/features/auth';

import Tests from '@/components/pages/Tests/Tests';

const Page = () => {
  const [user, setUser] = useLocalStorage('user');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCurrentUser());
  }, []);

  useEffect(() => {
    if (user === null) router.push('/sign-in');
  }, [user]);
  return <Tests />;
};

export default Page;
