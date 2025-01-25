import cn from 'classnames';

import { createTestAction, updateTestAction } from '@/store/features/test';
import { logoutAction } from '@/store/features/auth';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import useDebounce from '@/hooks/useDebounce';

import Container from '../Container/Container';
import Button from '../Button/Button';

import s from './Navbar.module.scss';

const Navbar = ({ currentTest, currentQuestions }) => {
  const [title, setTitle] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    currentTest && setTitle(currentTest.title);
  }, [currentTest, currentQuestions]);

  const debouncedValue = useDebounce(title, 500).trim();
  useEffect(() => {
    if (!currentTest) return;
    dispatch(
      updateTestAction({ testId: currentTest.id, title: debouncedValue })
    );
  }, [debouncedValue]);

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleCreateTest = () => {
    if (title) {
      dispatch(createTestAction({ title }));
      setIsTestCreated(true);
    }
  };

  const handleDeleteTest = () => {
    // TODO: delete test logic
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
        </div>
        <div className={s.navbar}>
          <input
            type='text'
            className={s.input}
            value={title}
            onChange={(e) => handleChangeTitle(e)}
            placeholder='Введите название теста'
          />
          <div className={s.buttons}>
            <Button
              className={cn(s.button, { [s.show]: currentTest })}
              type='button'
              onClick={handleCreateTest}
            >
              {/* // TODO: conditional button (create && "Создать" | edit && "Сохранить") */}
              Создать
            </Button>
            <Button
              className={cn(s.button, s.delete)}
              type='button'
              onClick={handleDeleteTest}
            >
              Удалить
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
