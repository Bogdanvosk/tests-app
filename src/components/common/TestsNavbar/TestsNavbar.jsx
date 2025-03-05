import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import cn from 'classnames';

import useLocalStorage from '@/hooks/useLocalStorage';
import { logoutAction } from '@/store/features/auth';

import Button from '../Button/Button';
import Container from '../Container/Container';

import s from './TestsNavbar.module.scss';

const TestsNavbar = () => {
  const [user, setUser] = useLocalStorage('user');
  const [testId, setTestId] = useLocalStorage('selected-test');

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
    setTestId(null);
    router.push('/create-test');
  };

  return (
    <div className={s.navbarWrapper}>
      <Container className={s.container}>
        <div className={s.buttons}>
          <Button className={cn(s.button, s.delete)} onClick={handleLogout}>
            Выйти из аккаунта
          </Button>
          {user.is_admin && (
            <Button className={s.button} type='button' onClick={handleClickCreateTest}>
              Создать тест
            </Button>
          )}
        </div>
      </Container>
    </div>
  );
};

export default TestsNavbar;
