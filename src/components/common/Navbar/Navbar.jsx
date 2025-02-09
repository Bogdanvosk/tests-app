import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import cn from 'classnames';

import { createTestAction, deleteTestAction, updateTestAction } from '@/store/features/test';
import { logoutAction } from '@/store/features/auth';
import useDebounce from '@/hooks/useDebounce';
import { toastify } from '@/utils/toastify';
import useLocalStorage from '@/hooks/useLocalStorage';

import Container from '../Container/Container';
import Button from '../Button/Button';

import s from './Navbar.module.scss';

const Navbar = ({ currentTest, currentQuestions }) => {
  const [user, setUser] = useLocalStorage('user');
  const [title, setTitle] = useState('');

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    currentTest && setTitle(currentTest.title);
  }, [currentTest, currentQuestions]);

  useEffect(() => {
    if (user === null) router.push('/sign-in');
  }, [user]);

  const debouncedValue = useDebounce(title, 500).trim();
  useEffect(() => {
    if (!currentTest || !title) return;
    dispatch(updateTestAction({ testId: currentTest.id, title: debouncedValue }));
    toastify('success', 'Имя теста успешно обновлено');
  }, [debouncedValue]);

  const handleChangeTitle = e => {
    setTitle(e.target.value);
  };

  const handleCreateTest = () => {
    if (title) {
      dispatch(createTestAction({ title }));
      toastify('success', 'Тест успешно создан');
    }
  };

  const handleDeleteTest = () => {
    dispatch(deleteTestAction(currentTest.id));
    setTitle('');
    toastify('success', 'Тест успешно удален');
  };

  const handleLogout = () => {
    setUser(null);
    dispatch(logoutAction());
  };

  return (
    <div className={s.navbarWrapper}>
      <Container>
        <div className={s.logout}>
          <Button className={cn(s.button, s.delete)} onClick={handleLogout}>
            Выйти
          </Button>
          {currentTest ? (
            <Button className={cn(s.button, s.delete)} type='button' onClick={handleDeleteTest}>
              Удалить тест
            </Button>
          ) : (
            <Button
              className={cn(s.button, { [s.show]: currentTest })}
              type='button'
              onClick={handleCreateTest}
            >
              Создать
            </Button>
          )}
        </div>
        <div className={s.navbar}>
          <input
            type='text'
            className={s.input}
            value={title}
            onChange={e => handleChangeTitle(e)}
            placeholder='Введите название теста'
          />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
