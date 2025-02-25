import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import cn from 'classnames';

import useLocalStorage from '@/hooks/useLocalStorage';

import Button from '../Button/Button';
import Container from '../Container/Container';

import s from './TestsNavbar.module.scss';

const TestsNavbar = () => {
  const [user, setUser] = useLocalStorage('user');

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (user === null) router.push('/sign-in');
  }, [user]);

  const handleLogout = () => {
    setUser(null);
    dispatch(logoutAction());
  };

  const handleClickCreateTest = () => {
    router.push('/test');
  };

  return (
    <div className={s.navbarWrapper}>
      <Container>
        <div className={s.buttons}>
          <Button className={cn(s.button, s.delete)} onClick={handleLogout}>
            Выйти из аккаунта
          </Button>
          <Button className={s.button} type='button' onClick={handleClickCreateTest}>
            Создать тест
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default TestsNavbar;
